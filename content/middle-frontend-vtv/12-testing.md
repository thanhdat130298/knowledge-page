# 12. Kiểm thử

> Bài 12/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Unit test là gì?**
- Giải thích và đưa ví dụ cho: **Integration test là gì?**
- Giải thích và đưa ví dụ cho: **E2E test là gì?**
- Giải thích và đưa ví dụ cho: **Jest và Vitest có vai trò gì?**
- Giải thích và đưa ví dụ cho: **React Testing Library theo nguyên tắc nào?**
- Giải thích và đưa ví dụ cho: **Mock là gì và khi nào nên dùng?**
- Giải thích và đưa ví dụ cho: **Test coverage có ý nghĩa gì?**
- Giải thích và đưa ví dụ cho: **Component gọi API nên được test những gì?**
- Giải thích và đưa ví dụ cho: **Test không ổn định thường do đâu?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 12.1 Unit test là gì?

Unit test kiểm tra một đơn vị nhỏ như hàm, hook hoặc component trong phạm vi giới hạn.

Unit test nên:

- Chạy nhanh.
- Có kết quả ổn định.
- Tập trung vào hành vi.
- Ít phụ thuộc hệ thống ngoài.
- Dễ xác định nguyên nhân khi thất bại.

Không cần test mọi chi tiết nội bộ.

## 12.2 Integration test là gì?

Integration test kiểm tra nhiều phần hoạt động cùng nhau.

Phạm vi có thể là:

- Component kết hợp form và API mock.
- Hook kết hợp cache và service.
- Màn hình kết hợp filter, pagination và danh sách.

Integration test phát hiện lỗi ở ranh giới giữa các module.

## 12.3 E2E test là gì?

E2E test mô phỏng luồng người dùng trên ứng dụng gần với môi trường thật.

Phù hợp với:

- Đăng nhập.
- Đăng ký.
- Thanh toán.
- Tạo hoặc chỉnh sửa dữ liệu quan trọng.
- Luồng nhiều bước.

E2E chạy chậm và khó bảo trì hơn unit test, nên tập trung vào luồng quan trọng.

## 12.4 Jest và Vitest có vai trò gì?

Jest và Vitest cung cấp:

- Khai báo test.
- Assertion.
- Mock.
- Setup.
- Coverage.
- Chạy test theo file hoặc thay đổi.

Vitest tích hợp tốt với Vite. Jest có hệ sinh thái lâu đời và được dùng rộng.

## 12.5 React Testing Library theo nguyên tắc nào?

React Testing Library khuyến khích kiểm tra component theo cách gần với người dùng.

Nên tìm phần tử bằng role, label, text hoặc placeholder khi cần.

Hạn chế kiểm tra state nội bộ, tên method, class hoặc chi tiết triển khai không ảnh hưởng hành vi.

## 12.6 Mock là gì và khi nào nên dùng?

Mock thay thế dependency thật bằng phiên bản kiểm soát được trong test.

Có thể mock:

- API.
- Thời gian.
- Storage.
- Router.
- Module bên ngoài.
- Callback.

Mock quá nhiều làm test không phản ánh hệ thống thật. Chỉ mock ranh giới bên ngoài hoặc phần gây chậm, không ổn định.

## 12.7 Test coverage có ý nghĩa gì?

Coverage đo phần code đã được thực thi trong test.

Coverage cao không bảo đảm test tốt.

Nên dùng coverage để tìm khu vực chưa được test và ưu tiên nghiệp vụ quan trọng, logic phức tạp, lỗi từng xảy ra và module dùng chung.

## 12.8 Component gọi API nên được test những gì?

- Trạng thái tải.
- Dữ liệu thành công.
- Không có dữ liệu.
- Lỗi.
- Retry nếu có.
- Thay đổi tham số.
- Hủy hoặc bỏ qua kết quả cũ.
- Tương tác người dùng.
- Phân quyền hiển thị.

## 12.9 Test không ổn định thường do đâu?

- Phụ thuộc thời gian thật.
- Phụ thuộc mạng thật.
- Không chờ đúng trạng thái bất đồng bộ.
- Dùng selector dễ thay đổi.
- Chia sẻ state giữa test.
- Test phụ thuộc thứ tự.
- Animation hoặc debounce không được kiểm soát.
- Dữ liệu ngẫu nhiên.

Test cần độc lập, có setup và cleanup rõ.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Unit test là gì?
2. Integration test là gì?
3. E2E test là gì?
4. Jest và Vitest có vai trò gì?
5. React Testing Library theo nguyên tắc nào?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
