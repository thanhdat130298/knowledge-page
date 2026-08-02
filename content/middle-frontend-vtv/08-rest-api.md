# 08. REST API và dữ liệu bất đồng bộ

> Bài 8/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **REST API là gì?**
- Giải thích và đưa ví dụ cho: **Các nhóm mã trạng thái HTTP cần nhớ**
- Giải thích và đưa ví dụ cho: **Loading, error và empty state cần xử lý như thế nào?**
- Giải thích và đưa ví dụ cho: **Race condition khi gọi API là gì?**
- Giải thích và đưa ví dụ cho: **AbortController dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Retry nên thiết kế như thế nào?**
- Giải thích và đưa ví dụ cho: **Pagination có những cách nào?**
- Giải thích và đưa ví dụ cho: **Authentication và authorization khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Token refresh cần lưu ý gì?**
- Giải thích và đưa ví dụ cho: **Global error handling nên tổ chức như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 8.1 REST API là gì?

REST là cách tổ chức API dựa trên tài nguyên và hành động HTTP.

Các phương thức thường dùng:

- GET: lấy dữ liệu.
- POST: tạo dữ liệu hoặc thực hiện hành động.
- PUT: thay thế toàn bộ tài nguyên.
- PATCH: cập nhật một phần.
- DELETE: xóa tài nguyên.

URL nên đại diện cho tài nguyên. Hành vi được thể hiện qua phương thức HTTP và dữ liệu request.

## 8.2 Các nhóm mã trạng thái HTTP cần nhớ

- 2xx: request thành công.
- 3xx: điều hướng hoặc cache.
- 4xx: lỗi từ phía request hoặc quyền truy cập.
- 5xx: lỗi phía server.

Một số mã thường gặp:

- 200: thành công.
- 201: tạo thành công.
- 204: thành công nhưng không có nội dung.
- 400: request không hợp lệ.
- 401: chưa xác thực hoặc phiên không hợp lệ.
- 403: đã xác thực nhưng không có quyền.
- 404: không tìm thấy.
- 409: xung đột dữ liệu.
- 422: dữ liệu không đạt điều kiện xử lý.
- 429: gửi quá nhiều request.
- 500: lỗi server.

## 8.3 Loading, error và empty state cần xử lý như thế nào?

Loading cho biết dữ liệu đang được tải.

Error cho biết quá trình thất bại.

Empty state cho biết request thành công nhưng không có dữ liệu.

Cũng cần phân biệt lần tải đầu, tải lại, tải thêm trang và mutation đang chạy.

## 8.4 Race condition khi gọi API là gì?

Race condition xảy ra khi nhiều request chạy đồng thời và kết quả trả về không theo thứ tự gửi.

Cách xử lý:

- Hủy request cũ.
- Gắn ID hoặc phiên bản cho request.
- Chỉ chấp nhận kết quả mới nhất.
- Dùng thư viện quản lý server state.
- Thiết kế query key đúng.

## 8.5 AbortController dùng để làm gì?

AbortController cho phép gửi tín hiệu hủy đến request hoặc tác vụ hỗ trợ cơ chế này.

Nên hủy khi:

- Component unmount.
- Tham số request thay đổi.
- Người dùng chuyển trang.
- Request cũ không còn giá trị.
- Cần ngăn race condition.

## 8.6 Retry nên thiết kế như thế nào?

Có thể retry với lỗi mạng tạm thời, timeout hoặc một số lỗi server.

Không nên tự động retry với dữ liệu sai, không có quyền hoặc xung đột cần người dùng xử lý.

Nên giới hạn số lần và tăng khoảng chờ giữa các lần.

## 8.7 Pagination có những cách nào?

Offset pagination dùng page và limit hoặc offset và limit.

Cursor pagination dùng một mốc từ bản ghi cuối để lấy phần tiếp theo.

Offset pagination dễ triển khai nhưng có thể chậm hoặc lệch dữ liệu khi tập dữ liệu lớn và thay đổi liên tục.

Cursor pagination ổn định hơn với dữ liệu lớn nhưng khó nhảy trực tiếp đến một trang cụ thể.

## 8.8 Authentication và authorization khác nhau như thế nào?

Authentication xác định người dùng là ai.

Authorization xác định người dùng được phép làm gì.

Frontend có thể ẩn giao diện theo quyền, nhưng API vẫn phải kiểm tra quyền.

## 8.9 Token refresh cần lưu ý gì?

Cần tránh:

- Nhiều request cùng tự refresh.
- Vòng lặp refresh không kết thúc.
- Gửi lại request không giới hạn.
- Lưu token ở vị trí dễ bị script độc hại đọc.
- Không xóa phiên khi refresh thất bại.

Nên có một luồng refresh dùng chung và cho các request khác chờ kết quả.

## 8.10 Global error handling nên tổ chức như thế nào?

Global error handling xử lý các trường hợp chung như mất phiên, mất kết nối, timeout hoặc lỗi server không xác định.

Lỗi nghiệp vụ cụ thể vẫn nên được xử lý tại màn hình tương ứng.


---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. REST API là gì?
2. Các nhóm mã trạng thái HTTP cần nhớ
3. Loading, error và empty state cần xử lý như thế nào?
4. Race condition khi gọi API là gì?
5. AbortController dùng để làm gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
