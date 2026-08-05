import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const briefStartMarker = '<!-- kavor-editorial-brief\n'
const approvalStartMarker = '<!-- kavor-editorial-approval\n'
const blockEndMarker = '\n-->'
const sha256Pattern = /^[a-f0-9]{64}$/u
const commitPattern = /^[a-f0-9]{40}$/u

function fail(message) {
  throw new Error(`[KAVOR_EDITORIAL_APPROVAL_INVALID] ${message}`)
}

function assert(condition, message) {
  if (!condition) fail(message)
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function extractBlock(body, startMarker, label) {
  const start = body.indexOf(startMarker)
  assert(start !== -1, `Pull request body is missing the ${label} block.`)
  assert(body.indexOf(startMarker, start + startMarker.length) === -1, `Pull request body contains more than one ${label} block.`)
  const contentStart = start + startMarker.length
  const end = body.indexOf(blockEndMarker, contentStart)
  assert(end !== -1, `Pull request body has an unterminated ${label} block.`)
  return body.slice(contentStart, end)
}

function parseObject(source, label) {
  const value = parseYaml(source)
  assert(value && typeof value === 'object' && !Array.isArray(value), `${label} must be a YAML object.`)
  return value
}

function assertSafePublicMetadata(source) {
  const prohibitedPatterns = [
    [/(?:^|\s)\/Users\/[^/\s]+/u, 'personal macOS path'],
    [/(?:^|\s)\/home\/[^/\s]+/u, 'personal Linux path'],
    [/\b[A-Za-z]:\\Users\\[^\\\s]+/u, 'personal Windows path'],
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u, 'private key material'],
    [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/u, 'GitHub credential'],
    [/\bsk-[A-Za-z0-9_-]{20,}\b/u, 'secret token'],
  ]
  for (const [pattern, label] of prohibitedPatterns) {
    assert(!pattern.test(source), `Editorial metadata contains prohibited ${label}.`)
  }
}

async function listMarkdownFiles(directory) {
  const result = new Map()
  async function visit(currentDirectory) {
    for (const entry of await readdir(currentDirectory, { withFileTypes: true })) {
      const path = join(currentDirectory, entry.name)
      if (entry.isDirectory()) {
        await visit(path)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        result.set(relative(directory, path).split(sep).join('/'), await readFile(path))
      }
    }
  }
  await visit(directory)
  return result
}

async function changedPortugueseDocuments(baseDocumentationDirectory, proposedDocumentationDirectory) {
  const baseFiles = await listMarkdownFiles(join(baseDocumentationDirectory, 'pt-br'))
  const proposedFiles = await listMarkdownFiles(join(proposedDocumentationDirectory, 'pt-br'))
  const paths = [...new Set([...baseFiles.keys(), ...proposedFiles.keys()])].sort()
  return paths.flatMap((path) => {
    const base = baseFiles.get(path)
    const proposed = proposedFiles.get(path)
    if (base?.equals(proposed) ?? proposed === undefined) return []
    return [{
      path: `docs/pt-br/${path}`,
      state: proposed ? 'present' : 'deleted',
      sha256: proposed ? sha256(proposed) : undefined,
      previousSha256: proposed ? undefined : sha256(base),
    }]
  })
}

function validateBrief(brief, expectedBaseCommit) {
  assert(brief.schemaVersion === 1, 'Brief schemaVersion must be 1.')
  for (const field of ['id', 'runId', 'productRevision', 'baseDocumentationRevision', 'workflowRevision', 'skillRevision', 'title']) {
    assert(typeof brief[field] === 'string' && brief[field].trim().length > 0, `Brief ${field} is required.`)
  }
  assert(brief.baseDocumentationRevision === expectedBaseCommit, 'Brief baseDocumentationRevision must equal the pull request base commit.')
  assert(commitPattern.test(brief.workflowRevision), 'Brief workflowRevision must be a full commit SHA.')
  assert(commitPattern.test(brief.skillRevision) || sha256Pattern.test(brief.skillRevision), 'Brief skillRevision must be a full commit SHA or SHA-256 digest.')
  assert(brief.documentationImpact && typeof brief.documentationImpact === 'object' && !Array.isArray(brief.documentationImpact), 'Brief documentationImpact is required.')
  assert(Array.isArray(brief.downstreamConsumers), 'Brief downstreamConsumers must be an array.')
  assert(Array.isArray(brief.roadmapExcluded), 'Brief roadmapExcluded must be an array.')
}

function validateApproval(approval, brief, briefSource, changedDocuments) {
  assert(approval.schemaVersion === 1, 'Approval schemaVersion must be 1.')
  assert(approval.runId === brief.runId, 'Approval runId must match the brief.')
  assert(approval.briefSha256 === sha256(briefSource), 'Approval briefSha256 does not match the exact brief block.')
  assert(approval.decision === 'approved', 'Approval decision must be approved.')
  assert(typeof approval.approvedAt === 'string' && !Number.isNaN(Date.parse(approval.approvedAt)), 'Approval approvedAt must be an ISO timestamp.')
  assert(Array.isArray(approval.ptBrDocuments) && approval.ptBrDocuments.length > 0, 'Approval ptBrDocuments must list every changed Brazilian Portuguese document.')

  const expected = new Map(changedDocuments.map((document) => [document.path, document]))
  const observed = new Set()
  for (const document of approval.ptBrDocuments) {
    assert(document && typeof document === 'object' && !Array.isArray(document), 'Each approved Brazilian Portuguese document must be an object.')
    assert(typeof document.path === 'string' && document.path.startsWith('docs/pt-br/') && document.path.endsWith('.md'), 'Approved document paths must be Markdown files under docs/pt-br/.')
    assert(!document.path.includes('..'), 'Approved document paths may not traverse directories.')
    assert(!observed.has(document.path), `Approved document ${document.path} is duplicated.`)
    observed.add(document.path)
    const changed = expected.get(document.path)
    assert(changed, `Approved document ${document.path} is not changed by this pull request.`)
    assert(document.state === changed.state, `Approved document ${document.path} has the wrong state.`)
    if (changed.state === 'present') {
      assert(document.sha256 === changed.sha256, `Approved document ${document.path} does not match its exact content hash.`)
      assert(document.previousSha256 === undefined, `Present document ${document.path} may not declare previousSha256.`)
    } else {
      assert(document.previousSha256 === changed.previousSha256, `Deleted document ${document.path} does not match its previous content hash.`)
      assert(document.sha256 === undefined, `Deleted document ${document.path} may not declare sha256.`)
    }
  }
  assert(observed.size === expected.size, 'Approval must list every changed Brazilian Portuguese document and no others.')
}

export async function validateEditorialPullRequest({
  body,
  baseCommit,
  baseDocumentationDirectory,
  proposedDocumentationDirectory,
}) {
  assert(typeof body === 'string', 'Pull request body is required.')
  assert(commitPattern.test(baseCommit), 'Pull request base commit must be a full commit SHA.')
  const briefSource = extractBlock(body, briefStartMarker, 'editorial brief')
  const approvalSource = extractBlock(body, approvalStartMarker, 'editorial approval')
  assertSafePublicMetadata(`${briefSource}\n${approvalSource}`)
  const brief = parseObject(briefSource, 'Editorial brief')
  const approval = parseObject(approvalSource, 'Editorial approval')
  validateBrief(brief, baseCommit)
  const changedDocuments = await changedPortugueseDocuments(
    resolve(baseDocumentationDirectory),
    resolve(proposedDocumentationDirectory),
  )
  assert(changedDocuments.length > 0, 'An editorial release pull request must change at least one Brazilian Portuguese document.')
  validateApproval(approval, brief, briefSource, changedDocuments)
  return { runId: brief.runId, approvedDocuments: changedDocuments.length }
}

function readOption(arguments_, name) {
  const index = arguments_.indexOf(name)
  if (index === -1 || !arguments_[index + 1]) fail(`Missing ${name}.`)
  return arguments_[index + 1]
}

async function main() {
  const arguments_ = process.argv.slice(2)
  const sourceDirectory = readOption(arguments_, '--source')
  const baseSourceDirectory = readOption(arguments_, '--base-source')
  const eventPath = readOption(arguments_, '--event')
  const event = JSON.parse(await readFile(eventPath, 'utf8'))
  const result = await validateEditorialPullRequest({
    body: event.pull_request?.body,
    baseCommit: event.pull_request?.base?.sha,
    baseDocumentationDirectory: baseSourceDirectory,
    proposedDocumentationDirectory: sourceDirectory,
  })
  console.log(`Validated editorial approval ${result.runId} for ${result.approvedDocuments} Brazilian Portuguese document(s).`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main()
}
