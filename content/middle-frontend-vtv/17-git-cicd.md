# 17. Git, CI/CD và quy trình phát triển

> Bài 17/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Git Flow là gì?**
- Giải thích và đưa ví dụ cho: **Merge và rebase khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Pull Request tốt cần có gì?**
- Giải thích và đưa ví dụ cho: **Code review nên kiểm tra những gì?**
- Giải thích và đưa ví dụ cho: **CI/CD pipeline thường gồm những bước nào?**
- Giải thích và đưa ví dụ cho: **Rollback và roll-forward khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Agile và Scrum cần hiểu những gì?**
- Giải thích và đưa ví dụ cho: **Definition of Done là gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 17.1 Git Flow là gì?

Git Flow là mô hình quản lý branch với các nhánh cho phát triển, tính năng, release và sửa lỗi khẩn cấp.

Không phải dự án nào cũng cần Git Flow đầy đủ. Nhiều team dùng feature branch ngắn hoặc trunk-based development.

Điều quan trọng:

- Quy tắc branch rõ.
- Pull Request nhỏ.
- CI chạy tự động.
- Merge có kiểm soát.
- Có cách rollback.

## 17.2 Merge và rebase khác nhau như thế nào?

Merge kết hợp lịch sử và tạo commit merge khi cần.

Rebase đặt lại các commit lên một base mới, tạo lịch sử tuyến tính nhưng thay đổi hash commit.

Không nên rebase commit đã được nhiều người sử dụng trên branch chung nếu không có thống nhất.

## 17.3 Pull Request tốt cần có gì?

- Mục tiêu thay đổi.
- Phạm vi.
- Cách kiểm tra.
- Ảnh hoặc video khi liên quan giao diện.
- Rủi ro.
- Thay đổi API nếu có.
- Liên kết task.
- Không chứa thay đổi không liên quan.
- Test đã thực hiện.

PR nhỏ dễ review và giảm rủi ro.

## 17.4 Code review nên kiểm tra những gì?

- Đúng yêu cầu.
- Logic và trường hợp biên.
- Kiến trúc.
- Khả năng đọc.
- Naming.
- Tái sử dụng hợp lý.
- Kiểu dữ liệu.
- Xử lý lỗi.
- Hiệu năng.
- Bảo mật.
- Accessibility.
- Test.
- Tác động đến phần cũ.

Không nên biến review thành tranh luận sở thích cá nhân nếu code vẫn tuân thủ tiêu chuẩn team.

## 17.5 CI/CD pipeline thường gồm những bước nào?

- Cài dependency.
- Lint.
- Type check.
- Unit test.
- Integration test khi có.
- Build.
- Kiểm tra bundle hoặc bảo mật.
- Deploy môi trường kiểm thử.
- Kiểm tra sau deploy.
- Triển khai production.
- Theo dõi và rollback.

Pipeline giúp phát hiện lỗi sớm và tạo quy trình triển khai lặp lại.

## 17.6 Rollback và roll-forward khác nhau như thế nào?

Rollback quay lại phiên bản trước.

Roll-forward tạo bản sửa mới và triển khai tiếp.

Rollback phù hợp khi phiên bản cũ còn tương thích và cần khôi phục nhanh.

Roll-forward phù hợp khi dữ liệu hoặc thay đổi hệ thống không thể quay lại an toàn.

## 17.7 Agile và Scrum cần hiểu những gì?

Các thành phần thường gặp:

- Backlog.
- Sprint.
- Sprint planning.
- Daily meeting.
- Review.
- Retrospective.
- Estimation.
- Definition of Done.

Mục tiêu là chia nhỏ giá trị, nhận phản hồi sớm và cải tiến quy trình.

## 17.8 Definition of Done là gì?

Definition of Done là tiêu chí chung để một task được xem là hoàn thành.

Có thể gồm:

- Đáp ứng acceptance criteria.
- Code đã review.
- Test pass.
- Không có lỗi lint hoặc type.
- Tài liệu được cập nhật.
- Đã deploy môi trường cần thiết.
- QA đã xác nhận.
- Có theo dõi sau release.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Git Flow là gì?
2. Merge và rebase khác nhau như thế nào?
3. Pull Request tốt cần có gì?
4. Code review nên kiểm tra những gì?
5. CI/CD pipeline thường gồm những bước nào?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
