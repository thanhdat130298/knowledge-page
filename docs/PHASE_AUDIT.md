# Phase audit — Knowledge FStack

Đối chiếu implementation với PRD và plan. Dùng cùng với:

- Rule always-apply: `.cursor/rules/phase-prd-alignment.mdc`
- Skill: `.cursor/skills/audit-phases/SKILL.md`
- PRD: `knowledge_base.md`
- Plan: `.cursor/plans/knowledge_fstack_phases_e0b638cd.plan.md`

## Khi nào audit

- Sau khi hoàn thành một phase (P0–P8)
- Khi hỏi “đã khớp knowledge_base chưa?”
- Trước khi ship / acceptance §34

## Ba nguồn sự thật

1. `knowledge_base.md` — yêu cầu sản phẩm
2. Plan phases P0–P8 — phạm vi từng đợt
3. Codebase — evidence (route, component, migration, test, docs)

## Mapping phase → mục PRD

| Phase | Mục knowledge_base | Ghi chú |
|-------|--------------------|---------|
| P0 | Stack bắt buộc, theme, env, schema tối thiểu, Cursor scaffolding | Foundation |
| P1 | §1 Phân quyền, §2 Authentication | Login modal, `ADMIN_EMAILS` |
| P2 | §3 Header, §4 Trang chủ, §5/§7 (đọc bài), §27 Sample content | Renderer Tiptap, chưa full editor |
| P3 | §5 Filter URL, §6 Search, §23 SEO | Sitemap, metadata, FTS |
| P4 | §8 Rating, §9 Bookmark, §10 Learning progress, §11 Comment | Guest → login modal |
| P5 | §14 Admin dashboard, §15 Article management, §17 Image | Storage, CRUD bài |
| P6 | §16 Tiptap admin editor, §7 Custom blocks | Autosave, preview, publish |
| P7 | §18 Category, §19 Tag, §12 Feedback (admin), §11 Moderation | Ops phụ |
| P8 | §20 Theme, §21 Responsive, §22 A11y, §24 Perf, §25 Security, §26 States, §28 Testing, §29 Docs, §30 Rules, §31 Skills, §32 README, §33 Deploy, §34 Acceptance | Ship |

## Template báo cáo

```markdown
## Audit: Phase Px | Full MVP

- PRD sections covered: …
- Plan scope: …
- Implemented: … (file paths)
- Missing / partial: … (cite knowledge_base section, e.g. §11)
- Out of scope / deferred: …
- Verdict: PASS | PASS_WITH_GAPS | FAIL
- Next actions: …
```

## Quy tắc verdict

| Verdict | Điều kiện |
|---------|-----------|
| PASS | Đủ evidence cho mọi yêu cầu in-scope; acceptance liên quan phase đạt |
| PASS_WITH_GAPS | Core ổn; còn gap nhỏ, mỗi gap có cite PRD |
| FAIL | Thiếu tính năng cốt lõi hoặc acceptance của phase |

## Acceptance nhanh (§34) theo nhóm

- Auth & roles: tiêu chí 3–7
- Public read / editor render: 8–16
- Engagement: 17–22
- Theme / responsive / SEO / RLS: 23–28
- Docs / Cursor / quality gates: 29–36

Chi tiết đầy đủ: `knowledge_base.md` mục 34.
