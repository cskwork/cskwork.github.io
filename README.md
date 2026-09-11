# AI Insights Lab (English)

Hugo (PaperMod) source for https://cskwork.github.io/. Built by GitHub Actions and deployed to GitHub Pages.

- Posts: `content/posts/`
- Korean edition: https://cskwork.github.io/seomachine-ai-blog/

## Local

```bash
git submodule update --init --depth 1
hugo server -D
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes. Pages source must be set to **GitHub Actions** in the repository settings.

The theme [PaperMod](https://github.com/adityatelange/hugo-PaperMod) is MIT licensed.
