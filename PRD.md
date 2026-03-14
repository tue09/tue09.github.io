# Product Requirements Document

## Product

Personal homepage for Le Dinh Tri Tue (`tue09.github.io`)

## Document Status

- Version: 1.0
- Date: March 6, 2026
- Authoring basis: resume at `/mnt/data/safetyCode/LeDinhTriTue_resume.pdf`

## 1. Purpose

Build a personal homepage that presents Le Dinh Tri Tue as a research-oriented AI engineer and AI resident working on post-training large language models, reinforcement fine-tuning, AI for code, and reasoning. The site should function as a professional public profile, research portfolio, and contact surface for recruiters, collaborators, and graduate program reviewers.

## 2. Background

The current repository already contains a polished static GitHub Pages site, but its content is for an unrelated AI residency CV screening product. This PRD defines the requirements to reposition the site into a personal homepage that reflects Tue's profile, research trajectory, publications, and achievements.

## 3. Goals

- Establish a credible research identity within 10-20 seconds of landing on the page.
- Make publications, research areas, and current work easy to scan.
- Provide enough evidence of technical depth for research labs, AI teams, and graduate admissions.
- Convert visitors into concrete actions: contact, CV download, GitHub exploration, and publication clicks.
- Keep the site lightweight and compatible with static GitHub Pages hosting.

## 4. Non-Goals

- Building a blog CMS or dynamic content backend.
- Hosting full paper summaries for every publication.
- Adding authentication, analytics dashboards, or admin tooling in v1.
- Turning the site into a generic corporate portfolio.

## 5. Target Audience

### Primary

- Research scientists and hiring managers evaluating AI/ML candidates.
- Academic collaborators and graduate program reviewers.

### Secondary

- Engineers interested in LLM post-training, reasoning, and AI for code.
- Hackathon peers and broader professional network.

## 6. Positioning

### Core message

"Research-driven AI engineer focused on post-training LLMs for code, reasoning, reliability, and alignment."

### Supporting proof points

- AI Resident at Fsoft AI Center since May 2025.
- AI Engineer experience at VinBigdata Institute.
- Research experience across BKAI labs at HUST.
- Publications spanning NAACL 2025, ACL 2025, EMNLP 2025, NeurIPS 2025, AAAI 2026, and an under-review coding-agent benchmark paper.
- Strong mathematics background, including Vietnam National Mathematical Olympiad awards.

## 7. User Needs

Visitors should be able to:

- Understand who Tue is and what he works on without reading the full resume.
- See current role, focus areas, and research interests immediately.
- Browse publications with venue and authorship context.
- Review experience timeline and education.
- Access resume, GitHub, Hugging Face, LinkedIn, and contact details.
- Gain confidence that the site represents serious technical and research work.

## 8. Product Principles

- Research-first: lead with current work and publications, not generic self-description.
- High signal density: concise copy, evidence-heavy sections, minimal filler.
- Personal but professional: distinct identity without looking like a startup landing page.
- Static and maintainable: simple HTML/CSS/JS and easy manual updates.
- Mobile-safe: publication and timeline sections must remain readable on small screens.

## 9. Resume-Derived Content Inputs

### Identity

- Name: Le Dinh Tri Tue
- Location: Hanoi, Vietnam
- Email: tue209003@gmail.com
- Phone: 0835224458

### Professional focus

- Post-training for LLMs
- Reinforcement fine-tuning
- AI for code
- Reasoning tasks
- Reliability and alignment

### Experience

- AI Resident, Fsoft AI Center, May 2025 - Present
- AI Engineer, VinBigdata Institute, Jul 2024 - May 2025
- Research Student, Data Science Laboratory, BKAI - HUST, Oct 2023 - Sep 2025
- Research Student, MSO Laboratory, BKAI - HUST, Feb 2023 - Jan 2024

### Education

- B.S. Computer Science (Talented Program), Hanoi University of Science and Technology, Sep 2021 - Jul 2025, GPA 3.4/4.0
- Ha Tinh High School for Gifted Students, Math Honors Class

### Honors

- Second Prize, Vietnam National Mathematical Olympiad 2021
- Third Prize, Vietnam National Mathematical Olympiad 2020
- Participated in Vietnam Team Selection Tests
- Odon Vallet Scholarship 2020

### Publications

- Sharpness-Aware Minimization for Topic Models with High-Quality Document Representations, NAACL 2025, co-first author
- HiCOT: Improving Neural Topic Models via Optimal Transport and Contrastive Learning, ACL 2025, co-first author
- Multi-Surrogate-Objective Optimization for Neural Topic Models, EMNLP 2025, first author
- Token-Level Self-Play with Importance-Aware Guidance for Large Language Models, NeurIPS 2025, first author
- MCW-KD: Multi-Cost Wasserstein Knowledge Distillation for Large Language Models, AAAI 2026, co-author
- SWE-EVO: Benchmarking Coding Agents in Long-Horizon Software Evolution Scenarios, under review, co-first author

### Activities

- SOICT Hackathon 2023, Routing Optimization track
- IAI Hackathon 2024, Intelligence DECODE-A-THON
- SOICT Hackathon 2024, Legal Document Retrieval track

## 10. Core User Stories

- As a recruiter, I want to quickly assess Tue's specialization, so I can decide whether to contact him.
- As a researcher, I want to scan publications and research themes, so I can evaluate overlap for collaboration.
- As a graduate reviewer, I want to see academic progression, awards, and publications in one place.
- As a peer engineer, I want direct links to GitHub and resume, so I can inspect technical work.

## 11. Information Architecture

- Hero
- Research Focus
- Selected Publications
- Experience Timeline
- Education and Honors
- Activities and Community
- Contact / Links

## 12. Functional Requirements

### 12.1 Hero

- Must show full name, role descriptor, and one-sentence research summary above the fold.
- Must include primary CTA to view publications or research work.
- Must include secondary CTA to download resume.
- Must show outbound links for GitHub, Hugging Face, LinkedIn, and email.

### 12.2 Research Focus Section

- Must summarize Tue's main areas:
  post-training LLMs, reinforcement fine-tuning, AI for code, reasoning, reliability, alignment.
- Should present 3-5 short research cards or pillars.
- May include a short note on current work at Fsoft AI Center.

### 12.3 Publications Section

- Must list all publications from the resume.
- Each item must show title, venue/year, and authorship role.
- If links are available later, design should support paper/code buttons without layout changes.
- Should visually distinguish first-author or co-first-author work.
- Must support an "under review" status label for non-finalized work.

### 12.4 Experience Section

- Must use a chronological timeline or stacked cards.
- Each experience entry must include organization, role, dates, and 1-2 lines on research focus.
- Current role should be visually emphasized.

### 12.5 Education and Honors

- Must include HUST degree details and math-focused high school background.
- Must surface VMO awards prominently as differentiators.
- Should include scholarship and national team selection test mention.

### 12.6 Activities

- Should include hackathons as evidence of broader technical engagement.
- Can be compact; this is a supporting section, not a primary section.

### 12.7 Contact and External Links

- Must include email.
- Must include resume link.
- Must provide placeholders or actual links for GitHub, Hugging Face, and LinkedIn.
- Must make contact actions obvious on mobile and desktop.

## 13. Content Requirements

- Copy tone should be precise, technical, and modest.
- Avoid exaggerated claims like "world-class" or "visionary."
- Lead with current LLM research work, not older optimization work.
- Older research should still appear in the timeline to show depth and progression.
- Publication titles must remain accurate to the resume.
- Dates should match the resume exactly unless the user later asks for edits.

## 14. Visual and UX Direction

- Visual style should feel more like a research profile than a SaaS landing page.
- Keep the current high-quality, modern aesthetic only if content is fully reoriented toward a personal site.
- Use strong typography, restrained animation, and clear section contrast.
- Prioritize readability over decorative density in the publications and experience sections.
- Mobile layout should collapse cleanly without hiding critical content.

## 15. Technical Constraints

- Must work as a static site on GitHub Pages.
- Prefer plain HTML, CSS, and JavaScript.
- No backend or build system required for v1.
- Performance should remain strong with minimal JavaScript.
- Resume PDF should remain downloadable from the existing `assets/` folder.

## 16. Success Metrics

### Qualitative

- A visitor can answer "What does Tue work on?" within 10 seconds.
- A visitor can find publications and resume without scrolling confusion.
- The site feels specific to an AI researcher, not a generic template.

### Practical

- All external profile and resume links work.
- Core content is readable on mobile.
- No broken layout in publication-heavy sections.

## 17. Risks

- The current site structure may bias the implementation toward product-demo visuals rather than a personal profile.
- Missing public URLs for GitHub, Hugging Face, LinkedIn, and paper links may limit launch completeness.
- Publication list may expand frequently, so layout must tolerate growth.

## 18. Open Questions

- What are the exact public URLs for GitHub, Hugging Face, and LinkedIn?
- Which publication links should be attached to each paper?
- Does Tue want a short bio paragraph in first person or third person?
- Should the homepage emphasize job search, research collaboration, or graduate applications?
- Does he want to include project demos beyond publications?

## 19. Recommended v1 Scope

- One polished single-page homepage.
- Resume download.
- Research focus summary.
- Full publications list.
- Experience timeline.
- Education, honors, and activities.
- Contact and external links.

## 20. Future Enhancements

- Detailed publication pages or paper abstracts.
- Project showcase with demos and code links.
- News / updates section for ongoing research.
- Talks, awards, and media coverage.
- Light analytics for outbound click tracking.

## 21. Acceptance Criteria

- A new visitor can identify Tue's current role, research focus, and location from the hero section.
- The page contains accurate sections for publications, experience, education, honors, and contact.
- The resume is downloadable from the homepage.
- The publication section clearly differentiates venue, year, and authorship role.
- The page is static-site compatible and suitable for deployment to `tue09.github.io`.
