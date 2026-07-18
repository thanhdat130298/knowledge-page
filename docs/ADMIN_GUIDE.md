# Admin Guide

## Login admin

1. Đăng nhập Google hoặc email trong danh sách `ADMIN_EMAILS`.
2. Menu user → **Admin Dashboard**.

## Tạo bài

1. `/admin/articles/new`
2. Điền title (slug tự tạo, sửa được), excerpt, category, tags, level, SEO.
3. Soạn nội dung bằng Tiptap + custom blocks.
4. Autosave draft ~2s sau khi chỉnh sửa.

## Preview / Publish

- Preview mở trang public theo slug (draft chỉ thấy khi allow).
- Publish / Unpublish / Archive từ thanh actions editor hoặc bảng quản lý.

## Quản lý comment

`/admin/comments`: Ẩn, spam, khôi phục, xóa vĩnh viễn (có confirm).

## Feedback

`/admin/feedback`: Pending → Reviewing → Resolved / Rejected + ghi chú nội bộ.

## Category / Tag

- `/admin/categories`: CRUD, bật/tắt, không xóa khi còn bài.
- `/admin/tags`: search, xóa, merge slug nguồn → đích.
