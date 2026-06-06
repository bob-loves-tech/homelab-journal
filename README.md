# Homelab Journal

Astro source for Bobby Olejnik's Homelab Journal.

Live site:

```text
https://bob-loves-tech.github.io/homelab-journal/
```

## Project Structure

```text
src/content/blog/        Blog post markdown
src/layouts/             Shared Astro layouts
src/pages/               Homepage, post route, sitemap
public/                  Static assets, robots.txt, llms.txt
```

Posts live under:

```text
src/content/blog/<category>/<slug>.md
```

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm ci`                  | Installs locked dependencies                     |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deployment

GitHub Actions deploys the site to GitHub Pages from `.github/workflows/deploy.yml`.

Pushes to `main` run:

```text
npm ci
npm run build
actions/deploy-pages@v4
```

The workflow uploads `dist` and publishes it to GitHub Pages.

## SEO

This repo includes:

- self-referencing canonical tags
- WebSite/WebPage schema on the homepage
- BlogPosting schema on posts
- dynamic sitemap at `/homelab-journal/sitemap.xml`
- project-level robots file at `/homelab-journal/robots.txt`
- project-level llms file at `/homelab-journal/llms.txt`

For deeper checks, use Codex SEO from the agent workspace.
