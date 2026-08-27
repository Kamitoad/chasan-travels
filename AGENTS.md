# Repository guidance

## Project direction

- Keep the site a static Astro blog unless a concrete requirement needs server-side behavior.
- Store posts in the `blog` content collection. Add a database, CMS, or React only when a clear use
  case justifies the additional complexity.
- Reuse the existing design tokens and plain CSS before introducing another styling system.

## Structure and code quality

- Keep routes in `src/pages`, layouts in `src/layouts`, reusable UI in `src/components`, and
  content-related logic close to the content domain.
- Prefer clear, semantic names and focused modules over generic catch-all utilities.
- Preserve stable post IDs because filenames become public URLs.
- Use the repository package manager and keep `pnpm-lock.yaml` in sync.
- Before completing code changes, run `pnpm format:check`, `pnpm check`, and `pnpm build`.

## Content, accessibility, and privacy

- Treat the content schema as the source of truth for post metadata.
- Keep new posts as drafts until their content, images, rights, and privacy have been reviewed.
- Provide meaningful alternative text for content images. Use empty alternative text only for
  decorative images.
- Preserve semantic HTML, heading order, keyboard access, visible focus, responsive layouts, and
  reduced-motion preferences.
- Never commit credentials, private contact details, travel documents, exact live locations, or
  private schedules.
- Review the privacy impact before adding analytics, embeds, forms, or third-party scripts.
- Treat the MIT license for source code separately from the copyright of personal writing and photos.

## Documentation

- Keep setup and deployment instructions in `README.md`.
- Update `docs/content-guide.md` when the authoring workflow or content schema changes.
- Prefer the official Astro documentation for framework behavior.
