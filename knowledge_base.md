# KNOWLEDGE FSTACK — FULL PRODUCT REQUIREMENTS

Hãy xây dựng hoàn chỉnh một website knowledge base tên **Knowledge FStack**.

Đây là nền tảng chia sẻ và học kiến thức phỏng vấn Frontend. Nội dung chính do admin tự biên soạn. Người dùng vào website chủ yếu để đọc, học, lưu tiến độ, bình luận và góp ý về độ chính xác của nội dung.

Hãy tự phân tích, thiết kế kiến trúc, database, component, route, validation và cách triển khai phù hợp. Không cần hỏi lại về implementation nếu yêu cầu sản phẩm đã rõ.

## Công nghệ bắt buộc

* Next.js App Router.
* TypeScript.
* Tailwind CSS.
* Supabase.
* Tiptap Editor.
* npm trên Windows.
* Deploy lên Vercel.
* Responsive desktop, tablet và mobile.
* Light theme mặc định.
* Có Dark theme.
* Không dùng styled-components.
* Không dùng Firebase.
* Không cần backend NestJS riêng.
* Ưu tiên sử dụng free tier.

## Phong cách giao diện

Tên website:

```text
Knowledge FStack
```

Visual style tham khảo:

```text
https://dat-profile-ga-ga.vercel.app/
```

Chỉ tham khảo:

* Màu sắc.
* Không gian layout.
* Card style.
* Border.
* Border radius.
* Typography.
* Cách chia section.
* Light/Dark theme.
* Responsive behavior.

Không sao chép source code, logo hoặc giao diện pixel-perfect.

Cấu trúc nội dung tham khảo dạng Viblo:

* Header.
* Search.
* Category.
* Tag.
* Danh sách bài viết.
* Trang chi tiết bài.
* Sidebar.
* Table of contents.
* Comment.
* Bài viết liên quan.

Website phải có phong cách riêng của Knowledge FStack và tập trung vào trải nghiệm học.

---

# 1. PHÂN QUYỀN

## Guest

Người chưa đăng nhập có thể:

* Truy cập trang chủ.
* Xem danh sách bài viết.
* Xem danh mục.
* Xem tag.
* Tìm kiếm bài.
* Lọc bài.
* Đọc toàn bộ nội dung.
* Xem comment.
* Xem rating.
* Xem số lượt bookmark.
* Xem bài viết liên quan.
* Copy code.
* Copy link bài.
* Chia sẻ bài viết.

Guest không được:

* Comment.
* Reply.
* Vote comment.
* Rating bài viết.
* Bookmark.
* Lưu tiến độ học.
* Gửi góp ý.

Khi guest thực hiện một hành động cần tài khoản, mở modal đăng nhập thay vì chuyển khỏi bài đang đọc.

## Người dùng đã đăng nhập

Người dùng có thể:

* Sử dụng toàn bộ chức năng guest.
* Comment.
* Reply comment.
* Vote comment hữu ích.
* Rating bài viết.
* Bookmark bài viết.
* Lưu tiến độ học.
* Gửi góp ý về nội dung.
* Xem danh sách bookmark.
* Xem tiến độ học.
* Sửa thông tin cá nhân.
* Đăng xuất.

## Admin

Trong giai đoạn đầu chỉ admin được tạo bài.

Admin được xác định bằng danh sách email trong environment variable:

```env
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,admin3@gmail.com
```

Danh sách có nhiều email để làm tài khoản backup.

Admin có thể:

* Truy cập dashboard.
* Tạo bài.
* Sửa bài.
* Xóa bài.
* Preview bài.
* Lưu draft.
* Publish.
* Unpublish.
* Archive.
* Quản lý category.
* Quản lý tag.
* Upload ảnh.
* Quản lý comment.
* Ẩn comment.
* Đánh dấu spam.
* Khôi phục comment.
* Quản lý feedback.
* Ghi chú xử lý feedback.

Không làm chức năng người dùng tự đăng bài trong MVP.

---

# 2. AUTHENTICATION

Hỗ trợ hai cách đăng nhập:

## Google Login

* Nút đăng nhập Google.
* Đăng ký tự động khi lần đầu login Google.
* Lấy avatar và display name từ Google khi có.
* Sau login quay lại đúng trang trước đó.
* Không làm mất nội dung comment người dùng đang nhập.

## Email và password

Đăng ký gồm:

* Username.
* Email.
* Password.
* Xác nhận password.

Đăng nhập gồm:

* Email.
* Password.

Bổ sung:

* Email confirmation.
* Quên mật khẩu.
* Reset mật khẩu.
* Đăng xuất.
* Thông báo lỗi rõ ràng.
* Loading state.
* Success state.

Username:

* Là tên hiển thị công khai.
* Phải unique.
* Có thể sửa trong trang cá nhân.
* Email không hiển thị công khai.

---

# 3. HEADER

Header desktop gồm:

* Logo Knowledge FStack.
* Navigation.
* Danh mục nổi bật.
* Search.
* Light/Dark theme switch.
* Nút đăng nhập khi chưa login.
* Avatar và menu khi đã login.

Menu user gồm:

* Trang cá nhân.
* Bookmark.
* Tiến độ học.
* Admin Dashboard nếu là admin.
* Đăng xuất.

Mobile:

* Header gọn.
* Có menu mobile.
* Search dễ truy cập.
* Theme switch.
* User menu.

Header có thể sticky nhưng không được chiếm quá nhiều chiều cao.

---

# 4. TRANG CHỦ

Trang chủ gồm:

## Hero

* Tên Knowledge FStack.
* Mô tả ngắn về website.
* Search bar lớn.
* CTA bắt đầu học.
* Không làm hero full-screen quá lớn.

## Danh mục kiến thức

Các category mặc định:

* JavaScript.
* TypeScript.
* HTML.
* CSS.
* Browser.
* Vue.
* Nuxt.
* React.
* Next.js.
* Web Performance.
* Accessibility.
* Testing.
* Frontend Architecture.
* Git & Workflow.
* Behavioral Interview.

Mỗi category hiển thị:

* Icon.
* Tên.
* Mô tả.
* Số bài viết.

## Nội dung trang chủ

* Bài viết mới cập nhật.
* Bài nổi bật.
* Bài được đánh giá cao.
* Bài có nhiều thảo luận.
* Bài theo level.
* Chủ đề phổ biến.
* CTA khám phá toàn bộ bài viết.

---

# 5. DANH SÁCH BÀI VIẾT

Trang danh sách có:

* Search.
* Category filter.
* Tag filter.
* Level filter.
* Sort.
* Pagination.
* Empty state.
* Loading state.
* Error state.

Level:

* Junior.
* Middle.
* Senior.
* All Levels.

Sort:

* Mới cập nhật.
* Mới xuất bản.
* Đánh giá cao.
* Nhiều comment.
* Nhiều bookmark.

Mỗi article card hiển thị:

* Cover image nếu có.
* Tiêu đề.
* Excerpt.
* Category.
* Tags.
* Level.
* Thời gian đọc.
* Ngày cập nhật.
* Điểm rating.
* Số comment.
* Số bookmark.
* Badge nổi bật nếu applicable.

Filter và sort phải thể hiện trên URL để có thể copy link.

---

# 6. SEARCH

Search toàn bộ nội dung dựa trên:

* Tiêu đề.
* Excerpt.
* Nội dung bài.
* Category.
* Tag.

Yêu cầu:

* Search bar trong header.
* Trang kết quả search riêng.
* Search suggestion.
* Có lịch sử search local nếu phù hợp.
* Có empty state.
* Có pagination.
* Search tiếng Việt tốt.
* Không phân biệt chữ hoa/chữ thường.
* Ưu tiên kết quả khớp tiêu đề.

---

# 7. TRANG CHI TIẾT BÀI

Trang chi tiết phải tập trung vào trải nghiệm đọc.

Hiển thị:

* Breadcrumb.
* Tiêu đề.
* Excerpt.
* Category.
* Tags.
* Level.
* Tác giả.
* Ngày publish.
* Ngày cập nhật.
* Thời gian đọc.
* Cover image nếu có.
* Nội dung bài.
* Table of contents.
* Reading progress.
* Share button.
* Bookmark.
* Rating.
* Learning status.
* Feedback button.
* Bài liên quan.
* Comment.

Desktop có thể sử dụng cấu trúc:

* Main article.
* Sidebar table of contents.
* Action bar.

Mobile:

* Table of contents dạng thu gọn.
* Action button dễ bấm.
* Không overflow ngang.
* Code block scroll ngang khi cần.

## Nội dung bài

Nội dung được tạo từ Tiptap và hỗ trợ:

* Paragraph.
* Heading H2/H3.
* Bold.
* Italic.
* Underline.
* Strike.
* Bullet list.
* Numbered list.
* Quote.
* Link.
* Image.
* Inline code.
* Code block.
* Syntax highlighting.
* Chọn ngôn ngữ code.
* Table.
* Divider.
* YouTube embed.
* Custom content blocks.

## Custom content blocks

Tạo các block trình bày riêng:

* Câu hỏi phỏng vấn.
* Câu trả lời ngắn.
* Giải thích chi tiết.
* Lưu ý.
* Sai lầm thường gặp.
* Câu hỏi mở rộng.
* Junior Answer.
* Middle Answer.
* Senior Answer.
* Kinh nghiệm thực tế.
* Nguồn tham khảo.

Các block phải có style riêng nhưng đồng nhất với design system.

## Code block

* Syntax highlighting.
* Hiển thị tên ngôn ngữ.
* Copy code.
* Thông báo đã copy.
* Scroll ngang trên mobile.
* Dark/light theme phù hợp.

## Table of contents

* Sinh tự động từ heading.
* Highlight heading đang đọc.
* Click để scroll.
* Copy link từng heading.
* Sticky trên desktop.
* Collapsible trên mobile.

---

# 8. ARTICLE RATING

Người dùng đã login có thể đánh giá bài từ 1 đến 5 sao.

Yêu cầu:

* Mỗi user chỉ có một rating trên mỗi bài.
* Có thể cập nhật rating.
* Hiển thị rating trung bình.
* Hiển thị tổng số lượt rating.
* Guest xem được kết quả nhưng phải login để rating.
* Rating có loading và success feedback.

Ngoài rating sao, hiển thị quick feedback:

* Hữu ích.
* Khó hiểu.
* Có điểm chưa chính xác.

Quick feedback có thể mở form feedback chi tiết.

---

# 9. BOOKMARK

Người dùng có thể:

* Bookmark bài.
* Bỏ bookmark.
* Xem trạng thái ngay trên bài.
* Xem danh sách bookmark trong trang cá nhân.
* Sort bookmark theo ngày lưu hoặc ngày cập nhật bài.

Guest bấm bookmark thì mở login modal.

---

# 10. LEARNING PROGRESS

Mỗi bài có trạng thái học:

* Chưa học.
* Đang học.
* Đã hiểu.
* Cần ôn lại.

Yêu cầu:

* Guest không lưu progress.
* User cập nhật progress trực tiếp trên bài.
* Có trang tổng hợp progress.
* Có filter theo status.
* Có số liệu:

  * Tổng bài đã lưu progress.
  * Đang học.
  * Đã hiểu.
  * Cần ôn lại.
* Có progress bar tổng quan.
* Có thể xóa trạng thái để trở về chưa học.

---

# 11. COMMENT

Trang bài có comment section.

## Comment chính

Người dùng có thể:

* Viết comment.
* Sửa comment của mình.
* Xóa mềm comment của mình.
* Vote hữu ích.
* Report comment.
* Reply.

## Reply

* Chỉ hỗ trợ một cấp reply trong MVP.
* Reply không tiếp tục lồng nhiều tầng.
* Hiển thị rõ người đang được trả lời.

## Hiển thị comment

Mỗi comment có:

* Avatar.
* Username.
* Thời gian.
* Nội dung.
* Số vote.
* Reply button.
* Edit/delete nếu là chủ comment.
* Admin moderation controls nếu là admin.

Sort comment:

* Mới nhất.
* Cũ nhất.
* Hữu ích nhất.

## Comment editor

Không cần full Tiptap.

Hỗ trợ:

* Plain text.
* Line break.
* Inline code.
* Code block đơn giản.
* Giới hạn ký tự.
* Character counter.
* Loading state.
* Error state.

## Moderation

Admin có thể:

* Ẩn comment.
* Đánh dấu spam.
* Khôi phục.
* Xóa vĩnh viễn khi cần.

Comment bị user xóa hiển thị placeholder:

```text
Bình luận này đã bị xóa.
```

---

# 12. ARTICLE FEEDBACK

Người dùng đã login có thể gửi góp ý.

Loại feedback:

* Nội dung sai.
* Nội dung đã cũ.
* Giải thích khó hiểu.
* Thiếu nội dung.
* Thiếu ví dụ.
* Đề xuất bổ sung.
* Lỗi chính tả.
* Vấn đề khác.

Form feedback gồm:

* Loại.
* Nội dung góp ý.
* Đoạn văn được chọn nếu người dùng bôi đen text.
* Link bài hiện tại tự động.
* Submit.

Admin quản lý feedback với trạng thái:

* Pending.
* Reviewing.
* Resolved.
* Rejected.

Admin có thể:

* Xem bài liên quan.
* Xem người gửi.
* Ghi chú nội bộ.
* Đổi trạng thái.
* Filter.
* Search.

---

# 13. USER PROFILE

Trang cá nhân gồm:

* Avatar.
* Username.
* Display name.
* Bio.
* Ngày tham gia.
* Tổng comment.
* Tổng bookmark.
* Tổng bài đã hiểu.

User settings:

* Sửa username.
* Sửa display name.
* Sửa bio.
* Upload avatar hoặc dùng avatar Google.
* Đổi password nếu đăng ký email.
* Đăng xuất.

Email không hiển thị công khai.

---

# 14. ADMIN DASHBOARD

Dashboard gồm:

* Tổng số bài.
* Published.
* Draft.
* Archived.
* Tổng user.
* Tổng comment.
* Pending feedback.
* Average rating.
* Bài được xem nhiều hoặc tương tác nhiều.
* Comment mới.
* Feedback mới.

Có quick actions:

* Tạo bài mới.
* Xem draft.
* Quản lý feedback.
* Quản lý comment.

---

# 15. ADMIN ARTICLE MANAGEMENT

Trang quản lý bài gồm:

* Table hoặc card list responsive.
* Search.
* Filter status.
* Filter category.
* Filter level.
* Sort.
* Pagination.

Mỗi bài hiển thị:

* Title.
* Slug.
* Status.
* Category.
* Level.
* Updated date.
* Published date.
* Comment count.
* Rating.
* Actions.

Actions:

* Edit.
* Preview.
* Publish.
* Unpublish.
* Archive.
* Delete.

Delete cần confirmation.

---

# 16. TIPTAP ADMIN EDITOR

Admin editor gồm:

## Article information

* Title.
* Slug.
* Excerpt.
* Category.
* Tags.
* Level.
* Cover image.
* Featured status.
* SEO title.
* SEO description.
* Canonical URL.
* Status.
* Published date.

## Toolbar

* Paragraph.
* H2.
* H3.
* Bold.
* Italic.
* Underline.
* Strike.
* Bullet list.
* Numbered list.
* Quote.
* Link.
* Image.
* Inline code.
* Code block.
* Chọn ngôn ngữ code.
* Table.
* Thêm/xóa row.
* Thêm/xóa column.
* Divider.
* YouTube embed.
* Undo.
* Redo.
* Clear formatting.

## Custom blocks

* Interview Question.
* Short Answer.
* Detailed Explanation.
* Note.
* Warning.
* Common Mistake.
* Follow-up Question.
* Junior Answer.
* Middle Answer.
* Senior Answer.
* Real Experience.
* Reference.

## Editor features

* Autosave draft.
* Hiển thị trạng thái đang lưu.
* Preview bài.
* Publish.
* Unpublish.
* Word count.
* Reading time tự động.
* Character count cho title/excerpt/SEO.
* Validate slug.
* Tự tạo slug từ title nhưng admin sửa được.
* Duplicate slug error.
* Unsaved changes warning.
* Keyboard shortcuts.
* Paste text sạch.
* Paste code.
* Upload image.
* Alt text cho ảnh.
* Image caption.
* Image alignment.
* YouTube URL validation.
* Table responsive trong bài public.

Nội dung phải giữ format sau khi save và load lại.

---

# 17. IMAGE MANAGEMENT

Ảnh lưu trong Supabase Storage.

Yêu cầu:

* Upload cover image.
* Upload image trong editor.
* Preview ảnh.
* Remove ảnh.
* Validate file type.
* Validate dung lượng.
* Hỗ trợ JPG, PNG, WebP, GIF.
* Ưu tiên WebP.
* Có alt text.
* Có caption.
* Không cho upload file nguy hiểm.
* Hiển thị upload progress.
* Error state rõ ràng.
* Xóa ảnh không còn sử dụng nếu an toàn.

---

# 18. CATEGORY MANAGEMENT

Admin có thể:

* Tạo category.
* Sửa category.
* Xóa category.
* Bật/tắt category.
* Chỉnh thứ tự.
* Chọn icon.
* Nhập mô tả.
* Xem số bài thuộc category.

Category fields:

* Name.
* Slug.
* Description.
* Icon.
* Sort order.
* Active status.

Không cho xóa category đang có bài nếu chưa chuyển bài sang category khác hoặc xác nhận hành vi phù hợp.

---

# 19. TAG MANAGEMENT

Admin có thể:

* Tạo tag.
* Sửa tag.
* Xóa tag.
* Search tag.
* Xem số bài dùng tag.
* Merge tag nếu phù hợp.

Article editor có tag autocomplete.

---

# 20. THEME

* Light theme mặc định.
* Dark theme tùy chọn.
* Không mặc định theo hệ điều hành.
* Lưu lựa chọn.
* Không bị flash theme sai.
* Code block đổi theme phù hợp.
* Tất cả component phải hỗ trợ cả hai theme.
* Form, modal, table, comment và editor đều phải hỗ trợ dark mode.

---

# 21. RESPONSIVE

Website phải hoạt động tốt trên:

* Mobile nhỏ.
* Mobile lớn.
* Tablet.
* Laptop.
* Desktop lớn.

Yêu cầu:

* Không overflow ngang toàn trang.
* Navigation mobile dễ dùng.
* Filter có mobile drawer hoặc collapsible panel.
* Admin table có responsive behavior.
* Editor dùng được trên tablet.
* Article typography đọc tốt.
* Sidebar tự chuyển vị trí.
* Button đủ lớn để thao tác cảm ứng.

---

# 22. ACCESSIBILITY

* Semantic HTML.
* Keyboard navigation.
* Focus visible.
* Modal có focus trap.
* Form có label.
* Error gắn với field.
* Button icon có accessible label.
* Contrast tốt.
* Heading hierarchy đúng.
* Alt text ảnh.
* Theme switch có label.
* Respect reduced motion.
* Không phụ thuộc duy nhất vào màu để truyền đạt trạng thái.

---

# 23. SEO

Mỗi trang bài có:

* Dynamic title.
* Meta description.
* Canonical URL.
* Open Graph.
* Twitter card.
* Cover image.
* Article published time.
* Article modified time.
* Author.
* Category.
* Tags.

Bổ sung:

* Sitemap.
* Robots.
* Manifest.
* Favicon placeholder.
* Structured data:

  * WebSite.
  * SearchAction.
  * Article.
  * BreadcrumbList.
* Slug thân thiện.
* Public article phải index được.
* Draft/admin/user-private page không index.

---

# 24. PERFORMANCE

* Public page ưu tiên Server Component.
* Không biến toàn bộ website thành client-side app.
* Lazy load editor.
* Lazy load YouTube embed.
* Optimize image.
* Không fetch dữ liệu trùng lặp.
* Có skeleton loading.
* Giảm bundle client.
* Pagination cho danh sách lớn.
* Không load toàn bộ comment cùng lúc nếu số lượng lớn.
* Tránh layout shift.
* Có cache/revalidation phù hợp.
* Sau mutation phải cập nhật dữ liệu chính xác.

---

# 25. SECURITY

* Supabase Row Level Security.
* User chỉ sửa/xóa dữ liệu của mình.
* Guest chỉ đọc dữ liệu public.
* Draft không public.
* Admin action phải kiểm tra email allowlist phía server.
* Không dựa chỉ vào việc ẩn button trên UI.
* Không expose service role key.
* Validate toàn bộ form phía server.
* Chống open redirect trong auth.
* Sanitize hoặc render nội dung editor an toàn.
* Không cho raw script.
* Không tin user ID từ client.
* Rate-limit logic hợp lý cho:

  * Comment.
  * Feedback.
  * Rating.
  * Login attempts nếu có thể trong free scope.
* Không log password, token hoặc secret.

---

# 26. ERROR, LOADING VÀ EMPTY STATES

Mọi chức năng phải có:

* Loading.
* Success.
* Error.
* Disabled state.
* Empty state.

Bao gồm:

* Login.
* Register.
* Search.
* Article list.
* Article detail.
* Comment.
* Rating.
* Bookmark.
* Progress.
* Feedback.
* Admin tables.
* Editor save.
* Image upload.

Có:

* Global not-found page.
* Global error page.
* Route loading states.
* Toast system.
* Confirmation dialogs.

---

# 27. SAMPLE CONTENT

Tạo seed/sample content đủ để kiểm tra giao diện.

Ít nhất:

* 10 category.
* 15 tag.
* 8 bài mẫu.
* Có bài Junior, Middle, Senior.
* Có bài featured.
* Có bài draft.
* Có bài có code block.
* Có bài có table.
* Có bài có custom blocks.
* Có bài dài để test table of contents.

Các bài mẫu có thể dùng placeholder nhưng phải giống nội dung frontend interview thực tế, không dùng Lorem Ipsum trong toàn bộ UI chính.

Ví dụ chủ đề:

* Event Loop hoạt động như thế nào?
* Promise và async/await.
* Closure là gì?
* `var`, `let`, `const`.
* Vue computed và method.
* React reconciliation.
* SSR, SSG và CSR.
* Web performance Core Web Vitals.

---

# 28. TESTING

Tạo test cho các phần quan trọng:

* Slug generation.
* Auth redirect validation.
* Admin email allowlist.
* Form validation.
* Article filters.
* Rating logic.
* Comment permission.
* Bookmark toggle.
* Learning progress.
* Tiptap content render.
* Theme switch.
* Một số component chính.

Sau cùng phải chạy thành công:

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

---

# 29. KNOWLEDGE BASE FILES

Tạo thư mục `docs` và viết các tài liệu:

## `docs/PRODUCT_KNOWLEDGE.md`

* Product vision.
* User roles.
* Core features.
* Content categories.
* Article structure.
* MVP scope.
* Out-of-scope.

## `docs/ARTICLE_AUTHORING_GUIDE.md`

* Cách viết bài frontend interview.
* Cấu trúc bài khuyến nghị.
* Cách viết short answer.
* Cách viết code example.
* Cách dùng custom blocks.
* Cách dẫn nguồn.
* Cách cập nhật nội dung cũ.

## `docs/DESIGN_SYSTEM.md`

* Màu sắc.
* Typography.
* Spacing.
* Radius.
* Buttons.
* Cards.
* Forms.
* Theme.
* Responsive.
* Accessibility.

## `docs/ADMIN_GUIDE.md`

* Login admin.
* Tạo bài.
* Save draft.
* Preview.
* Publish.
* Quản lý comment.
* Xử lý feedback.
* Quản lý category/tag.

## `docs/DEPLOYMENT.md`

* Supabase setup.
* Google OAuth setup.
* Environment variables.
* Vercel deployment.
* Production callback URL.
* Admin emails.
* Troubleshooting.

---

# 30. CURSOR RULES

Tạo Cursor Project Rules để các lần phát triển sau giữ đúng convention.

Rules phải bao gồm:

* Next.js App Router.
* TypeScript strict.
* Server Component mặc định.
* Client Component chỉ khi cần.
* Tailwind CSS.
* Không styled-components.
* Không expose secrets.
* Validate Server Actions.
* Supabase access conventions.
* Admin authorization conventions.
* Tiptap conventions.
* Accessibility.
* Responsive.
* Testing.
* Windows npm commands.
* Không tự mở rộng ngoài product scope.
* Không duplicate component hoặc utility.
* Luôn chạy lint, typecheck, test, build sau thay đổi lớn.

Tạo rules trong:

```text
.cursor/rules/
```

Sử dụng format Cursor hiện tại hỗ trợ.

---

# 31. CURSOR SKILLS

Tạo các skill riêng trong:

```text
.cursor/skills/
```

Các skill cần có:

## `create-feature`

Dùng khi thêm feature mới:

* Đọc product knowledge.
* Kiểm tra feature đã tồn tại chưa.
* Xác định server/client boundary.
* Thêm validation.
* Thêm loading/error/empty state.
* Thêm permission.
* Thêm test.
* Chạy quality checks.

## `create-admin-feature`

* Luôn xác thực admin phía server.
* Không dùng email hard-code.
* Không expose service role.
* Có confirmation cho destructive action.
* Có audit-friendly behavior.

## `create-supabase-feature`

* Kiểm tra RLS.
* Không tin user ID từ client.
* Dùng generated types.
* Handle error.
* Không leak secret.
* Thêm migration khi schema thay đổi.

## `create-tiptap-extension`

* Editor và renderer phải đồng bộ.
* Content phải reload được.
* Hỗ trợ light/dark.
* Không cho raw script.
* Có test render.
* Không dùng paid extension.

## `create-public-page`

* Server Component mặc định.
* Metadata.
* Loading.
* Error.
* Empty state.
* Responsive.
* Accessibility.
* SEO.

## `fix-bug`

* Reproduce.
* Xác định root cause.
* Không workaround mù.
* Thêm regression test.
* Chạy lint/typecheck/test/build.

## `review-code`

* Check security.
* Check permission.
* Check server/client boundary.
* Check duplicate logic.
* Check loading/error.
* Check accessibility.
* Check responsive.
* Check test coverage.

---

# 32. README

README phải có:

* Giới thiệu Knowledge FStack.
* Feature list.
* Tech stack.
* Requirements.
* Windows npm setup.
* Cài dependencies.
* `.env.local`.
* Supabase setup.
* Migration.
* Google OAuth.
* Email/password auth.
* Admin email allowlist.
* Run development.
* Run tests.
* Build.
* Deploy Vercel.
* Troubleshooting.
* Cấu trúc project.
* Các tài liệu trong `docs`.

---

# 33. VERCEL DEPLOYMENT

Project phải deploy được trên Vercel.

Yêu cầu:

* Không hard-code localhost.
* Đọc production site URL từ env.
* Auth callback hoạt động production.
* Google callback được ghi rõ trong docs.
* Environment variables được liệt kê.
* Build không phụ thuộc file local không commit.
* Không cần custom server.
* Không cần Docker.
* Không cần paid Vercel feature.

---

# 34. ACCEPTANCE CRITERIA

Công việc chỉ được xem là hoàn thành khi:

1. Website chạy bằng `npm run dev`.
2. Build thành công.
3. Guest đọc bài không cần login.
4. Email/password register và login có UI hoàn chỉnh.
5. Google login có flow hoàn chỉnh.
6. Login quay lại đúng trang trước đó.
7. Admin allowlist bằng nhiều email hoạt động.
8. Admin tạo được bài bằng Tiptap.
9. Editor có đầy đủ toolbar đã yêu cầu.
10. Autosave draft hoạt động.
11. Preview hoạt động.
12. Publish/unpublish hoạt động.
13. Public article render đúng.
14. Code syntax highlight và copy hoạt động.
15. Table of contents hoạt động.
16. Search/filter/sort/pagination hoạt động.
17. Comment và reply một cấp hoạt động.
18. Vote comment hoạt động.
19. Rating hoạt động.
20. Bookmark hoạt động.
21. Learning progress hoạt động.
22. Feedback hoạt động.
23. Admin moderation hoạt động.
24. Light theme mặc định.
25. Dark theme hoạt động.
26. Responsive.
27. SEO metadata và sitemap tồn tại.
28. RLS và server authorization được cấu hình.
29. Cursor rules và skills được tạo.
30. Knowledge base docs được tạo.
31. `.env.example` tồn tại.
32. README đầy đủ.
33. Lint thành công.
34. Typecheck thành công.
35. Tests thành công.
36. Build thành công.

Không kết thúc sau khi chỉ tạo UI mock. Hãy triển khai MVP end-to-end và chỉ báo hoàn thành sau khi đã kiểm tra toàn bộ repository.
