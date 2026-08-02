# 10. Kiến trúc frontend và design patterns

> Bài 10/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Kiến trúc theo tính năng là gì?**
- Giải thích và đưa ví dụ cho: **Separation of concerns là gì?**
- Giải thích và đưa ví dụ cho: **Presentational và container component khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Adapter pattern dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Strategy pattern dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Observer hoặc Publish–Subscribe dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Composition được ưu tiên hơn inheritance trong React vì sao?**
- Giải thích và đưa ví dụ cho: **Làm sao tránh component dùng chung trở nên quá phức tạp?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 10.1 Kiến trúc theo tính năng là gì?

Kiến trúc theo tính năng tổ chức code theo khu vực nghiệp vụ thay vì gom toàn bộ component, hook và service của mọi chức năng vào thư mục chung.

Mỗi tính năng có thể chứa:

- Component.
- Hook.
- Service.
- Type.
- Test.
- State.
- Utility riêng.

Các phần dùng chung thật sự được đặt ở shared hoặc common.

## 10.2 Separation of concerns là gì?

Separation of concerns là tách các trách nhiệm khác nhau để mỗi phần tập trung vào một mục tiêu.

Trong frontend có thể tách:

- Giao diện.
- Gọi API.
- Nghiệp vụ.
- Chuyển đổi dữ liệu.
- Quản lý state.
- Tracking.
- Kiểm tra quyền.

Tách trách nhiệm không có nghĩa mỗi hàm chỉ được một dòng. Mục tiêu là giảm phụ thuộc và làm luồng dễ hiểu.

## 10.3 Presentational và container component khác nhau như thế nào?

Presentational component tập trung hiển thị và tương tác qua props.

Container component kết nối dữ liệu, state, API hoặc nghiệp vụ.

Trong React hiện đại, logic container thường được chuyển vào custom hook. Nguyên tắc tách phần trình bày và phần điều phối vẫn hữu ích.

## 10.4 Adapter pattern dùng để làm gì?

Adapter chuyển đổi một giao diện hoặc cấu trúc dữ liệu sang dạng mà hệ thống cần.

Phù hợp khi:

- API bên ngoài có cấu trúc khác.
- Thay UI library.
- Hỗ trợ nhiều nhà cung cấp.
- Chuyển dữ liệu cũ sang model mới.

Adapter giúp component không phụ thuộc trực tiếp định dạng bên ngoài.

## 10.5 Strategy pattern dùng để làm gì?

Strategy đóng gói nhiều cách xử lý khác nhau dưới một giao diện chung.

Phù hợp với:

- Nhiều cách xác thực.
- Nhiều cách tính phí.
- Nhiều loại filter.
- Nhiều cách render theo loại dữ liệu.
- Nhiều nhà cung cấp dịch vụ.

Strategy giúp giảm chuỗi điều kiện kéo dài.

## 10.6 Observer hoặc Publish–Subscribe dùng để làm gì?

Observer và Publish–Subscribe cho phép một bên phát sự kiện và nhiều bên phản ứng.

Phù hợp với:

- Event bus.
- WebSocket.
- Notification.
- Tracking.
- Đồng bộ nhiều module.

Cần kiểm soát đăng ký và hủy đăng ký để tránh memory leak hoặc luồng sự kiện khó theo dõi.

## 10.7 Composition được ưu tiên hơn inheritance trong React vì sao?

Composition ghép component hoặc hành vi từ các phần nhỏ thông qua props, children và hook.

Nó linh hoạt hơn inheritance vì:

- Không tạo cây kế thừa chặt.
- Dễ thay đổi thành phần.
- Dễ tái sử dụng hành vi.
- Phù hợp mô hình component.

## 10.8 Làm sao tránh component dùng chung trở nên quá phức tạp?

- Xác định rõ phạm vi dùng chung.
- Không thêm mọi yêu cầu riêng lẻ thành prop mới.
- Dùng composition.
- Tách component con chuyên biệt.
- Dùng cấu hình có type rõ.
- Tách core behavior khỏi giao diện.
- Cho phép mở rộng ở đúng điểm.

Nếu hai màn hình chỉ giống hình thức nhưng khác nghiệp vụ, không nhất thiết dùng chung toàn bộ component.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Kiến trúc theo tính năng là gì?
2. Separation of concerns là gì?
3. Presentational và container component khác nhau như thế nào?
4. Adapter pattern dùng để làm gì?
5. Strategy pattern dùng để làm gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
