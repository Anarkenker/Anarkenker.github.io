# Deployment

The site is published at https://anarkenker.github.io/Personal-homepage/.

GitHub Pages uses **GitHub Actions** as its publishing source. Every push to `main` runs `.github/workflows/pages.yml`, builds the site with Jekyll, and deploys it. Deployment progress is available in the repository's **Actions** tab.

To publish local edits:

```sh
git add -A
git commit -m "Update homepage"
git push origin main
```

To preview locally:

```sh
bundle install
bundle exec jekyll serve --baseurl ""
```

Open http://localhost:4000/. Use Ruby 4.0.7 to match the deployment workflow.

Site content is configured in `_data/profile.yml`, `_data/projects.yml`, `_data/gallery.yml`, `_news/`, and `_publications/`.

Gallery photos are grouped into albums in `_data/gallery.yml`. Add images to an album's `photos` list with an `image` path and descriptive `alt` text. Only the album title, date, and photo count are displayed. To add another location, add an album entry and a page under `gallery/` using `layout: album`, the matching `album` ID, and the album's URL as its `permalink`.

If the repository is renamed to `Anarkenker.github.io`, set `baseurl` to `""` in `_config.yml`. The deployment workflow also reads the repository's Pages base path automatically.
