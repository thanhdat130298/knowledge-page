# 13. Hiệu năng và Core Web Vitals

> Bài 13/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Tối ưu hiệu năng nên bắt đầu từ đâu?**
- Giải thích và đưa ví dụ cho: **LCP là gì?**
- Giải thích và đưa ví dụ cho: **INP là gì?**
- Giải thích và đưa ví dụ cho: **CLS là gì?**
- Giải thích và đưa ví dụ cho: **Lazy loading là gì?**
- Giải thích và đưa ví dụ cho: **Code splitting là gì?**
- Giải thích và đưa ví dụ cho: **Caching có những tầng nào?**
- Giải thích và đưa ví dụ cho: **Bundle optimization gồm những gì?**
- Giải thích và đưa ví dụ cho: **Virtualization dùng khi nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 13.1 Tối ưu hiệu năng nên bắt đầu từ đâu?

Bắt đầu bằng đo đạc.

Quy trình:

1. Xác định biểu hiện chậm.
2. Đo bằng công cụ phù hợp.
3. Xác định nguyên nhân chính.
4. Thay đổi một phần có mục tiêu.
5. Đo lại.
6. Theo dõi sau triển khai.

Không nên thêm memoization, lazy loading hoặc cache chỉ vì đó là kỹ thuật tối ưu.

## 13.2 LCP là gì?

LCP đo thời gian phần nội dung lớn và quan trọng trong vùng nhìn thấy được hiển thị.

Nguyên nhân LCP kém:

- Server phản hồi chậm.
- Ảnh lớn.
- Tài nguyên chặn render.
- JavaScript quá nhiều.
- Font tải chậm.
- Nội dung chính chỉ xuất hiện sau request phía client.

Cách cải thiện:

- Tối ưu server.
- Tối ưu và preload tài nguyên chính.
- Giảm JavaScript ban đầu.
- Tối ưu ảnh.
- Render nội dung quan trọng sớm.

## 13.3 INP là gì?

INP đánh giá độ phản hồi của trang đối với tương tác người dùng trong suốt phiên.

INP kém khi main thread bị bận bởi JavaScript nặng, render lớn, event handler phức tạp hoặc tác vụ đồng bộ dài.

Cách cải thiện:

- Chia nhỏ công việc.
- Giảm xử lý trong event handler.
- Hạn chế render không cần thiết.
- Dùng worker cho tác vụ phù hợp.
- Trì hoãn công việc không quan trọng.

## 13.4 CLS là gì?

CLS đo mức độ giao diện bị dịch chuyển ngoài ý muốn trong lúc tải.

Nguyên nhân:

- Ảnh không có kích thước.
- Nội dung được chèn phía trên.
- Font thay đổi kích thước.
- Quảng cáo hoặc iframe không dành sẵn không gian.
- Animation làm thay đổi layout.

Cách cải thiện là khai báo kích thước, dành sẵn không gian và quản lý font.

## 13.5 Lazy loading là gì?

Lazy loading trì hoãn tải tài nguyên hoặc module cho đến khi thực sự cần.

Có thể áp dụng cho route, component lớn, ảnh ngoài vùng nhìn thấy, trình soạn thảo, biểu đồ hoặc modal ít dùng.

Không nên lazy load mọi component nhỏ.

## 13.6 Code splitting là gì?

Code splitting chia bundle thành nhiều phần để trình duyệt chỉ tải code cần thiết.

Các cách:

- Theo route.
- Dynamic import.
- Tách thư viện lớn.
- Tách khu vực ít dùng.

Cần tránh tạo quá nhiều chunk nhỏ hoặc tải lặp.

## 13.7 Caching có những tầng nào?

- Browser cache.
- CDN cache.
- HTTP cache.
- Service worker cache.
- Cache dữ liệu trong ứng dụng.
- Cache phía server.

Mỗi tầng có thời gian hết hạn và cách làm mới khác nhau.

Cache cần chiến lược invalidation. Cache sai có thể hiển thị dữ liệu cũ hoặc dữ liệu của người dùng khác.

## 13.8 Bundle optimization gồm những gì?

- Kiểm tra kích thước dependency.
- Loại bỏ package không dùng.
- Import đúng phần cần dùng.
- Tree shaking.
- Code splitting.
- Tránh đưa thư viện server vào client.
- Nén tài nguyên.
- Theo dõi thay đổi bundle trong CI.

## 13.9 Virtualization dùng khi nào?

Virtualization chỉ render những phần tử đang ở gần vùng nhìn thấy thay vì toàn bộ danh sách.

Phù hợp với danh sách rất dài hoặc bảng nhiều hàng.

Không cần dùng với danh sách ngắn vì làm logic scroll và accessibility phức tạp hơn.


---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Tối ưu hiệu năng nên bắt đầu từ đâu?
2. LCP là gì?
3. INP là gì?
4. CLS là gì?
5. Lazy loading là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
