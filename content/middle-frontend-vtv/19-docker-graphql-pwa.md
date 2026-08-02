# 19. Docker, GraphQL và PWA

> Bài 19/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Docker là gì?**
- Giải thích và đưa ví dụ cho: **Image và container khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **GraphQL là gì?**
- Giải thích và đưa ví dụ cho: **REST và GraphQL khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **PWA là gì?**
- Giải thích và đưa ví dụ cho: **Service worker có vai trò gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 19.1 Docker là gì?

Docker đóng gói ứng dụng và môi trường chạy thành image.

Container là instance đang chạy của image.

Lợi ích:

- Môi trường nhất quán.
- Dễ cài đặt dependency hệ thống.
- Hỗ trợ CI/CD.
- Giảm khác biệt giữa máy phát triển.

Frontend có thể dùng Docker để chạy dev server, build hoặc phục vụ file tĩnh.

## 19.2 Image và container khác nhau như thế nào?

Image là bản đóng gói chỉ đọc dùng làm mẫu.

Container là tiến trình đang chạy từ image và có lớp dữ liệu riêng.

Có thể tạo nhiều container từ cùng một image.

## 19.3 GraphQL là gì?

GraphQL là cách client yêu cầu đúng trường dữ liệu cần dùng thông qua schema.

Các khái niệm chính:

- Schema.
- Type.
- Query.
- Mutation.
- Resolver.
- Variable.
- Fragment.
- Error.
- Cache.

GraphQL giảm việc nhận thừa dữ liệu nhưng không tự động giải quyết mọi vấn đề hiệu năng.

## 19.4 REST và GraphQL khác nhau như thế nào?

REST thường có nhiều endpoint theo tài nguyên.

GraphQL thường có một endpoint và client mô tả dữ liệu cần lấy.

GraphQL phù hợp khi nhiều client cần cấu trúc dữ liệu khác nhau hoặc dữ liệu có quan hệ phức tạp.

REST đơn giản hơn trong nhiều hệ thống, dễ tận dụng HTTP cache và dễ quan sát theo endpoint.

## 19.5 PWA là gì?

PWA là ứng dụng web có thêm khả năng gần với ứng dụng cài đặt.

Các thành phần thường có:

- Web app manifest.
- Service worker.
- HTTPS.
- Cache.
- Khả năng cài lên thiết bị.
- Hoạt động một phần khi mất mạng.

## 19.6 Service worker có vai trò gì?

Service worker chạy tách khỏi trang và có thể chặn request để phục vụ từ cache.

Có thể dùng cho:

- Offline.
- Cache tài nguyên.
- Background sync.
- Push notification trong môi trường hỗ trợ.

Cần quản lý phiên bản cache và cập nhật service worker để tránh giữ bản cũ quá lâu.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Docker là gì?
2. Image và container khác nhau như thế nào?
3. GraphQL là gì?
4. REST và GraphQL khác nhau như thế nào?
5. PWA là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
