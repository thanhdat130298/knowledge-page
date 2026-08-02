# 06. Quản lý trạng thái

> Bài 6/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Có những loại state nào?**
- Giải thích và đưa ví dụ cho: **Khi nào dùng local state?**
- Giải thích và đưa ví dụ cho: **Khi nào dùng Context API?**
- Giải thích và đưa ví dụ cho: **Redux Toolkit giải quyết vấn đề gì?**
- Giải thích và đưa ví dụ cho: **Reducer cần tuân thủ nguyên tắc gì?**
- Giải thích và đưa ví dụ cho: **Selector dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Zustand khác Redux Toolkit như thế nào?**
- Giải thích và đưa ví dụ cho: **Vì sao không nên lưu server state thủ công trong global store?**
- Giải thích và đưa ví dụ cho: **URL state có lợi ích gì?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 6.1 Có những loại state nào?

- Local UI state: modal, tab, input, trạng thái mở hoặc đóng.
- Shared client state: dữ liệu cần dùng ở nhiều khu vực trên client.
- Server state: dữ liệu đến từ API, có cache, thời gian cập nhật và khả năng lỗi.
- URL state: filter, page, sort, từ khóa.
- Form state: giá trị, lỗi, touched và trạng thái gửi.
- Persistent state: dữ liệu lưu qua nhiều phiên.

Không nên đưa mọi loại state vào một global store.

## 6.2 Khi nào dùng local state?

Dùng local state khi dữ liệu chỉ cần trong một component hoặc một nhánh nhỏ.

Lợi ích:

- Dễ hiểu.
- Phạm vi thay đổi rõ.
- Hạn chế render không liên quan.
- Giảm phụ thuộc vào store toàn cục.

## 6.3 Khi nào dùng Context API?

Context phù hợp với dữ liệu dùng ở nhiều nơi nhưng mô hình cập nhật không quá phức tạp.

Không phù hợp khi:

- State thay đổi với tần suất cao.
- Cần selector chi tiết.
- Có nhiều action và luồng nghiệp vụ.
- Cần theo dõi lịch sử cập nhật rõ.

## 6.4 Redux Toolkit giải quyết vấn đề gì?

Redux Toolkit cung cấp cấu trúc thống nhất để quản lý state toàn cục.

Các thành phần chính:

- Store.
- Slice.
- Reducer.
- Action.
- Selector.
- Middleware.
- Async logic.

Redux Toolkit giảm phần code lặp so với Redux cũ và cho phép viết logic cập nhật theo cú pháp giống mutation nhưng vẫn tạo state immutable bên trong.

## 6.5 Reducer cần tuân thủ nguyên tắc gì?

Reducer nhận state hiện tại và action, sau đó tạo state tiếp theo.

Reducer cần:

- Có kết quả dự đoán được.
- Không thực hiện request mạng.
- Không phụ thuộc thời gian hoặc dữ liệu ngẫu nhiên nếu không truyền qua action.
- Không tạo tác động phụ.
- Không sửa dữ liệu ngoài phạm vi state được quản lý.

## 6.6 Selector dùng để làm gì?

Selector đọc và chuyển đổi dữ liệu từ store.

Lợi ích:

- Che giấu cấu trúc store.
- Tái sử dụng logic lấy dữ liệu.
- Tách dữ liệu dẫn xuất khỏi component.
- Có thể memo hóa tính toán.

Component nên đăng ký đúng phần state cần dùng thay vì toàn bộ store.

## 6.7 Zustand khác Redux Toolkit như thế nào?

Zustand có API đơn giản, ít cấu trúc bắt buộc và phù hợp store nhỏ hoặc trung bình.

Redux Toolkit có quy ước rõ hơn, hệ sinh thái lớn và công cụ theo dõi luồng thay đổi mạnh.

Chọn Zustand khi muốn store gọn, luồng state không quá phức tạp và cần selector đơn giản.

Chọn Redux Toolkit khi có nhiều module, luồng cập nhật phức tạp, team cần convention rõ hoặc cần middleware.

## 6.8 Vì sao không nên lưu server state thủ công trong global store?

Server state có các vấn đề riêng:

- Dữ liệu có thể cũ.
- Cần cache.
- Cần refetch.
- Có loading và error.
- Có nhiều request cùng dữ liệu.
- Cần hủy request.
- Cần đồng bộ sau mutation.

TanStack Query hoặc SWR đã cung cấp cơ chế giải quyết các vấn đề này.

## 6.9 URL state có lợi ích gì?

Đưa filter, sort, page hoặc từ khóa lên URL giúp:

- Chia sẻ đường dẫn.
- Giữ trạng thái khi tải lại.
- Hỗ trợ nút quay lại và tiến tới.
- Giảm state trùng trong component.

Không nên đưa thông tin nhạy cảm lên URL.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Có những loại state nào?
2. Khi nào dùng local state?
3. Khi nào dùng Context API?
4. Redux Toolkit giải quyết vấn đề gì?
5. Reducer cần tuân thủ nguyên tắc gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
