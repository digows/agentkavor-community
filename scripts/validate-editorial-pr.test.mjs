import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { validateEditorialPullRequest } from './validate-editorial-pr.mjs'

const baseCommit = 'a'.repeat(40)
const workflowRevision = 'b'.repeat(40)
const skillRevision = 'c'.repeat(40)

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

async function withChangedCorpus(callback) {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'kavor-editorial-pr-test-'))
  const baseDirectory = join(temporaryDirectory, 'base')
  const proposedDirectory = join(temporaryDirectory, 'proposed')
  try {
    await cp(resolve('docs'), baseDirectory, { recursive: true })
    await cp(resolve('docs'), proposedDirectory, { recursive: true })
    const documentPath = join(proposedDirectory, 'pt-br', 'first-loop.md')
    await writeFile(documentPath, `${await readFile(documentPath, 'utf8')}\n`)
    return await callback({ baseDirectory, proposedDirectory, documentPath })
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
}

function bodyFor(documentSha256, options = {}) {
  const brief = `schemaVersion: 1
id: first-loop-update
runId: editorial-2026-08-05-first-loop
productRevision: ${'d'.repeat(40)}
baseDocumentationRevision: ${baseCommit}
workflowRevision: ${workflowRevision}
skillRevision: ${skillRevision}
title: First loop update
documentationImpact:
  create: []
  update: [first-loop]
  redirect: []
  archive: []
downstreamConsumers: []
roadmapExcluded: []`
  const approval = `schemaVersion: 1
runId: editorial-2026-08-05-first-loop
briefSha256: ${options.briefSha256 ?? sha256(brief)}
ptBrDocuments:
  - path: docs/pt-br/first-loop.md
    state: present
    sha256: ${documentSha256}
decision: approved
approvedAt: 2026-08-05T17:24:36Z`
  return `Summary\n\n<!-- kavor-editorial-brief\n${brief}\n-->\n\n<!-- kavor-editorial-approval\n${approval}\n-->`
}

test('accepts approval bound to the exact brief and changed Portuguese content', async () => {
  await withChangedCorpus(async ({ baseDirectory, proposedDirectory, documentPath }) => {
    const result = await validateEditorialPullRequest({
      body: bodyFor(sha256(await readFile(documentPath))),
      baseCommit,
      baseDocumentationDirectory: baseDirectory,
      proposedDocumentationDirectory: proposedDirectory,
    })
    assert.deepEqual(result, { runId: 'editorial-2026-08-05-first-loop', approvedDocuments: 1 })
  })
})

test('rejects Portuguese content changed after approval', async () => {
  await withChangedCorpus(async ({ baseDirectory, proposedDirectory }) => {
    await assert.rejects(validateEditorialPullRequest({
      body: bodyFor('e'.repeat(64)),
      baseCommit,
      baseDocumentationDirectory: baseDirectory,
      proposedDocumentationDirectory: proposedDirectory,
    }), /does not match its exact content hash/)
  })
})

test('rejects approval for a different brief revision', async () => {
  await withChangedCorpus(async ({ baseDirectory, proposedDirectory, documentPath }) => {
    await assert.rejects(validateEditorialPullRequest({
      body: bodyFor(sha256(await readFile(documentPath)), { briefSha256: 'f'.repeat(64) }),
      baseCommit,
      baseDocumentationDirectory: baseDirectory,
      proposedDocumentationDirectory: proposedDirectory,
    }), /briefSha256 does not match/)
  })
})

test('rejects public metadata containing a private local path', async () => {
  await withChangedCorpus(async ({ baseDirectory, proposedDirectory, documentPath }) => {
    const body = bodyFor(sha256(await readFile(documentPath))).replace('title: First loop update', 'title: /Users/private/workspace')
    await assert.rejects(validateEditorialPullRequest({
      body,
      baseCommit,
      baseDocumentationDirectory: baseDirectory,
      proposedDocumentationDirectory: proposedDirectory,
    }), /prohibited personal macOS path/)
  })
})
