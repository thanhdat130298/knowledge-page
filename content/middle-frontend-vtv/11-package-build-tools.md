# 11. Quản lý gói và công cụ build

> Bài 11/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **package.json chứa những gì?**
- Giải thích và đưa ví dụ cho: **Lock file có vai trò gì?**
- Giải thích và đưa ví dụ cho: **Semantic versioning là gì?**
- Giải thích và đưa ví dụ cho: **Vite và Webpack làm gì?**
- Giải thích và đưa ví dụ cho: **Tree shaking là gì?**
- Giải thích và đưa ví dụ cho: **Environment variables cần quản lý như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 11.1 `package.json` chứa những gì?

`package.json` mô tả dự án và các gói phụ thuộc.

Các phần chính:

- Tên và phiên bản.
- Scripts.
- Dependencies.
- Dev dependencies.
- Cấu hình module.
- Yêu cầu phiên bản môi trường.
- Metadata dự án.

Dependencies cần khi chạy sản phẩm. Dev dependencies chủ yếu phục vụ phát triển, kiểm thử hoặc build.

## 11.2 Lock file có vai trò gì?

Lock file ghi chính xác phiên bản đã cài của toàn bộ cây phụ thuộc.

Lợi ích:

- Môi trường cài đặt nhất quán.
- Giảm khác biệt giữa máy local và CI.
- Dễ theo dõi thay đổi dependency.
- Hỗ trợ điều tra lỗi sau nâng phiên bản.

Lock file nên được commit và không nên xóa tùy tiện.

## 11.3 Semantic versioning là gì?

Semantic versioning dùng dạng major.minor.patch.

- Major: thay đổi không tương thích.
- Minor: thêm chức năng tương thích.
- Patch: sửa lỗi tương thích.

Cần hiểu phạm vi phiên bản được cho phép trong file cấu hình và vai trò của lock file.

## 11.4 Vite và Webpack làm gì?

Cả hai hỗ trợ phát triển và build ứng dụng frontend.

Webpack xây dependency graph và bundle nhiều loại tài nguyên qua loader và plugin.

Vite dùng module của trình duyệt trong môi trường phát triển và công cụ build cho bản production.

Nội dung cần hiểu:

- Entry.
- Module.
- Plugin.
- Dev server.
- Source map.
- Code splitting.
- Asset handling.
- Environment variables.
- Production build.

## 11.5 Tree shaking là gì?

Tree shaking loại bỏ phần export không được sử dụng khỏi bundle production.

Hiệu quả phụ thuộc:

- Module tĩnh.
- Package có cấu trúc phù hợp.
- Không có tác động phụ khó phân tích.
- Cấu hình build.
- Cách import.

Import toàn bộ thư viện hoặc dùng module không hỗ trợ tree shaking có thể làm bundle lớn.

## 11.6 Environment variables cần quản lý như thế nào?

Biến môi trường phía frontend cuối cùng có thể được đóng gói và nhìn thấy trên trình duyệt.

Không được đặt secret thật trong biến môi trường frontend.

Biến môi trường frontend phù hợp với base URL, tên môi trường, cờ cấu hình công khai và ID không nhạy cảm.

Secret phải được giữ ở server.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. package.json chứa những gì?
2. Lock file có vai trò gì?
3. Semantic versioning là gì?
4. Vite và Webpack làm gì?
5. Tree shaking là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
