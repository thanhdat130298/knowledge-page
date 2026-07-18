---
name: audit-phases
description: >-
  Audits Knowledge FStack phase completion against knowledge_base.md PRD and
  the phase plan. Maps requirements to code evidence and reports PASS /
  PASS_WITH_GAPS / FAIL. Use when checking a phase, PRD coverage, knowledge_base
  alignment, closing a phase, or before acceptance criteria (§34).
---

# Audit phases ↔ PRD ↔ plan

## When to run

- User asks: check phase, khớp knowledge_base, PRD coverage, phase done chưa
- Before marking any phase P0–P8 complete
- Before claiming MVP / acceptance §34

## Sources of truth

Read in this order:

1. `knowledge_base.md` (full or sections for the target phase)
2. `.cursor/plans/knowledge_fstack_phases_e0b638cd.plan.md` (P0–P8 scope)
3. `docs/PHASE_AUDIT.md` (mapping + report template)
4. Repo: routes, components, migrations, tests, `docs/`, `.cursor/rules`, `.cursor/skills`

## Procedure

1. Identify scope: single phase `Px` or `Full MVP`.
2. Load PRD sections for that scope (see mapping below).
3. Load plan bullets for that phase.
4. Scan the repo for evidence (paths, migrations, tests).
5. Map each requirement → plan item → code evidence.
6. Emit the report template from `docs/PHASE_AUDIT.md`.
7. Verdict rules:
   - **PASS**: all in-scope PRD items have evidence; related acceptance items met
   - **PASS_WITH_GAPS**: core works; minor gaps listed with PRD cites
   - **FAIL**: missing core features or acceptance for this phase

## Hard rules

- Never mark **PASS** if related acceptance criteria for the phase are missing.
- Do not expand beyond MVP; label out-of-scope if PRD says not to build it.
- Every gap must cite `knowledge_base.md` (e.g. §11 Comment).
- If continuing implementation after audit: stay in current phase scope unless user asks for full MVP.

## Phase → PRD mapping

| Phase | PRD focus |
|-------|-----------|
| P0 | Stack, theme, env, schema skeleton, Cursor scaffolding |
| P1 | §1 Roles, §2 Auth, login modal |
| P2 | §3 Header, §4 Home, §5/§7 read path, §27 seed |
| P3 | §5 URL filters, §6 Search, §23 SEO |
| P4 | §8 Rating, §9 Bookmark, §10 Progress, §11 Comment |
| P5 | §14 Dashboard, §15 Article mgmt, §17 Image |
| P6 | §16 Tiptap editor, §7 custom blocks |
| P7 | §18 Category, §19 Tag, §12 Feedback admin, §11 moderation |
| P8 | §20–§26, §28–§34 (polish, quality, docs, deploy, acceptance) |

Full checklist and report template: `docs/PHASE_AUDIT.md`.
