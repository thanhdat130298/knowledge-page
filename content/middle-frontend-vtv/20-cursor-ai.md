# 20. Sử dụng AI và Cursor trong phát triển phần mềm

> Bài 20/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Em có sử dụng AI hỗ trợ code không?**
- Giải thích và đưa ví dụ cho: **Prompt là gì?**
- Giải thích và đưa ví dụ cho: **Context là gì?**
- Giải thích và đưa ví dụ cho: **Rules là gì?**
- Giải thích và đưa ví dụ cho: **Skills là gì?**
- Giải thích và đưa ví dụ cho: **Prompt, rules và skills khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Khi nào nên yêu cầu AI lập kế hoạch trước?**
- Giải thích và đưa ví dụ cho: **Vì sao nên chia task AI thành phần nhỏ?**
- Giải thích và đưa ví dụ cho: **Kiểm tra code do AI tạo ra như thế nào?**
- Giải thích và đưa ví dụ cho: **Những lỗi AI thường tạo ra là gì?**
- Giải thích và đưa ví dụ cho: **Khi AI đưa hai phương án, chọn như thế nào?**
- Giải thích và đưa ví dụ cho: **Đánh giá hiệu quả sử dụng AI bằng tiêu chí nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 20.1 Em có sử dụng AI hỗ trợ code không?

Có. Cursor có thể hỗ trợ:

- Đọc và giải thích code.
- Tìm khu vực liên quan.
- Tạo cấu trúc ban đầu.
- Refactor.
- Viết type.
- Đề xuất test case.
- Viết unit test ban đầu.
- Viết tài liệu.
- Tổng hợp thay đổi.
- Tìm khả năng gây lỗi.

AI được dùng để giảm công việc lặp lại và tăng tốc phân tích. Quyết định kỹ thuật và trách nhiệm cuối cùng vẫn thuộc về developer.

## 20.2 Prompt là gì?

Prompt là yêu cầu cho một công việc cụ thể.

Một prompt rõ cần có:

- Bối cảnh.
- Vấn đề.
- Mục tiêu.
- Phạm vi được sửa.
- Phần không được sửa.
- Quy tắc kỹ thuật.
- Kết quả mong đợi.
- Cách kiểm tra hoàn thành.

Prompt không cần dài trong mọi trường hợp. Quan trọng là đủ thông tin để hạn chế hiểu sai.

## 20.3 Context là gì?

Context là dữ liệu AI cần để hiểu task và codebase.

Có thể gồm:

- Yêu cầu nghiệp vụ.
- Các file liên quan.
- Kiến trúc dự án.
- Type.
- API contract.
- Component dùng chung.
- Coding convention.
- Lỗi hiện tại.
- Kết quả mong đợi.
- Giới hạn thay đổi.

Context quá ít làm AI đoán. Context quá nhiều nhưng không liên quan làm AI khó tập trung.

## 20.4 Rules là gì?

Rules là các nguyên tắc ổn định AI cần tuân thủ trong dự án.

Nội dung có thể gồm:

- Cấu trúc thư mục.
- Quy tắc đặt tên.
- Cách định nghĩa component.
- Cách quản lý state.
- Cách gọi API.
- Quy tắc TypeScript.
- Xử lý lỗi.
- Kiểm thử.
- Quy tắc bảo mật.
- Lệnh kiểm tra phải chạy.
- Giới hạn thay đổi.

Rules cần cụ thể và có thể kiểm tra.

Không nên viết quy tắc mơ hồ như “hãy viết code tốt”. Cần mô tả thế nào là đúng trong dự án.

## 20.5 Skills là gì?

Skills là quy trình chuyên biệt có thể tái sử dụng cho một loại công việc.

Một skill có thể mô tả:

- Khi nào được sử dụng.
- Tài liệu hoặc file cần đọc.
- Các bước phân tích.
- Các bước thay đổi.
- Lệnh cần chạy.
- Tiêu chí hoàn thành.
- Điều kiện dừng và yêu cầu người dùng quyết định.

Skills phù hợp với công việc lặp lại như:

- Tạo module mới.
- Viết unit test.
- Review Pull Request.
- Kiểm tra accessibility.
- Refactor component.
- Tích hợp API.
- Viết tài liệu.

## 20.6 Prompt, rules và skills khác nhau như thế nào?

Prompt xử lý task hiện tại.

Rules quy định nguyên tắc chung của dự án.

Skills mô tả quy trình đầy đủ cho một nhóm task lặp lại.

Có thể hiểu:

- Prompt nói cần làm gì.
- Rules nói phải tuân thủ điều gì.
- Skills nói thực hiện loại công việc đó theo quy trình nào.

## 20.7 Khi nào nên yêu cầu AI lập kế hoạch trước?

Nên yêu cầu lập kế hoạch khi:

- Task ảnh hưởng nhiều file.
- Chưa rõ cấu trúc code.
- Có thay đổi kiến trúc.
- Có nguy cơ ảnh hưởng tính năng cũ.
- Cần migration.
- Cần so sánh nhiều phương án.
- Cần chia thành nhiều bước.

Kế hoạch cần nêu:

- File dự kiến thay đổi.
- Luồng dữ liệu.
- Rủi ro.
- Trình tự thực hiện.
- Cách kiểm tra.
- Phần chưa chắc chắn.

## 20.8 Vì sao nên chia task AI thành phần nhỏ?

- Dễ review diff.
- Dễ phát hiện hiểu sai.
- Dễ hoàn tác.
- Giảm thay đổi không liên quan.
- Giảm nguy cơ phá kiến trúc.
- Dễ kiểm thử từng phần.
- Dễ theo dõi nguyên nhân khi lỗi.

Một thay đổi lớn do AI tạo ra có thể chứa nhiều quyết định ngầm khó kiểm soát.

## 20.9 Kiểm tra code do AI tạo ra như thế nào?

1. Đọc toàn bộ diff.
2. So sánh với yêu cầu.
3. Kiểm tra logic.
4. Kiểm tra type.
5. Kiểm tra tác động đến API công khai.
6. Kiểm tra hiệu năng.
7. Kiểm tra bảo mật.
8. Kiểm tra accessibility.
9. Chạy lint.
10. Chạy type check.
11. Chạy test.
12. Build.
13. Kiểm tra chức năng thực tế.
14. Kiểm tra file ngoài phạm vi.
15. Loại bỏ code thừa hoặc package không cần thiết.

Không chấp nhận code chỉ vì chạy được.

## 20.10 Những lỗi AI thường tạo ra là gì?

- Hiểu sai yêu cầu.
- Dùng API hoặc cú pháp không phù hợp phiên bản.
- Bịa ra file, hàm hoặc cấu hình không tồn tại.
- Sửa quá nhiều phần.
- Tạo logic trùng.
- Bỏ qua trường hợp biên.
- Dùng `any`.
- Bỏ qua cleanup.
- Tạo lỗ hổng bảo mật.
- Thêm package không cần thiết.
- Viết test chỉ để pass.
- Tạo abstraction quá mức.
- Không phù hợp convention hiện tại.
- Xóa hành vi cũ không được mô tả trong prompt.

## 20.11 Khi AI đưa hai phương án, chọn như thế nào?

Đánh giá theo:

- Độ đúng.
- Mức phù hợp với kiến trúc.
- Độ phức tạp.
- Khả năng bảo trì.
- Hiệu năng.
- Rủi ro.
- Khả năng kiểm thử.
- Thời gian triển khai.
- Khả năng mở rộng.
- Mức thay đổi đối với code hiện tại.

Không chọn chỉ vì phương án có nhiều code hơn hoặc nghe hiện đại hơn.

## 20.12 Đánh giá hiệu quả sử dụng AI bằng tiêu chí nào?

- Thời gian hoàn thành tổng thể.
- Thời gian review và sửa lại.
- Số lỗi phát sinh.
- Mức độ nhất quán.
- Chất lượng test.
- Mức thay đổi ngoài phạm vi.
- Khả năng bảo trì.
- Mức giảm công việc lặp lại.
- Khả năng giải thích lại code.
- Tác động đến tốc độ review của team.

Số dòng code AI tạo ra không phải tiêu chí chính.

## 20.13 Dữ liệu nào không nên đưa vào AI?

- Mật khẩu.
- Token.
- Khóa API.
- Secret.
- Dữ liệu khách hàng.
- Thông tin cá nhân.
- Dữ liệu tài chính.
- Source code bị giới hạn theo hợp đồng.
- Tài liệu nội bộ không được phép.
- Thông tin hạ tầng nhạy cảm.
- Log chứa dữ liệu riêng tư.

Cần tuân thủ chính sách công ty và cấu hình quyền truy cập của công cụ.

## 20.14 AI có thay thế code review của con người không?

Không.

AI có thể hỗ trợ:

- Tìm lỗi phổ biến.
- Kiểm tra convention.
- Gợi ý trường hợp test.
- Tóm tắt diff.
- Tìm code trùng.

Con người vẫn cần đánh giá nghiệp vụ, bối cảnh sản phẩm, kiến trúc, rủi ro, khả năng vận hành và mục tiêu dài hạn.

## 20.15 Làm sao tránh phụ thuộc AI?

- Tự phân tích trước khi hỏi.
- Yêu cầu AI giải thích.
- Không dùng code không hiểu.
- Kiểm tra tài liệu chính thức khi cần.
- Tự viết phần cốt lõi quan trọng.
- Review từng thay đổi.
- Thực hành không dùng AI cho kiến thức nền.
- Ghi lại nguyên nhân và quyết định kỹ thuật.
- Có khả năng tiếp tục task khi AI không dùng được.

## 20.16 Câu trả lời hoàn chỉnh về việc dùng Cursor

Em sử dụng Cursor để hỗ trợ đọc code, phân tích luồng xử lý, tạo cấu trúc ban đầu, refactor, viết type, đề xuất test case và viết tài liệu. Em không xem kết quả AI tạo ra là code cuối cùng.

Với task nhỏ, em cung cấp rõ bối cảnh, phạm vi, yêu cầu và tiêu chí hoàn thành. Với task lớn, em yêu cầu phân tích codebase và lập kế hoạch trước, sau đó chia thay đổi thành nhiều phần nhỏ.

Em dùng rules để quy định cấu trúc thư mục, coding convention, cách quản lý state, gọi API, TypeScript, xử lý lỗi và kiểm thử. Với quy trình lặp lại như tạo module, viết test hoặc review accessibility, em có thể dùng skills để mô tả đầy đủ các bước và tiêu chí hoàn thành.

Sau khi AI thay đổi code, em review toàn bộ diff, kiểm tra logic, type, hiệu năng, bảo mật và tác động đến chức năng cũ. Em chạy lint, type check, test và build trước khi tạo Pull Request.

Em đánh giá hiệu quả AI bằng tổng thời gian hoàn thành, thời gian sửa lại, chất lượng code và số lỗi phát sinh, không dựa vào số lượng code AI tạo ra.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Em có sử dụng AI hỗ trợ code không?
2. Prompt là gì?
3. Context là gì?
4. Rules là gì?
5. Skills là gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
