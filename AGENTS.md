# Agent Instructions

This is the real Astro source repo for Homelab Journal.

Published site:

```text
https://bob-loves-tech.github.io/homelab-journal/
```

Source repo:

```text
https://github.com/bob-loves-tech/homelab-journal
```

## Writing Posts

New posts belong under:

```text
src/content/blog/<category>/<slug>.md
```

Use the migrated Homelab Journal agent skills from the sibling agent-data repo:

```text
C:\Users\bobby\Documents\Homelab Blog\.agents\skills\blog-writer\SKILL.md
C:\Users\bobby\Documents\Homelab Blog\.agents\skills\creative\bobby-writing-voice\SKILL.md
C:\Users\bobby\Documents\Homelab Blog\.agents\skills\creative\humanizer\SKILL.md
```

Draft first, run the build, then wait for Bobby's explicit approval before pushing.

## Build And Publish

Local verification:

```sh
npm ci
npm run build
```

Deployment is handled by GitHub Actions in `.github/workflows/deploy.yml`.

Pushes to `main` run:

```text
npm ci
npm run build
actions/deploy-pages@v4
```

The workflow deploys `dist` to GitHub Pages.

## SEO

Codex SEO is installed under:

```text
C:\Users\bobby\.codex\skills\seo
```

Use it for audits before publishing substantial new posts:

```text
/seo technical https://bob-loves-tech.github.io/homelab-journal/
/seo schema https://bob-loves-tech.github.io/homelab-journal/
/seo content https://bob-loves-tech.github.io/homelab-journal/
/seo geo https://bob-loves-tech.github.io/homelab-journal/
```

Core SEO, visual, and Google API packages are installed. Premium PDF reports require WeasyPrint native GTK dependencies on Windows.
