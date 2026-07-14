# Projects — Evren / Galekto

## Mission
Create implementation-ready, token-driven UI guidance for Projects — Evren / Galekto that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: Projects — Evren / Galekto
- URL: https://galekto.com/projects
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Space Grotesk`, `font.family.stack=Space Grotesk, Helvetica Neue, Arial, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=9px`, `font.size.sm=10.56px`, `font.size.md=10.88px`, `font.size.lg=11.52px`, `font.size.xl=12px`, `font.size.2xl=13px`, `font.size.3xl=13.12px`, `font.size.4xl=13.33px`
- Color palette: `color.text.primary=#ffffff`, `color.border.muted=#1c1917`, `color.border.strong=#0a1929`, `color.text.inverse=#ef4444`, `color.surface.base=#000000`, `color.surface.raised=#60a5fa`, `color.surface.strong=#f4f2ee`
- Spacing scale: `space.1=10px`, `space.2=13px`, `space.3=14px`, `space.4=18px`, `space.5=20px`, `space.6=22px`, `space.7=24px`, `space.8=28px`
- Radius/shadow/motion tokens: `radius.xs=2px`, `radius.sm=16px` | `motion.duration.instant=150ms`, `motion.duration.fast=200ms`, `motion.duration.normal=250ms`, `motion.duration.slow=300ms`, `motion.duration.slower=450ms`, `motion.duration.step6=550ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (24), buttons (7), cards (5), navigation (4), lists (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
