# GitHub portfolio refresh

## Goal

Use the existing `quinnqin-dev/quinnqin-dev` public repository as Quinn's personal profile and portfolio directory, with a concise featured section and complete Games / Tools / Experiments categories.

## Acceptance

- Preserve the existing personal voice and public project history.
- Use a single project catalog to generate the profile and category pages without dependencies or a hosting service.
- List verified published work; retain working product links and show the scope of older demonstrations.
- Keep individual source repositories independent and preserve existing visibility and deployments.

## Verification and status

Implementation complete. Generator syntax and generated-page freshness checks passed, as did Git whitespace validation. Sheet Merger v1.1.1 was verified through the GitHub release API; the application returned HTTP 200, and YouTube oEmbed confirmed the linked video title and Quinn Build author. All 12 relative navigation links across the four generated pages were checked. GitHub-rendered Markdown was inspected in local desktop and 390-pixel mobile previews; the mobile document had no horizontal overflow. Live GitHub profile/category rendering is pending because public synchronization requires explicit confirmation after an automated approval rejection. This repository is the portfolio itself; no separate application deployment is required.

## Launch handoff

- Local path: `/Users/a1234/Projects/quinnqin-dev`.
- GitHub repository: https://github.com/quinnqin-dev/quinnqin-dev .
- Public profile destination: https://github.com/quinnqin-dev .
- Experience: browse a short creator profile, inspect featured work, then open Games, Tools or Experiments for the complete category.
- Run/update: `node scripts/render-catalog.mjs`; verify generated content with `node scripts/render-catalog.mjs --check`.
- Demonstration: open Sheet Merger from the Tools category; the linked video covers the original merge workflow, not the later comparison feature.
- Limits: Games and Experiments currently have no released entries. No itch.io profile URL is claimed because it has not been verified. Sheet Merger retains its existing Render static URL. No application deployment, migration, Dockerfile, narration or social promotion is part of this refresh.
- Promo assets: unavailable for this portfolio refresh; existing Sheet Merger assets remain in that project's existing location.
- Repository status: committed locally; public push is awaiting confirmation. The existing repository visibility and published profile have not changed.
- Next: obtain approval for the concrete public synchronization, push the prepared change, and verify the live profile/category navigation. Then maintain project facts in `projects.json` as new work is released. Candidate ideas remain outside the public catalog. Local commit and delivery status are retained in the studio ledger.
