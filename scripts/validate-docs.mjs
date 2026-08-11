import { createHash } from 'node:crypto'
import { lstat, readFile, readdir, realpath } from 'node:fs/promises'
import { dirname, extname, join, normalize, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const supportedLocales = ['en', 'pt-br', 'es', 'fr', 'zh', 'ja', 'ru']
const expectedLanguageTags = new Map([
  ['en', 'en'],
  ['pt-br', 'pt-BR'],
  ['es', 'es'],
  ['fr', 'fr'],
  ['zh', 'zh-Hans'],
  ['ja', 'ja'],
  ['ru', 'ru'],
])
const documentKinds = new Set(['landing', 'tutorial', 'guide', 'release-index', 'release-note'])
const maximumMarkdownBytes = 256 * 1024

function fail(message) {
  throw new Error(`[KAVOR_DOCS_INVALID] ${message}`)
}

function assert(condition, message) {
  if (!condition) fail(message)
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function ensureUnique(values, label) {
  assert(new Set(values).size === values.length, `${label} must be unique.`)
}

function canonicalDocumentationUrl(locale, document) {
  return `https://agentkavor.com/${locale}/docs${document.slug ? `/${document.slug}` : ''}`
}

function parseMarkdown(source, sourcePath) {
  assert(source.startsWith('---\n'), `${sourcePath} must start with YAML frontmatter.`)
  const closingDelimiter = source.indexOf('\n---\n', 4)
  assert(closingDelimiter !== -1, `${sourcePath} has unterminated YAML frontmatter.`)
  const frontmatter = parseYaml(source.slice(4, closingDelimiter))
  const body = source.slice(closingDelimiter + 5).replace(/^\n+/, '')
  assert(frontmatter && typeof frontmatter === 'object' && !Array.isArray(frontmatter), `${sourcePath} frontmatter must be an object.`)
  assert(body.startsWith('# '), `${sourcePath} must start its body with exactly one level-one heading.`)
  return { frontmatter, body }
}

function contentWithoutCode(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '')
}

function headingSlug(value) {
  return value
    .toLocaleLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractHeadingIds(markdown) {
  const seen = new Map()
  const headingIds = new Set()
  for (const match of contentWithoutCode(markdown).matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const title = match[1].replace(/\[([^\]]+)]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim()
    const baseSlug = headingSlug(title)
    const duplicateCount = seen.get(baseSlug) ?? 0
    seen.set(baseSlug, duplicateCount + 1)
    headingIds.add(duplicateCount === 0 ? baseSlug : `${baseSlug}-${duplicateCount}`)
  }
  return headingIds
}

function validateSafeMarkdown(markdown, sourcePath) {
  const prose = contentWithoutCode(markdown).replace(/<https?:\/\/[^>\s]+>/g, '')
  const forbiddenPatterns = [
    [/^\s*(?:import|export)\s/m, 'JavaScript imports or exports'],
    [/<\/?[A-Za-z][^>]*>/, 'raw HTML or JSX'],
    [/<!--/, 'HTML comments'],
    [/\{[^\n{}]*\}/, 'MDX expressions'],
    [/\bon[A-Z]?[a-z]+\s*=/, 'event handler attributes'],
  ]
  for (const [pattern, label] of forbiddenPatterns) {
    assert(!pattern.test(prose), `${sourcePath} contains forbidden ${label}.`)
  }

  const privateContentPatterns = [
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'private key material'],
    [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/, 'GitHub credential'],
    [/\bsk-[A-Za-z0-9_-]{20,}\b/, 'secret token'],
    [/\bAIza[0-9A-Za-z_-]{30,}\b/, 'Google credential'],
    [/(?:^|\s)\/Users\/[^/\s]+/, 'personal macOS path'],
    [/(?:^|\s)\/home\/[^/\s]+/, 'personal Linux path'],
    [/\b[A-Za-z]:\\Users\\[^\\\s]+/, 'personal Windows path'],
  ]
  for (const [pattern, label] of privateContentPatterns) {
    assert(!pattern.test(markdown), `${sourcePath} contains prohibited ${label}.`)
  }
}

function validateMarkdownImages(markdown, sourcePath) {
  for (const match of markdown.matchAll(/!\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const alternativeText = match[1].trim()
    const source = match[2]
    assert(alternativeText.length > 0, `${sourcePath} contains an image without alternative text.`)

    let sourceUrl
    try {
      sourceUrl = new URL(source)
    } catch {
      fail(`${sourcePath} contains an image outside the approved canonical media origin: ${source}`)
    }
    assert(
      sourceUrl.protocol === 'https:' && sourceUrl.hostname === 'agentkavor.com',
      `${sourcePath} contains an image outside the approved canonical media origin: ${source}`,
    )
  }
}

async function listMarkdownFiles(directory) {
  const result = []
  async function visit(currentDirectory) {
    for (const entry of await readdir(currentDirectory, { withFileTypes: true })) {
      const entryPath = join(currentDirectory, entry.name)
      assert(!entry.isSymbolicLink(), `Symbolic links are not accepted: ${entryPath}`)
      if (entry.isDirectory()) {
        await visit(entryPath)
      } else {
        assert(extname(entry.name) === '.md', `Unexpected file in locale tree: ${entryPath}`)
        result.push(normalize(entryPath))
      }
    }
  }
  await visit(directory)
  return result.sort()
}

async function documentationTreeDigest(directory) {
  const entries = []
  async function visit(currentDirectory) {
    for (const entry of await readdir(currentDirectory, { withFileTypes: true })) {
      const entryPath = join(currentDirectory, entry.name)
      assert(!entry.isSymbolicLink(), `Symbolic links are not accepted: ${entryPath}`)
      if (entry.isDirectory()) {
        await visit(entryPath)
      } else {
        entries.push(entryPath)
      }
    }
  }
  await visit(directory)
  const digest = createHash('sha256')
  for (const entryPath of entries.sort()) {
    digest.update(relative(directory, entryPath).split(sep).join('/'))
    digest.update('\0')
    digest.update(await readFile(entryPath))
    digest.update('\0')
  }
  return digest.digest('hex')
}

function compareSemverDescending(left, right) {
  const leftParts = left.split('.').map(Number)
  const rightParts = right.split('.').map(Number)
  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] !== rightParts[index]) return rightParts[index] - leftParts[index]
  }
  return 0
}

function validateCatalog(catalog) {
  assert(catalog?.schemaVersion === 1, 'catalog.yaml must use schemaVersion 1.')
  assert(catalog.sourceRepository === 'digows/agentkavor-community', 'catalog.yaml has an invalid sourceRepository.')
  assert(/^docs-\d{4}-\d{2}-\d{2}\.\d+$/.test(catalog.releaseId), 'catalog.yaml has an invalid releaseId.')
  assert(/^\d+\.\d+\.\d+$/.test(catalog.currentProductVersion), 'catalog.yaml has an invalid currentProductVersion.')
  assert(catalog.previousReleaseId === null || /^docs-\d{4}-\d{2}-\d{2}\.\d+$/.test(catalog.previousReleaseId), 'catalog.yaml has an invalid previousReleaseId.')
  assert(Array.isArray(catalog.locales), 'catalog.yaml locales must be an array.')
  assert(catalog.locales.map((locale) => locale.slug).join(',') === supportedLocales.join(','), 'Catalog locales must use the supported order exactly.')
  for (const locale of catalog.locales) {
    assert(locale.languageTag === expectedLanguageTags.get(locale.slug), `Locale ${locale.slug} must use languageTag ${expectedLanguageTags.get(locale.slug)}.`)
    assert(typeof locale.label === 'string' && locale.label.length > 0, `Locale ${locale.slug} needs a label.`)
  }
  assert(Array.isArray(catalog.documents) && catalog.documents.length > 0, 'catalog.yaml needs documents.')
  assert(Array.isArray(catalog.navigation), 'catalog.yaml navigation must be an array.')
  ensureUnique(catalog.documents.map((document) => document.id), 'Document IDs')
  ensureUnique(catalog.documents.map((document) => document.slug), 'Document slugs')
  ensureUnique(catalog.documents.map((document) => document.path), 'Document paths')
  ensureUnique(catalog.navigation.map((section) => section.id), 'Navigation section IDs')
  ensureUnique(catalog.navigation.flatMap((section) => section.documents), 'Navigation document IDs')
  const documentIds = new Set(catalog.documents.map((document) => document.id))
  for (const section of catalog.navigation) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id), 'Navigation section IDs must be stable kebab-case identifiers.')
    assert(Array.isArray(section.documents) && section.documents.length > 0, `Navigation section ${section.id} must contain documents.`)
    for (const documentId of section.documents) assert(documentIds.has(documentId), `Navigation references unknown document ${documentId}.`)
  }
  for (const document of catalog.documents) {
    assert(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(document.id), `Invalid document ID ${document.id}.`)
    assert(documentKinds.has(document.kind), `Invalid kind for ${document.id}.`)
    assert(typeof document.slug === 'string' && (/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:[.-][a-z0-9]+)*)*$/.test(document.slug) || document.slug === ''), `Invalid slug for ${document.id}.`)
    assert(/^[a-z0-9]+(?:[./-][a-z0-9]+)*\.md$/.test(document.path), `Invalid path for ${document.id}.`)
    assert(document.status === 'published' || document.status === 'archived', `Invalid publication status for ${document.id}.`)
    assert(/^\d+\.\d+\.\d+$/.test(document.introducedIn), `Invalid introducedIn for ${document.id}.`)
    assert(/^\d+\.\d+\.\d+$/.test(document.lastVerifiedIn), `Invalid lastVerifiedIn for ${document.id}.`)
    assert(document.owner === 'Kavor', `Invalid owner for ${document.id}.`)
    assert(typeof document.searchable === 'boolean', `Invalid searchable policy for ${document.id}.`)
    assert(typeof document.agentReadable === 'boolean', `Invalid agentReadable policy for ${document.id}.`)
    assert(document.translationStatus === 'complete', `Invalid translationStatus for ${document.id}.`)
    const releaseFields = ['version', 'publishedAt', 'prerelease', 'sourceUrl', 'sourceBodySha256']
    const completeRelease = releaseFields.every((field) => document[field] !== undefined)
    if (document.kind === 'release-note') {
      assert(completeRelease, `Release note ${document.id} requires complete release metadata.`)
      assert(/^\d+\.\d+\.\d+$/.test(document.version), `Release note ${document.id} has an invalid version.`)
      assert(!Number.isNaN(Date.parse(document.publishedAt)), `Release note ${document.id} has an invalid publishedAt.`)
      assert(typeof document.prerelease === 'boolean', `Release note ${document.id} has an invalid prerelease flag.`)
      assert(document.sourceUrl === `https://github.com/digows/agentkavor-community/releases/tag/v${document.version}`, `Release note ${document.id} has an invalid sourceUrl.`)
      assert(/^[a-f0-9]{64}$/.test(document.sourceBodySha256), `Release note ${document.id} has an invalid source hash.`)
    } else {
      assert(releaseFields.every((field) => document[field] === undefined), `Only release notes may contain release metadata: ${document.id}.`)
    }
  }
  const versions = catalog.documents.filter((document) => document.kind === 'release-note').map((document) => document.version)
  assert(versions.join(',') === [...versions].sort(compareSemverDescending).join(','), 'Release notes must be ordered by descending semantic version.')
  assert(versions[0] === catalog.currentProductVersion, 'The newest release note must match currentProductVersion.')
}

function validateRelativeLinks(page, pagesByPath) {
  for (const match of page.body.matchAll(/!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = match[1]
    if (/^(?:https?:|mailto:)/.test(href)) continue
    const [relativeTarget, rawFragment] = href.split('#', 2)
    const target = relativeTarget ? normalize(join(dirname(page.path), relativeTarget)) : page.path
    const targetPage = pagesByPath.get(target)
    assert(targetPage, `${page.path} links to missing document ${href}.`)
    if (rawFragment) {
      let fragment
      try {
        fragment = decodeURIComponent(rawFragment)
      } catch {
        fail(`${page.path} contains an invalid encoded anchor in ${href}.`)
      }
      assert(targetPage.headingIds.has(fragment), `${page.path} links to missing anchor #${fragment} in ${target}.`)
    }
  }
}

export async function validateDocumentation(sourceDirectory) {
  const unresolvedRoot = resolve(sourceDirectory)
  const rootState = await lstat(unresolvedRoot).catch(() => undefined)
  assert(rootState?.isDirectory() && !rootState.isSymbolicLink(), 'Documentation source must be a real directory.')
  const root = await realpath(unresolvedRoot)
  const catalogPath = join(root, 'catalog.yaml')
  const catalogState = await lstat(catalogPath).catch(() => undefined)
  assert(catalogState?.isFile() && !catalogState.isSymbolicLink(), 'catalog.yaml must be a regular file.')
  const catalog = parseYaml(await readFile(catalogPath, 'utf8'))
  validateCatalog(catalog)
  const pages = []
  for (const locale of catalog.locales) {
    const localeDirectory = join(root, locale.slug)
    const expectedPaths = new Set(catalog.documents.map((document) => normalize(join(localeDirectory, document.path))))
    const actualPaths = await listMarkdownFiles(localeDirectory)
    assert(actualPaths.length === expectedPaths.size, `Locale ${locale.slug} must contain exactly ${expectedPaths.size} cataloged Markdown files.`)
    for (const actualPath of actualPaths) assert(expectedPaths.has(actualPath), `Locale ${locale.slug} contains uncataloged page ${relative(localeDirectory, actualPath)}.`)
    for (const document of catalog.documents) {
      const path = normalize(join(localeDirectory, document.path))
      const fileState = await lstat(path).catch(() => undefined)
      assert(fileState?.isFile(), `Missing ${locale.slug} translation for ${document.id}.`)
      assert(fileState.size <= maximumMarkdownBytes, `${path} exceeds ${maximumMarkdownBytes} bytes.`)
      const source = await readFile(path, 'utf8')
      validateSafeMarkdown(source, path)
      validateMarkdownImages(source, path)
      const { frontmatter, body } = parseMarkdown(source, path)
      const allowedFrontmatterFields = [
        'canonicalUrl',
        'description',
        'id',
        'kind',
        'lastReviewedAt',
        'title',
        ...(document.kind === 'release-note' ? ['version'] : []),
      ].sort()
      assert(Object.keys(frontmatter).sort().join(',') === allowedFrontmatterFields.join(','), `${path} has unsupported or missing frontmatter fields.`)
      assert(frontmatter.id === document.id, `${path} does not match catalog ID ${document.id}.`)
      assert(frontmatter.kind === document.kind, `${path} does not match catalog kind ${document.kind}.`)
      assert(typeof frontmatter.title === 'string' && frontmatter.title.length > 0 && frontmatter.title.length <= 100, `${path} has an invalid title.`)
      assert(typeof frontmatter.description === 'string' && frontmatter.description.length > 0 && frontmatter.description.length <= 220, `${path} has an invalid description.`)
      assert(/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.lastReviewedAt), `${path} has an invalid lastReviewedAt.`)
      assert(frontmatter.canonicalUrl === canonicalDocumentationUrl(locale.slug, document), `${path} has an invalid canonicalUrl.`)
      assert(document.kind === 'release-note' ? frontmatter.version === document.version : frontmatter.version === undefined, `${path} has an invalid version.`)
      if (locale.slug === 'en' && document.kind === 'release-note') {
        assert(sha256(body) === document.sourceBodySha256, `${path} no longer matches the immutable GitHub Release body hash.`)
      }
      pages.push({ path, body, headingIds: extractHeadingIds(body) })
    }
  }
  const pagesByPath = new Map(pages.map((page) => [page.path, page]))
  for (const page of pages) validateRelativeLinks(page, pagesByPath)
  return { locales: catalog.locales.length, pages: pages.length, releases: catalog.documents.filter((document) => document.kind === 'release-note').length }
}

export async function validateDocumentationReleaseTransition(baseSourceDirectory, proposedSourceDirectory) {
  const baseDirectory = await realpath(resolve(baseSourceDirectory))
  const proposedDirectory = await realpath(resolve(proposedSourceDirectory))
  if (await documentationTreeDigest(baseDirectory) === await documentationTreeDigest(proposedDirectory)) return
  const baseCatalog = parseYaml(await readFile(join(baseDirectory, 'catalog.yaml'), 'utf8'))
  const proposedCatalog = parseYaml(await readFile(join(proposedDirectory, 'catalog.yaml'), 'utf8'))
  assert(proposedCatalog.releaseId !== baseCatalog.releaseId, 'A documentation content change must use a new releaseId.')
  assert(proposedCatalog.previousReleaseId === baseCatalog.releaseId, `Documentation release ${proposedCatalog.releaseId} must name ${baseCatalog.releaseId} as previousReleaseId.`)
}

export async function validateProductReleaseProjection(
  sourceDirectory,
  { version, releaseNotesSourcePath, expectedReleaseId },
) {
  await validateDocumentation(sourceDirectory)
  const root = await realpath(resolve(sourceDirectory))
  const catalog = parseYaml(await readFile(join(root, 'catalog.yaml'), 'utf8'))
  assert(catalog.releaseId === expectedReleaseId, `Documentation release is ${catalog.releaseId}; expected ${expectedReleaseId}.`)
  assert(catalog.currentProductVersion === version, `Documentation currentProductVersion is ${catalog.currentProductVersion}; expected ${version}.`)
  const releaseDocument = catalog.documents.find((document) => document.kind === 'release-note' && document.version === version)
  assert(releaseDocument, `Documentation does not contain release notes for Kavor ${version}.`)
  assert(releaseDocument.id === `release-notes-${version}`, `Kavor ${version} has an invalid release-note document ID.`)
  const publicSource = await readFile(join(root, 'en', releaseDocument.path), 'utf8')
  const { body: publicBody } = parseMarkdown(publicSource, releaseDocument.path)
  const privateBody = await readFile(resolve(releaseNotesSourcePath), 'utf8')
  assert(privateBody === publicBody, `Kavor ${version} private release notes differ from the approved English documentation projection.`)
  assert(sha256(privateBody) === releaseDocument.sourceBodySha256, `Kavor ${version} release-note hash differs from the documentation catalog.`)
  return {
    releaseId: catalog.releaseId,
    version,
    releaseNoteDocumentId: releaseDocument.id,
    releaseNoteBodySha256: releaseDocument.sourceBodySha256,
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const sourceArgumentIndex = process.argv.indexOf('--source')
  const sourceDirectory = sourceArgumentIndex === -1 ? resolve('docs') : process.argv[sourceArgumentIndex + 1]
  assert(sourceDirectory, '--source requires a directory.')
  const result = await validateDocumentation(sourceDirectory)
  const baseSourceArgumentIndex = process.argv.indexOf('--base-source')
  if (baseSourceArgumentIndex !== -1) {
    const baseSourceDirectory = process.argv[baseSourceArgumentIndex + 1]
    assert(baseSourceDirectory, '--base-source requires a directory.')
    await validateDocumentationReleaseTransition(baseSourceDirectory, sourceDirectory)
  }
  const productVersionArgumentIndex = process.argv.indexOf('--product-version')
  const releaseNotesSourceArgumentIndex = process.argv.indexOf('--release-notes-source')
  const expectedReleaseIdArgumentIndex = process.argv.indexOf('--expected-release-id')
  const productProjectionArgumentCount = [
    productVersionArgumentIndex,
    releaseNotesSourceArgumentIndex,
    expectedReleaseIdArgumentIndex,
  ].filter((index) => index !== -1).length
  assert(productProjectionArgumentCount === 0 || productProjectionArgumentCount === 3, 'Product release validation requires --product-version, --release-notes-source, and --expected-release-id together.')
  if (productProjectionArgumentCount === 3) {
    const productVersion = process.argv[productVersionArgumentIndex + 1]
    const releaseNotesSourcePath = process.argv[releaseNotesSourceArgumentIndex + 1]
    const expectedReleaseId = process.argv[expectedReleaseIdArgumentIndex + 1]
    assert(productVersion && /^\d+\.\d+\.\d+$/.test(productVersion), '--product-version requires stable semantic versioning.')
    assert(releaseNotesSourcePath, '--release-notes-source requires a file path.')
    assert(expectedReleaseId && /^docs-\d{4}-\d{2}-\d{2}\.\d+$/.test(expectedReleaseId), '--expected-release-id requires a documentation release ID.')
    await validateProductReleaseProjection(sourceDirectory, { version: productVersion, releaseNotesSourcePath, expectedReleaseId })
  }
  process.stdout.write(`Validated ${result.pages} pages across ${result.locales} locales and ${result.releases} releases.\n`)
}
