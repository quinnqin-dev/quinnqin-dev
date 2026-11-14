# Portfolio maintenance

This repository is Quinn's public GitHub profile and portfolio directory. Preserve the personal introduction, existing project history, and brand identity.

- Maintain public project facts in `projects.json`; run `node scripts/render-catalog.mjs` to generate `README.md` and the three category pages. Verify with `node scripts/render-catalog.mjs --check`.
- Keep the root README concise with selected featured projects. Use Games, Tools, and Experiments for the complete catalog. Do not list unselected ideas as playable projects.
- Games, downloads, and frontend/static projects use itch.io. Render is for genuine backend services. Preserve existing service URLs until a migration is separately requested. GitHub is the portfolio/source directory; no Pages deployment or Dockerfile is needed here.
- Each project has an English one-sentence summary, status, version, available itch.io/Render links, and a demonstration video when available. Use `null` for missing URLs. Mark the scope of an older video rather than implying it covers a newer release.
- Link only explicitly public source repositories. Preserve private-project confidentiality. Do not invent itch.io destinations or add tracking/services merely to maintain a directory.
- Source repositories stay independent; this repository stores portfolio material and its small dependency-free generator.
