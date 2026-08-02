# 16. Bảo mật frontend

> Bài 16/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **XSS là gì?**
- Giải thích và đưa ví dụ cho: **CSRF là gì?**
- Giải thích và đưa ví dụ cho: **CSP là gì?**
- Giải thích và đưa ví dụ cho: **Local storage, session storage và cookie khác nhau như thế nào về bảo mật?**
- Giải thích và đưa ví dụ cho: **Frontend validation có đủ không?**
- Giải thích và đưa ví dụ cho: **Dependency có thể tạo rủi ro gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 16.1 XSS là gì?

XSS xảy ra khi nội dung không tin cậy được đưa vào trang và thực thi như script.

Nguồn có thể đến từ dữ liệu người dùng, API, URL, nội dung HTML hoặc thư viện bên ngoài.

Cách giảm rủi ro:

- Không render HTML không tin cậy.
- Sanitize khi bắt buộc hiển thị HTML.
- Không dùng `eval`.
- Hạn chế script bên ngoài.
- Dùng CSP.
- Mã hóa đầu ra đúng ngữ cảnh.
- Không xem validation frontend là đủ.

## 16.2 CSRF là gì?

CSRF lợi dụng phiên đăng nhập của người dùng để gửi request không mong muốn đến hệ thống.

Rủi ro cao khi xác thực dựa trên cookie tự động gửi theo request.

Biện pháp:

- CSRF token.
- SameSite cookie.
- Kiểm tra origin hoặc referer phù hợp.
- Yêu cầu xác nhận lại cho hành động nhạy cảm.
- Không dùng GET cho hành động thay đổi dữ liệu.

## 16.3 CSP là gì?

Content Security Policy giới hạn nguồn được phép tải hoặc thực thi script, style, image và tài nguyên khác.

CSP giúp giảm tác động của XSS nhưng không thay thế việc xử lý dữ liệu an toàn.

Cấu hình quá rộng làm mất hiệu quả. Cấu hình quá chặt có thể làm hỏng tài nguyên hợp lệ.

## 16.4 Local storage, session storage và cookie khác nhau như thế nào về bảo mật?

Local storage và session storage có thể được JavaScript đọc. Nếu có XSS, dữ liệu có thể bị lấy.

Cookie có thể được đặt `HttpOnly` để JavaScript không đọc được. Cookie cũng hỗ trợ `Secure` và `SameSite`.

Không nên lưu dữ liệu nhạy cảm chỉ vì tiện truy cập.

## 16.5 Frontend validation có đủ không?

Không.

Frontend validation giúp phản hồi nhanh và cải thiện trải nghiệm.

Backend vẫn phải kiểm tra lại vì người dùng có thể bỏ qua frontend, sửa request hoặc gọi API trực tiếp.

## 16.6 Dependency có thể tạo rủi ro gì?

- Package có lỗ hổng.
- Package bị chiếm quyền.
- Script cài đặt nguy hiểm.
- Dependency không còn duy trì.
- Bundle chứa code không cần thiết.
- Thay đổi phiên bản gây lỗi.

Cần giới hạn package, kiểm tra nguồn, khóa phiên bản, review lock file và nâng cấp có kiểm thử.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. XSS là gì?
2. CSRF là gì?
3. CSP là gì?
4. Local storage, session storage và cookie khác nhau như thế nào về bảo mật?
5. Frontend validation có đủ không?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
