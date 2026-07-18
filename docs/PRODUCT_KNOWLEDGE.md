# Knowledge FStack — Product Knowledge

## Vision

Knowledge FStack là nền tảng chia sẻ và học kiến thức phỏng vấn Frontend. Nội dung do admin biên soạn; người dùng đọc, học, lưu tiến độ, bình luận và góp ý độ chính xác.

## User roles

| Role | Khả năng |
|------|----------|
| Guest | Đọc toàn bộ nội dung public, search/filter, xem comment/rating |
| User | Comment, rating, bookmark, learning progress, feedback |
| Admin | CMS bài viết, category/tag, moderation, feedback inbox |

Admin xác định bằng `ADMIN_EMAILS` (env), kiểm tra phía server.

## Core features

- Public reading: home, articles, categories, tags, search, TOC, code copy
- Auth: Google + email/password
- Engagement: rating, bookmark, progress, comments (1-level reply)
- Feedback loop cho nội dung
- Admin Tiptap editor + custom interview blocks
- Light default + dark theme, responsive, SEO

## Content categories (default)

JavaScript, TypeScript, HTML, CSS, Browser, Vue, Nuxt, React, Next.js, Web Performance, Accessibility, Testing, Frontend Architecture, Git & Workflow, Behavioral Interview.

## Article structure

Khuyến nghị dùng custom blocks: Interview Question, Short Answer, Detailed Explanation, Note, Common Mistake, Junior/Middle/Senior Answer, Real Experience, Reference.

## MVP scope

- Chỉ admin tạo bài
- Không user publish UGC
- Free tier Supabase + Vercel

## Out of scope (MVP)

- NestJS backend riêng
- Firebase / styled-components
- Nested comment > 1 cấp
- Paid Tiptap extensions
