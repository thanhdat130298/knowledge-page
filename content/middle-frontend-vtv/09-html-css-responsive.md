# 09. HTML, CSS và giao diện đáp ứng

> Bài 9/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Semantic HTML là gì?**
- Giải thích và đưa ví dụ cho: **Responsive design nên được xây như thế nào?**
- Giải thích và đưa ví dụ cho: **Flexbox và Grid khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Cross-browser compatibility là gì?**
- Giải thích và đưa ví dụ cho: **SASS, SCSS, LESS và PostCSS có vai trò gì?**
- Giải thích và đưa ví dụ cho: **Material UI và Ant Design nên được sử dụng như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 9.1 Semantic HTML là gì?

Semantic HTML dùng đúng thẻ theo ý nghĩa nội dung.

Lợi ích:

- Dễ đọc code.
- Hỗ trợ công cụ đọc màn hình.
- Hỗ trợ SEO.
- Có hành vi trình duyệt đúng mặc định.

Không nên dùng `div` cho mọi thứ nếu đã có thẻ phù hợp như nút, biểu mẫu, điều hướng, nội dung chính, tiêu đề hoặc bảng.

## 9.2 Responsive design nên được xây như thế nào?

Responsive design làm giao diện phù hợp nhiều kích thước màn hình.

Các yếu tố chính:

- Layout linh hoạt.
- Đơn vị tương đối.
- Media query.
- Ảnh đáp ứng.
- Nội dung ưu tiên.
- Kích thước vùng tương tác.
- Cách hiển thị bảng trên màn hình nhỏ.
- Kiểm tra trên thiết bị thật.

Mobile-first bắt đầu từ màn hình nhỏ rồi mở rộng cho màn hình lớn.

## 9.3 Flexbox và Grid khác nhau như thế nào?

Flexbox phù hợp bố cục một chiều theo hàng hoặc cột.

Grid phù hợp bố cục hai chiều, quản lý cả hàng và cột.

Có thể dùng Grid cho bố cục tổng thể và Flexbox cho thành phần bên trong.

## 9.4 Cross-browser compatibility là gì?

Cross-browser compatibility là bảo đảm chức năng và giao diện hoạt động chấp nhận được trên các trình duyệt được hỗ trợ.

Cần chú ý:

- Mức hỗ trợ CSS và JavaScript.
- Polyfill khi cần.
- Khác biệt form control.
- Safari trên iOS.
- Font rendering.
- Date và timezone.
- Viewport trên mobile.
- Hành vi scroll.
- Kiểm tra trên môi trường thật.

Cần thống nhất danh sách trình duyệt được hỗ trợ thay vì cố hỗ trợ mọi phiên bản.

## 9.5 SASS, SCSS, LESS và PostCSS có vai trò gì?

SASS, SCSS và LESS là CSS preprocessor, cung cấp biến, nesting, mixin và chia module.

PostCSS xử lý CSS qua plugin, thường dùng để:

- Thêm prefix.
- Chuyển cú pháp mới.
- Tối ưu CSS.
- Kiểm tra quy tắc.

Cần tránh nesting quá sâu vì selector khó kiểm soát và tăng độ ưu tiên không cần thiết.

## 9.6 Material UI và Ant Design nên được sử dụng như thế nào?

UI library cung cấp component đã có hành vi, style và khả năng tiếp cận cơ bản.

Cần quản lý:

- Theme.
- Token thiết kế.
- Cách tùy chỉnh.
- Kích thước bundle.
- Tính nhất quán.
- Khả năng nâng phiên bản.
- Mức phụ thuộc vào cấu trúc nội bộ.

Có thể xây lớp component chung của dự án để thống nhất API và style.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Semantic HTML là gì?
2. Responsive design nên được xây như thế nào?
3. Flexbox và Grid khác nhau như thế nào?
4. Cross-browser compatibility là gì?
5. SASS, SCSS, LESS và PostCSS có vai trò gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
