# Kavor documentation

This directory is the public editorial source for the documentation published at
[agentkavor.com/docs](https://agentkavor.com/en/docs).

Every document is plain Markdown with validated YAML frontmatter. Locale directories mirror the stable document IDs
and paths in `catalog.yaml`. Do not add MDX, JSX, imports, scripts, raw HTML, or executable examples.

The seven supported locale directories are `en`, `pt-br`, `es`, `fr`, `zh`, `ja`, and `ru`. A translation must be
complete and current before its URL is published; the website never substitutes English inside a localized route.

Documentation contributions are licensed under [CC BY 4.0](LICENSE). See the repository
[contribution guide](../CONTRIBUTING.md) before opening a pull request.

## Validate a documentation release

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm docs:validate
pnpm test
```

The validator rejects missing translations, unsafe Markdown, broken documents or heading anchors, release-body
drift, private local paths, credential-shaped content, and catalog inconsistencies. A pull request that changes the
documentation tree must advance `releaseId` and set `previousReleaseId` to the release currently on `main`. Pull
request validation executes the trusted validator from the base branch; contributed files are treated only as data.
