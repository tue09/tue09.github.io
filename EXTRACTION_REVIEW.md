# Extraction Review

The latest resume is the factual source. The previous homepage is used only for existing public links and presentation priorities.

## Open review item

- [ ] SWE-EVO author order in the resume lists Tue Le first, while the current arXiv metadata lists Minh V. T. Thai first. The resume order is retained because it is the user-designated source.

## Resolved source differences

- The January 2026 Mila role and the 2026 Neurocomputing paper were missing from the previous homepage. Both are included from the latest resume.
- The research statement from the previous homepage was replaced with the updated resume wording about reasoning, alignment, post-training, and reinforcement learning.
- Publication links and bibliographic details were checked against the official arXiv, AAAI, NeurIPS, ACL Anthology, and ScienceDirect records.

After editing `profile.yml`, `publications.bib`, `bio.md`, or `news.md`, regenerate the site with:

```bash
python3 tools/aris_homepage.py render --persona theory-minimal
```
