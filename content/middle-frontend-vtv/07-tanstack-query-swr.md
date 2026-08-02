# 07. TanStack Query và SWR

> Bài 7/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Server state khác client state như thế nào?**
- Giải thích và đưa ví dụ cho: **Query key có vai trò gì?**
- Giải thích và đưa ví dụ cho: **Stale data là gì?**
- Giải thích và đưa ví dụ cho: **Query và mutation khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Invalidation là gì?**
- Giải thích và đưa ví dụ cho: **Optimistic update là gì?**
- Giải thích và đưa ví dụ cho: **Khi nào dùng TanStack Query, khi nào dùng Zustand?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 7.1 Server state khác client state như thế nào?

Server state được sở hữu bởi hệ thống bên ngoài frontend. Frontend chỉ giữ một bản sao tạm.

Server state có thể thay đổi bởi người dùng khác, hết hạn, cần tải lại, thất bại và được nhiều component sử dụng.

Client state thường thuộc trực tiếp giao diện như modal, tab hoặc lựa chọn tạm thời.

## 7.2 Query key có vai trò gì?

Query key xác định danh tính của dữ liệu trong cache.

Mọi tham số làm thay đổi kết quả cần nằm trong query key, chẳng hạn ID, page, filter, sort và từ khóa.

Query key không đầy đủ có thể làm hiển thị nhầm dữ liệu.

## 7.3 Stale data là gì?

Stale data là dữ liệu vẫn có thể hiển thị nhưng đã đến thời điểm cần được xem xét tải lại.

Cần phân biệt:

- Đã có cache hay chưa.
- Dữ liệu còn mới hay đã stale.
- Khi nào refetch.
- Khi nào xóa khỏi cache.

Thời gian stale nên dựa trên mức độ thay đổi của từng loại dữ liệu.

## 7.4 Query và mutation khác nhau như thế nào?

Query dùng để lấy dữ liệu.

Mutation dùng cho hành động làm thay đổi dữ liệu trên server như tạo, sửa hoặc xóa.

Sau mutation, cần quyết định cập nhật cache trực tiếp, invalidate query, dùng optimistic update hoặc tải lại.

## 7.5 Invalidation là gì?

Invalidation đánh dấu dữ liệu cache không còn đáng tin cậy và cần được tải lại khi phù hợp.

Không nên invalidate toàn bộ cache sau mọi mutation. Cần chọn đúng query liên quan.

## 7.6 Optimistic update là gì?

Optimistic update cập nhật giao diện trước khi server xác nhận thành công.

Cần:

- Lưu dữ liệu trước thay đổi.
- Cập nhật cache tạm.
- Khôi phục nếu lỗi.
- Đồng bộ lại với server.

Chỉ nên dùng khi có khả năng thành công cao và rollback rõ.

## 7.7 Khi nào dùng TanStack Query, khi nào dùng Zustand?

TanStack Query quản lý dữ liệu từ server.

Zustand quản lý trạng thái phía client.

Có thể dùng đồng thời nhưng không nên sao chép dữ liệu query sang Zustand chỉ để dùng ở nhiều component.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Server state khác client state như thế nào?
2. Query key có vai trò gì?
3. Stale data là gì?
4. Query và mutation khác nhau như thế nào?
5. Invalidation là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
