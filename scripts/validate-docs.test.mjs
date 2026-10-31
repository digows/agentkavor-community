import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'
import { validateDocumentation, validateDocumentationReleaseTransition, validateProductReleaseProjection } from './validate-docs.mjs'

async function withCorpus(callback, originalDirectory = resolve('docs')) {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'kavor-docs-test-'))
  const sourceDirectory = join(temporaryDirectory, 'docs')
  try {
    await cp(originalDirectory, sourceDirectory, { recursive: true })
    return await callback(sourceDirectory)
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
}

async function advanceRelease(sourceDirectory, baseSourceDirectory = resolve('docs')) {
  const catalogPath = join(sourceDirectory, 'catalog.yaml')
  const catalog = parseYaml(await readFile(catalogPath, 'utf8'))
  const baseCatalog = parseYaml(await readFile(join(baseSourceDirectory, 'catalog.yaml'), 'utf8'))
  catalog.releaseId = baseCatalog.releaseId.replace(/\d+$/, (sequence) => Number(sequence) + 1)
  catalog.previousReleaseId = baseCatalog.releaseId
  await writeFile(catalogPath, stringifyYaml(catalog))
}

test('validates the complete released corpus', async () => {
  const result = await validateDocumentation(resolve('docs'))
  assert.deepEqual(result, { locales: 7, pages: 273, releases: 22 })

  for (const locale of ['en', 'pt-br', 'es', 'fr', 'zh', 'ja', 'ru']) {
    const source = await readFile(join('docs', locale, 'what-is-kavor.md'), 'utf8')
    assert.match(source, /!\[[^\]]+]\(https:\/\/media\.agentkavor\.com\/demos\/canvas-overview\/workspace\.8f917eaa5261\.jpg\)/)
    assert.match(source, new RegExp(`https://agentkavor\\.com/${locale}/videos/overview`))
  }
})

test('accepts tutorial as a first-class documentation kind', async () => {
  const result = await validateDocumentation(resolve('docs'))
  assert.equal(result.pages, 273)
  for (const locale of ['en', 'pt-br', 'es', 'fr', 'zh', 'ja', 'ru']) {
    const source = await readFile(join('docs', locale, 'first-loop.md'), 'utf8')
    assert.match(source, /^kind: tutorial$/m)
  }
})

test('keeps navigation documents in one authoritative section', async () => {
  await withCorpus(async (sourceDirectory) => {
    const catalogPath = join(sourceDirectory, 'catalog.yaml')
    const catalog = await readFile(catalogPath, 'utf8')
    await writeFile(
      catalogPath,
      catalog.replace(
        '  - id: core-model\n    documents:\n      - nodes',
        '  - id: core-model\n    documents:\n      - what-is-kavor\n      - nodes',
      ),
    )
    await assert.rejects(validateDocumentation(sourceDirectory), /Navigation document IDs must be unique/)
  })
})

test('requires accessible documentation images from an approved canonical media origin', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'en', 'what-is-kavor.md')
    const source = await readFile(pagePath, 'utf8')
    await writeFile(pagePath, source.replace(
      '![Kavor Canvas with connected CodingAgents, Specifications, Files, Sticky Notes, and Terminals](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)',
      '![](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)',
    ))
    await assert.rejects(validateDocumentation(sourceDirectory), /image without alternative text/)

    await writeFile(pagePath, source.replace(
      'https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg',
      'https://tracking.example/kavor-working-demo-poster.jpg',
    ))
    await assert.rejects(validateDocumentation(sourceDirectory), /outside the approved canonical media origin/)

    await writeFile(pagePath, source.replace(
      'https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg',
      'https://media.agentkavor.com/releases/1.3.0/example/overview.0123456789ab.jpg',
    ))
    await assert.doesNotReject(validateDocumentation(sourceDirectory))
  })
})

test('rejects executable Markdown input', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'es', 'what-is-kavor.md')
    await writeFile(pagePath, `${await readFile(pagePath, 'utf8')}\n<script>alert(1)</script>\n`)
    await assert.rejects(validateDocumentation(sourceDirectory), /forbidden raw HTML or JSX/)
  })
})

test('rejects private local paths from public documentation', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'pt-br', 'what-is-kavor.md')
    await writeFile(pagePath, `${await readFile(pagePath, 'utf8')}\nEvidência: /Users/private/repository\n`)
    await assert.rejects(validateDocumentation(sourceDirectory), /prohibited personal macOS path/)
  })
})

test('rejects a canonical URL that does not match the localized document route', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'pt-br', 'what-is-kavor.md')
    const source = await readFile(pagePath, 'utf8')
    await writeFile(pagePath, source.replace(
      'canonicalUrl: https://agentkavor.com/pt-br/docs/what-is-kavor',
      'canonicalUrl: https://agentkavor.com/en/docs/what-is-kavor',
    ))
    await assert.rejects(validateDocumentation(sourceDirectory), /invalid canonicalUrl/)
  })
})

test('rejects unsupported page frontmatter instead of silently projecting it', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'en', 'index.md')
    const source = await readFile(pagePath, 'utf8')
    await writeFile(pagePath, source.replace('lastReviewedAt:', 'unreviewedField: true\nlastReviewedAt:'))
    await assert.rejects(validateDocumentation(sourceDirectory), /unsupported or missing frontmatter fields/)
  })
})

test('rejects an incomplete locale', async () => {
  await withCorpus(async (sourceDirectory) => {
    await rm(join(sourceDirectory, 'ru', 'release-notes', '1.0.0.md'))
    await assert.rejects(validateDocumentation(sourceDirectory), /must contain exactly 39 cataloged Markdown files/)
  })
})

test('rejects an internal link to a missing heading anchor', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'fr', 'what-is-kavor.md')
    await writeFile(pagePath, `${await readFile(pagePath, 'utf8')}\n[Section absente](./index.md#missing-section)\n`)
    await assert.rejects(validateDocumentation(sourceDirectory), /links to missing anchor #missing-section/)
  })
})

test('requires content changes to advance a correctly chained release ID', async () => {
  await withCorpus(async (proposedSourceDirectory) => {
    const pagePath = join(proposedSourceDirectory, 'en', 'index.md')
    await writeFile(pagePath, `${await readFile(pagePath, 'utf8')}\n`)
    await assert.rejects(
      validateDocumentationReleaseTransition(resolve('docs'), proposedSourceDirectory),
      /must use a new releaseId/,
    )

    await advanceRelease(proposedSourceDirectory)
    await assert.doesNotReject(
      validateDocumentationReleaseTransition(resolve('docs'), proposedSourceDirectory),
    )
  })
})

test('rejects deprecated download links in changed public document bodies', async () => {
  await withCorpus(async (sourceDirectory) => {
    await advanceRelease(sourceDirectory)
    const pagePath = join(sourceDirectory, 'en', 'index.md')
    const source = await readFile(pagePath, 'utf8')
    for (const link of [
      '[Download](https://agentkavor.com/downloads)',
      '<https://agentkavor.com/downloads/>',
      '[Download](https://agentkavor.com/downloads?source=guide#install)',
      'Download: https://agentkavor.com/downloads.',
    ]) {
      await writeFile(pagePath, `${source}\n${link}\n`)
      await assert.rejects(
        validateDocumentationReleaseTransition(resolve('docs'), sourceDirectory),
        /en[/\\]index\.md contains a deprecated download URL.*Use https:\/\/download\.agentkavor\.com/,
      )
    }
    await writeFile(pagePath, `${source}\n[Download](https://download.agentkavor.com)\n`)
    await assert.doesNotReject(validateDocumentationReleaseTransition(resolve('docs'), sourceDirectory))
  })
})

test('preserves inherited download links when historical bodies remain unchanged', async () => {
  await withCorpus(async (baseDirectory) => {
    const basePath = join(baseDirectory, 'en', 'index.md')
    await writeFile(basePath, `${await readFile(basePath, 'utf8')}\n[Historical download](https://agentkavor.com/downloads)\n`)
    await withCorpus(async (proposedDirectory) => {
      await advanceRelease(proposedDirectory, baseDirectory)
      const pagePath = join(proposedDirectory, 'en', 'index.md')
      const source = await readFile(pagePath, 'utf8')
      await writeFile(pagePath, source.replace(/^description:.*$/m, 'description: Updated metadata only.'))
      const changedPath = join(proposedDirectory, 'pt-br', 'index.md')
      await writeFile(changedPath, `${await readFile(changedPath, 'utf8')}\n[Download](https://download.agentkavor.com)\n`)
      await assert.doesNotReject(validateDocumentation(proposedDirectory))
      await assert.doesNotReject(validateDocumentationReleaseTransition(baseDirectory, proposedDirectory))
    }, baseDirectory)
  })
})

test('requires canonical download links in newly added public documents', async () => {
  await withCorpus(async (sourceDirectory) => {
    await advanceRelease(sourceDirectory)
    const catalogPath = join(sourceDirectory, 'catalog.yaml')
    const catalog = parseYaml(await readFile(catalogPath, 'utf8'))
    const template = catalog.documents.find((document) => document.id === 'what-is-kavor')
    catalog.documents.push({ ...template, id: 'download-help', slug: 'download-help', path: 'download-help.md' })
    catalog.navigation[0].documents.push('download-help')
    await writeFile(catalogPath, stringifyYaml(catalog))
    for (const locale of catalog.locales) {
      const source = (await readFile(join(sourceDirectory, locale.slug, template.path), 'utf8'))
        .replace(/^id:.*$/m, 'id: download-help')
        .replace(/^canonicalUrl:.*$/m, `canonicalUrl: https://agentkavor.com/${locale.slug}/docs/download-help`)
      const downloadUrl = locale.slug === 'ru' ? 'https://agentkavor.com/downloads' : 'https://download.agentkavor.com'
      await writeFile(join(sourceDirectory, locale.slug, 'download-help.md'), `${source}\n[Download](${downloadUrl})\n`)
    }
    await assert.doesNotReject(validateDocumentation(sourceDirectory))
    await assert.rejects(
      validateDocumentationReleaseTransition(resolve('docs'), sourceDirectory),
      /ru[/\\]download-help\.md contains a deprecated download URL/,
    )
    for (const locale of catalog.locales) {
      const pagePath = join(sourceDirectory, locale.slug, 'download-help.md')
      await writeFile(pagePath, (await readFile(pagePath, 'utf8')).replaceAll('https://agentkavor.com/downloads', 'https://download.agentkavor.com'))
    }
    await assert.doesNotReject(validateDocumentationReleaseTransition(resolve('docs'), sourceDirectory))
  })
})

test('binds a product release to its complete approved English documentation projection', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'kavor-product-release-test-'))
  const releaseNotesSourcePath = join(temporaryDirectory, 'v2.3.0.md')
  try {
    const { releaseId } = parseYaml(await readFile(resolve('docs/catalog.yaml'), 'utf8'))
    const publicSource = await readFile(resolve('docs/en/release-notes/2.3.0.md'), 'utf8')
    const frontmatterEnd = publicSource.indexOf('\n---\n', 4)
    await writeFile(releaseNotesSourcePath, publicSource.slice(frontmatterEnd + 5).replace(/^\n+/, ''))
    await assert.doesNotReject(validateProductReleaseProjection(resolve('docs'), {
      version: '2.3.0',
      releaseNotesSourcePath,
      expectedReleaseId: releaseId,
    }))
    await writeFile(releaseNotesSourcePath, '# Kavor 2.3.0\n\nDifferent meaning.\n')
    await assert.rejects(validateProductReleaseProjection(resolve('docs'), {
      version: '2.3.0',
      releaseNotesSourcePath,
      expectedReleaseId: releaseId,
    }), /differ from the approved English documentation projection/)
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
})
