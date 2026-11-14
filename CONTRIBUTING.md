# Updating the portfolio

Node.js 18 or newer is sufficient. No dependency installation or build service is required.

1. Add or update an entry in `projects.json` with category `game`, `tool`, or `experiment`.
2. Set `primary_destination` to `itch` or `render`, and provide that URL. Keep unavailable links as `null`.
3. Use the observed release version and status (`prototype`, `demo`, `released`, `maintenance-only`, or `archived`). List a prototype/demo only when the linked experience is actually available. Set `featured` only for the small selection shown on the profile.
4. Provide the demonstration's scope in `video_note`, particularly if it predates the current version. Include public source and feedback URLs when available.
5. Run `node scripts/render-catalog.mjs`, then `node scripts/render-catalog.mjs --check`. Review the generated profile and category pages and verify their destination links before publishing.

Keep project descriptions in English. The portfolio itself is rendered as GitHub Markdown; applications and downloads are distributed through their itch.io or Render destinations. Existing project hosting is preserved until an explicit migration task.
