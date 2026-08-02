# 14. Khả năng tiếp cận

> Bài 14/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Accessibility là gì?**
- Giải thích và đưa ví dụ cho: **Vì sao nên dùng button thay vì div có onClick?**
- Giải thích và đưa ví dụ cho: **ARIA dùng khi nào?**
- Giải thích và đưa ví dụ cho: **Modal cần quản lý focus như thế nào?**
- Giải thích và đưa ví dụ cho: **Form accessible cần những gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 14.1 Accessibility là gì?

Accessibility bảo đảm sản phẩm có thể được sử dụng bởi nhiều nhóm người, bao gồm người dùng bàn phím, công cụ đọc màn hình, thị lực hạn chế hoặc vận động hạn chế.

Nội dung chính:

- Semantic HTML.
- Điều hướng bằng bàn phím.
- Quản lý focus.
- Nhãn form.
- Thông báo lỗi.
- Tương phản màu.
- Alt text.
- ARIA đúng cách.
- Không phụ thuộc hoàn toàn vào màu sắc.

## 14.2 Vì sao nên dùng `button` thay vì `div` có `onClick`?

`button` đã có:

- Khả năng nhận focus.
- Kích hoạt bằng bàn phím.
- Vai trò ngữ nghĩa.
- Hỗ trợ trạng thái disabled.
- Tương thích công cụ hỗ trợ.

Dùng `div` đòi hỏi tự xây lại toàn bộ hành vi và dễ bỏ sót.

## 14.3 ARIA dùng khi nào?

ARIA bổ sung thông tin cho công cụ hỗ trợ khi HTML ngữ nghĩa chưa đủ.

Nguyên tắc:

- Ưu tiên HTML đúng trước.
- Không thêm role trùng hoặc sai.
- Trạng thái ARIA phải đồng bộ với giao diện.
- Kiểm tra bằng bàn phím và công cụ hỗ trợ.

ARIA sai có thể làm trải nghiệm tệ hơn không dùng.

## 14.4 Modal cần quản lý focus như thế nào?

Khi modal mở:

- Focus chuyển vào modal.
- Focus không đi ra vùng phía sau.
- Có thể đóng bằng bàn phím theo yêu cầu.
- Nút đóng có tên rõ.
- Khi đóng, focus quay về phần tử đã mở modal.

Nội dung phía sau không nên tương tác được trong lúc modal hoạt động.

## 14.5 Form accessible cần những gì?

- Input có label liên kết rõ.
- Lỗi có nội dung cụ thể.
- Lỗi được liên kết với trường.
- Thứ tự tab hợp lý.
- Không dùng placeholder thay label.
- Trạng thái bắt buộc được thông báo.
- Không chỉ dùng màu để báo lỗi.
- Focus được đưa đến lỗi phù hợp khi gửi form thất bại.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Accessibility là gì?
2. Vì sao nên dùng button thay vì div có onClick?
3. ARIA dùng khi nào?
4. Modal cần quản lý focus như thế nào?
5. Form accessible cần những gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
