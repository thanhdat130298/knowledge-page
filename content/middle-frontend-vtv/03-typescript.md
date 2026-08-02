# 03. TypeScript

> Bài 3/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **TypeScript mang lại lợi ích gì?**
- Giải thích và đưa ví dụ cho: **type và interface khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Union và intersection khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Type narrowing là gì?**
- Giải thích và đưa ví dụ cho: **Generic dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **any, unknown, never và void khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Utility types là gì?**
- Giải thích và đưa ví dụ cho: **keyof và typeof trong TypeScript dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Type inference là gì?**
- Giải thích và đưa ví dụ cho: **Cách định nghĩa kiểu dữ liệu API nên như thế nào?**
- Giải thích và đưa ví dụ cho: **Discriminated union là gì?**
- Giải thích và đưa ví dụ cho: **TypeScript strict mode có ý nghĩa gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 3.1 TypeScript mang lại lợi ích gì?

TypeScript bổ sung hệ thống kiểu tĩnh cho JavaScript.

Lợi ích:

- Phát hiện lỗi trước khi chạy.
- Làm rõ dữ liệu đầu vào và đầu ra.
- Hỗ trợ gợi ý code.
- Giúp refactor an toàn.
- Làm rõ hợp đồng giữa component, module và API.

TypeScript không thay thế kiểm tra dữ liệu lúc chạy. Dữ liệu từ API, local storage hoặc người dùng vẫn cần được kiểm tra.

## 3.2 `type` và `interface` khác nhau như thế nào?

Cả hai đều có thể mô tả cấu trúc object.

`interface` phù hợp khi mô tả hợp đồng object hoặc class và hỗ trợ declaration merging.

`type` linh hoạt hơn vì có thể biểu diễn union, intersection, tuple, kiểu nguyên thủy và các kiểu tạo từ toán tử kiểu.

Trong React, cả hai đều có thể dùng cho props. Quan trọng là thống nhất trong dự án.

## 3.3 Union và intersection khác nhau như thế nào?

Union biểu diễn giá trị có thể thuộc một trong nhiều kiểu.

Intersection kết hợp nhiều kiểu thành một kiểu phải đáp ứng tất cả các phần đã kết hợp.

Khi dùng union, cần narrowing trước khi truy cập thuộc tính chỉ tồn tại ở một nhánh.

## 3.4 Type narrowing là gì?

Type narrowing là quá trình thu hẹp một kiểu rộng thành kiểu cụ thể hơn dựa trên điều kiện.

Các cách thường dùng:

- `typeof`.
- `instanceof`.
- Kiểm tra thuộc tính bằng `in`.
- So sánh giá trị.
- Discriminated union.
- Hàm type guard.

## 3.5 Generic dùng để làm gì?

Generic cho phép viết hàm, component hoặc kiểu dữ liệu có thể làm việc với nhiều kiểu mà vẫn giữ thông tin kiểu cụ thể.

Generic phù hợp với:

- Component bảng.
- Component select.
- Hàm xử lý danh sách.
- Kết quả API.
- Hook dùng chung.
- Service dùng nhiều loại dữ liệu.

## 3.6 `any`, `unknown`, `never` và `void` khác nhau như thế nào?

`any` tắt phần lớn kiểm tra kiểu và dễ che giấu lỗi.

`unknown` biểu diễn giá trị chưa biết. Trước khi sử dụng, cần kiểm tra và thu hẹp kiểu.

`never` biểu diễn trường hợp không thể xảy ra hoặc hàm không thể hoàn thành bình thường.

`void` thường dùng cho hàm không trả về giá trị có ý nghĩa.

## 3.7 Utility types là gì?

Các utility types thường dùng:

- `Partial`: tất cả thuộc tính thành không bắt buộc.
- `Required`: tất cả thuộc tính thành bắt buộc.
- `Readonly`: không cho phép gán lại thuộc tính.
- `Pick`: chọn một số thuộc tính.
- `Omit`: loại bỏ một số thuộc tính.
- `Record`: tạo object theo tập key và kiểu value.
- `ReturnType`: lấy kiểu trả về của hàm.
- `Parameters`: lấy kiểu tham số của hàm.

## 3.8 `keyof` và `typeof` trong TypeScript dùng để làm gì?

`keyof` lấy tập tên thuộc tính của một kiểu object.

`typeof` trong vị trí khai báo kiểu lấy kiểu của một biến hoặc giá trị đã có.

Kết hợp `keyof`, generic và indexed access type giúp tạo component chỉ chấp nhận tên thuộc tính hợp lệ.

## 3.9 Type inference là gì?

Type inference là khả năng TypeScript tự suy ra kiểu từ giá trị, kết quả hàm hoặc ngữ cảnh.

Nên khai báo rõ ở các ranh giới quan trọng như props công khai, hàm service, dữ liệu API, hook dùng chung và kiểu trạng thái phức tạp.

## 3.10 Cách định nghĩa kiểu dữ liệu API nên như thế nào?

Cần tách rõ:

- Kiểu dữ liệu nhận từ API.
- Kiểu dữ liệu dùng trong giao diện.
- Kiểu dữ liệu gửi lên API.
- Kiểu lỗi.
- Kiểu phân trang.

Nếu dữ liệu bên ngoài không ổn định, cần kiểm tra lúc chạy hoặc chuyển đổi qua một lớp mapping.

## 3.11 Discriminated union là gì?

Discriminated union là union trong đó mỗi nhánh có một thuộc tính chung dùng để phân biệt trạng thái.

Phù hợp để mô hình hóa trạng thái request, form, thông báo, action và các biến thể component.

## 3.12 TypeScript strict mode có ý nghĩa gì?

Strict mode bật nhóm quy tắc kiểm tra nghiêm ngặt hơn.

Lợi ích:

- Giảm lỗi `null` và `undefined`.
- Kiểm tra tham số hàm rõ hơn.
- Hạn chế `any` ngầm.
- Phát hiện thuộc tính chưa khởi tạo.
- Làm type narrowing đáng tin cậy hơn.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. TypeScript mang lại lợi ích gì?
2. type và interface khác nhau như thế nào?
3. Union và intersection khác nhau như thế nào?
4. Type narrowing là gì?
5. Generic dùng để làm gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
