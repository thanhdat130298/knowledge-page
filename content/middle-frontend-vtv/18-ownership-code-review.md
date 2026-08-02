# 18. Ownership, code review và hỗ trợ thành viên khác

> Bài 18/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Ownership một tính năng gồm những gì?**
- Giải thích và đưa ví dụ cho: **Làm sao xử lý yêu cầu chưa rõ?**
- Giải thích và đưa ví dụ cho: **Làm sao ước lượng task?**
- Giải thích và đưa ví dụ cho: **Làm sao xử lý bất đồng kỹ thuật?**
- Giải thích và đưa ví dụ cho: **Làm sao hỗ trợ thành viên ít kinh nghiệm hơn?**
- Giải thích và đưa ví dụ cho: **Xử lý lỗi production như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 18.1 Ownership một tính năng gồm những gì?

Ownership không chỉ là viết code.

Một tính năng thường đi qua:

1. Hiểu mục tiêu.
2. Làm rõ yêu cầu.
3. Xác định phạm vi.
4. Thiết kế kỹ thuật.
5. Chia task.
6. Phối hợp backend, QA và UI/UX.
7. Phát triển.
8. Kiểm thử.
9. Triển khai.
10. Theo dõi sau release.
11. Sửa lỗi và cải tiến.
12. Cập nhật tài liệu.

Cần chủ động báo rủi ro và không chờ sát hạn mới thông báo.

## 18.2 Làm sao xử lý yêu cầu chưa rõ?

- Xác định điểm mơ hồ.
- Viết lại cách hiểu.
- Đưa ra câu hỏi cụ thể.
- Xác nhận luồng chính và trường hợp biên.
- Làm rõ tiêu chí hoàn thành.
- Ghi lại quyết định.
- Không tự đoán phần có ảnh hưởng lớn.

## 18.3 Làm sao ước lượng task?

Cần xem:

- Mức độ rõ của yêu cầu.
- Phụ thuộc API.
- Độ phức tạp giao diện.
- Trường hợp biên.
- Test.
- Review.
- Deploy.
- Rủi ro kỹ thuật.
- Mức độ quen với codebase.

Nếu chưa đủ thông tin, đưa khoảng ước lượng và nêu giả định.

## 18.4 Làm sao xử lý bất đồng kỹ thuật?

- Thống nhất vấn đề cần giải quyết.
- Đưa ra tiêu chí đánh giá.
- So sánh phương án theo độ phức tạp, hiệu năng, bảo trì và thời gian.
- Dùng dữ liệu hoặc thử nghiệm nhỏ khi cần.
- Tôn trọng tiêu chuẩn team.
- Ghi lại quyết định.
- Không biến tranh luận kỹ thuật thành vấn đề cá nhân.

## 18.5 Làm sao hỗ trợ thành viên ít kinh nghiệm hơn?

- Giải thích nguyên nhân, không chỉ đưa đáp án.
- Chia vấn đề thành phần nhỏ.
- Đưa tài liệu phù hợp.
- Review có ưu tiên.
- Cho người đó tự sửa.
- Theo dõi lại.
- Viết guideline nếu lỗi lặp lại.
- Không sửa toàn bộ thay họ trừ trường hợp khẩn cấp.

## 18.6 Xử lý lỗi production như thế nào?

1. Xác định mức ảnh hưởng.
2. Thu thập log và điều kiện xảy ra.
3. Giảm tác động nếu có thể.
4. Xác định phiên bản gây lỗi.
5. Quyết định rollback hoặc sửa nhanh.
6. Kiểm tra bản sửa.
7. Theo dõi sau triển khai.
8. Viết nguyên nhân gốc.
9. Bổ sung test hoặc cảnh báo.
10. Cập nhật quy trình để tránh lặp lại.


---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Ownership một tính năng gồm những gì?
2. Làm sao xử lý yêu cầu chưa rõ?
3. Làm sao ước lượng task?
4. Làm sao xử lý bất đồng kỹ thuật?
5. Làm sao hỗ trợ thành viên ít kinh nghiệm hơn?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
