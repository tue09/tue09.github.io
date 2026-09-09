# Le Dinh Tri Tue - Academic Homepage

This repository contains the source for [tue09.github.io](https://tue09.github.io/).

The homepage is generated from editable academic source files:

- `profile.yml`: identity, affiliations, education, interests, links, honors, projects, and publication display settings
- `publications.bib`: publication metadata
- `bio.md`: homepage biography
- `news.md`: dated updates
- `audit-report.md`: publication audit output

## Regenerate the site

From the repository root, run:

```bash
python3 tools/aris_homepage.py render --persona theory-minimal
```

For a fast offline design preview that skips the publication audit:

```bash
python3 tools/aris_homepage.py render --persona theory-minimal --no-audit
```

The generated `index.html` is a self-contained static page that GitHub Pages serves directly.
