# 05. Next.js

> Bài 5/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **CSR là gì?**
- Giải thích và đưa ví dụ cho: **SSR là gì?**
- Giải thích và đưa ví dụ cho: **SSG là gì?**
- Giải thích và đưa ví dụ cho: **Khi nào chọn CSR, SSR hoặc SSG?**
- Giải thích và đưa ví dụ cho: **Hydration là gì?**
- Giải thích và đưa ví dụ cho: **Routing trong Next.js cần hiểu những gì?**
- Giải thích và đưa ví dụ cho: **Server Component và Client Component khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Dữ liệu nên được lấy ở server hay client?**
- Giải thích và đưa ví dụ cho: **SEO trong Next.js được xử lý như thế nào?**
- Giải thích và đưa ví dụ cho: **Route protection nên tổ chức như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 5.1 CSR là gì?

CSR là cách giao diện được tạo chủ yếu trên trình duyệt sau khi JavaScript được tải và thực thi.

Ưu điểm:

- Tương tác sau khi tải ứng dụng thường mượt.
- Phù hợp dashboard và ứng dụng nội bộ.
- Server không cần tạo HTML hoàn chỉnh cho mỗi request.

Hạn chế:

- Nội dung ban đầu có thể xuất hiện chậm.
- Phụ thuộc nhiều vào JavaScript.
- SEO có thể khó hơn nếu nội dung quan trọng chỉ xuất hiện sau khi gọi API phía client.

## 5.2 SSR là gì?

SSR tạo HTML trên server cho mỗi request.

Ưu điểm:

- Có nội dung HTML ngay từ phản hồi đầu.
- Phù hợp với dữ liệu thay đổi theo request.
- Hỗ trợ SEO và chia sẻ nội dung tốt hơn.

Hạn chế:

- Tăng công việc phía server.
- TTFB có thể cao nếu xử lý hoặc API chậm.
- Cần xử lý khác biệt giữa môi trường server và browser.
- Caching phức tạp hơn.

SSR không mặc định nhanh hơn CSR trong mọi trường hợp.

## 5.3 SSG là gì?

SSG tạo HTML trước trong quá trình build.

Ưu điểm:

- Tốc độ tải cao.
- Dễ phân phối qua CDN.
- Giảm tải server.
- Phù hợp nội dung ít thay đổi.

Hạn chế:

- Thời gian build có thể tăng khi có nhiều trang.
- Nội dung không tự cập nhật ngay nếu không build lại hoặc dùng cơ chế tái tạo.

## 5.4 Khi nào chọn CSR, SSR hoặc SSG?

CSR phù hợp với dashboard sau đăng nhập, dữ liệu cá nhân và trang không cần SEO.

SSR phù hợp với nội dung cần SEO nhưng thay đổi theo request hoặc phụ thuộc cookie, quyền truy cập và dữ liệu mới tại thời điểm truy cập.

SSG phù hợp với landing page, tài liệu, blog và nội dung thay đổi không thường xuyên.

Một ứng dụng có thể kết hợp nhiều cách render theo từng trang.

## 5.5 Hydration là gì?

Hydration là quá trình React trên trình duyệt gắn logic tương tác vào HTML đã được tạo từ server hoặc trong quá trình build.

Hydration mismatch xảy ra khi HTML phía server khác kết quả render đầu tiên phía client.

Nguyên nhân thường gặp:

- Dùng thời gian hiện tại trực tiếp trong render.
- Dùng dữ liệu chỉ có trên browser.
- Kiểm tra kích thước màn hình không đồng nhất.
- Dữ liệu server và client khác nhau.
- Cấu trúc HTML không hợp lệ.

## 5.6 Routing trong Next.js cần hiểu những gì?

- Route tĩnh.
- Dynamic route.
- Nested route.
- Layout.
- Route parameters.
- Query string.
- Điều hướng phía client.
- Trang lỗi và trang không tìm thấy.
- Route được bảo vệ.
- Loading state theo route.
- Phân tách bundle theo route.

Cần phân biệt điều hướng phía client với tải lại toàn bộ trang.

## 5.7 Server Component và Client Component khác nhau như thế nào?

Server Component chạy trên server, có thể truy cập nguồn dữ liệu server và không gửi toàn bộ JavaScript component xuống trình duyệt.

Client Component chạy trên trình duyệt và cần cho state, event handler, effect, API chỉ có trên browser và tương tác trực tiếp.

Nên giữ phần không cần tương tác ở server khi phù hợp và chỉ dùng Client Component trong phạm vi cần thiết.

## 5.8 Dữ liệu nên được lấy ở server hay client?

Lấy ở server khi:

- Cần bảo vệ secret.
- Cần SEO.
- Cần giảm request từ browser.
- Dữ liệu dùng để tạo nội dung ban đầu.
- Logic truy cập dữ liệu thuộc server.

Lấy ở client khi:

- Dữ liệu thay đổi theo tương tác.
- Cần polling hoặc refetch.
- Chỉ dùng sau thao tác.
- Dữ liệu phụ thuộc trạng thái browser.

## 5.9 SEO trong Next.js được xử lý như thế nào?

Cần quản lý:

- Title.
- Description.
- Canonical URL.
- Open Graph.
- Robots.
- Sitemap.
- Structured data.
- Nội dung HTML ban đầu.
- Tốc độ tải.
- Cấu trúc heading.

Metadata cần phản ánh đúng nội dung từng trang.

## 5.10 Route protection nên tổ chức như thế nào?

Frontend có thể kiểm tra phiên đăng nhập để điều hướng hoặc ẩn giao diện, nhưng phân quyền thật phải được kiểm tra ở server hoặc API.

Cần xử lý:

- Người dùng đã đăng nhập chưa.
- Có quyền truy cập không.
- Điều hướng đến trang phù hợp.
- Tránh hiển thị tạm nội dung không có quyền.
- Token hết hạn.
- Không tin dữ liệu quyền do client tự tạo.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. CSR là gì?
2. SSR là gì?
3. SSG là gì?
4. Khi nào chọn CSR, SSR hoặc SSG?
5. Hydration là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
