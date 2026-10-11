# Contributing

Thank you for helping. Corrections to a lesson, a tool that does something wrong, a French wording
that reads badly and a new idea are all welcome.

## Before you start

- **One change per pull request**, with the reason in the description. A screenshot helps for anything visual.
- **Open an issue first** for a new tool or a change of behaviour, so the effort is not wasted.
- **Keep the promise.** A tool works on a file in the page and never sends it anywhere. A change that adds
  a network request, a tracker, an account or a watermark will not be merged. `tests/network-surface.test.mjs`
  fails on a new request until a maintainer has reviewed it.

## Where changes go

`app/growth-lab/` is copied from the 3D3D site's own repository (see `SYNC.json` and the README, "Where the
code comes from"). You can change it here: open the pull request against the files you changed, and a
maintainer applies the same change at the source. Do not reformat files you are not changing, because the
next copy overwrites them.

The files around it (`app/root.tsx`, `app/routes.ts`, `app/content/`, `app/lib/`, `app/ui/`, `scripts/`,
`tests/` files that are not copied, the READMEs) belong to this repository and take pull requests directly.

## Adding or changing a tool

1. English and French together. Every string a visitor reads has a French counterpart; a tool without one
   is not finished. The tool's guide lives in `app/growth-lab/seo/content/<tool>.en.ts` and `.fr.ts`.
2. Reuse the kit in `app/growth-lab/shared/` (stages, projects, brand details, file handling, exports)
   instead of writing a new one.
3. A file a visitor brings is checked before it is used (see `tests/import-safety.test.mts`). A new
   importer needs a hostile-input case there.
4. No em dashes in text a visitor reads, no invented claims, no numbers nobody measured.

## Check your change

```bash
npm ci
npm run typecheck
npm test
npm run scan        # no secrets, addresses or internal references
npm run build
```

Say in the pull request what you ran and what you could not run.

## Lesson corrections

A correction to a lesson needs the passage, the replacement and a source link if you have one. Do not
include private customer details. Accepted corrections can be credited by name if you ask for it.
