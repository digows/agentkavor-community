import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { validateDocumentation, validateDocumentationReleaseTransition, validateProductReleaseProjection } from './validate-docs.mjs'

async function withCorpus(callback) {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'kavor-docs-test-'))
  const sourceDirectory = join(temporaryDirectory, 'docs')
  try {
    await cp(resolve('docs'), sourceDirectory, { recursive: true })
    return await callback(sourceDirectory)
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
}

test('validates the complete released corpus', async () => {
  const result = await validateDocumentation(resolve('docs'))
  assert.deepEqual(result, { locales: 7, pages: 77, releases: 7 })

  for (const locale of ['en', 'pt-br', 'es', 'fr', 'zh', 'ja', 'ru']) {
    const source = await readFile(join('docs', locale, 'what-is-kavor.md'), 'utf8')
    assert.match(source, /!\[[^\]]+]\(https:\/\/agentkavor\.com\/kavor-working-demo-poster\.jpg\)/)
    assert.match(source, new RegExp(`https://agentkavor\\.com/${locale}/videos/overview`))
  }
})

test('accepts tutorial as a first-class documentation kind', async () => {
  const result = await validateDocumentation(resolve('docs'))
  assert.equal(result.pages, 77)
  for (const locale of ['en', 'pt-br', 'es', 'fr', 'zh', 'ja', 'ru']) {
    const source = await readFile(join('docs', locale, 'first-loop.md'), 'utf8')
    assert.match(source, /^kind: tutorial$/m)
  }
})

test('requires accessible documentation images from the canonical media origin', async () => {
  await withCorpus(async (sourceDirectory) => {
    const pagePath = join(sourceDirectory, 'en', 'what-is-kavor.md')
    const source = await readFile(pagePath, 'utf8')
    await writeFile(pagePath, source.replace(
      '![Kavor Canvas with connected CodingAgents, Specifications, Files, Sticky Notes, and Terminals](https://agentkavor.com/kavor-working-demo-poster.jpg)',
      '![](https://agentkavor.com/kavor-working-demo-poster.jpg)',
    ))
    await assert.rejects(validateDocumentation(sourceDirectory), /image without alternative text/)

    await writeFile(pagePath, source.replace(
      'https://agentkavor.com/kavor-working-demo-poster.jpg',
      'https://tracking.example/kavor-working-demo-poster.jpg',
    ))
    await assert.rejects(validateDocumentation(sourceDirectory), /outside the approved canonical media origin/)
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
    await assert.rejects(validateDocumentation(sourceDirectory), /must contain exactly 11 cataloged Markdown files/)
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

    const catalogPath = join(proposedSourceDirectory, 'catalog.yaml')
    const catalog = await readFile(catalogPath, 'utf8')
    await writeFile(
      catalogPath,
      catalog
        .replace('releaseId: docs-2026-08-05.3', 'releaseId: docs-2026-08-06.1')
        .replace('previousReleaseId: docs-2026-08-05.2', 'previousReleaseId: docs-2026-08-05.3'),
    )
    await assert.doesNotReject(
      validateDocumentationReleaseTransition(resolve('docs'), proposedSourceDirectory),
    )
  })
})

test('binds a product release to its complete approved English documentation projection', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'kavor-product-release-test-'))
  const releaseNotesSourcePath = join(temporaryDirectory, 'v1.2.0.md')
  try {
    const publicSource = await readFile(resolve('docs/en/release-notes/1.2.0.md'), 'utf8')
    const frontmatterEnd = publicSource.indexOf('\n---\n', 4)
    await writeFile(releaseNotesSourcePath, publicSource.slice(frontmatterEnd + 5).replace(/^\n+/, ''))
    await assert.doesNotReject(validateProductReleaseProjection(resolve('docs'), {
      version: '1.2.0',
      releaseNotesSourcePath,
      expectedReleaseId: 'docs-2026-08-05.3',
    }))
    await writeFile(releaseNotesSourcePath, '# Kavor 1.2.0\n\nDifferent meaning.\n')
    await assert.rejects(validateProductReleaseProjection(resolve('docs'), {
      version: '1.2.0',
      releaseNotesSourcePath,
      expectedReleaseId: 'docs-2026-08-05.3',
    }), /differ from the approved English documentation projection/)
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
})
