# 04. React

> Bài 4/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Component là gì?**
- Giải thích và đưa ví dụ cho: **Props và state khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Khi nào component render lại?**
- Giải thích và đưa ví dụ cho: **Reconciliation là gì?**
- Giải thích và đưa ví dụ cho: **key trong danh sách có vai trò gì?**
- Giải thích và đưa ví dụ cho: **useState hoạt động như thế nào?**
- Giải thích và đưa ví dụ cho: **Batching là gì?**
- Giải thích và đưa ví dụ cho: **useEffect dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **Dependency array của useEffect hoạt động như thế nào?**
- Giải thích và đưa ví dụ cho: **Stale closure trong React là gì?**
- Giải thích và đưa ví dụ cho: **useRef dùng để làm gì?**
- Giải thích và đưa ví dụ cho: **useMemo và useCallback khác nhau như thế nào?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 4.1 Component là gì?

Component là đơn vị giao diện có trách nhiệm rõ ràng, nhận dữ liệu đầu vào và trả về mô tả giao diện.

Một component nên:

- Có mục đích rõ.
- Không chứa quá nhiều trách nhiệm.
- Có props dễ hiểu.
- Không phụ thuộc không cần thiết vào bên ngoài.
- Có thể kiểm thử độc lập.
- Tách logic dùng lại thành hook hoặc module phù hợp.

## 4.2 Props và state khác nhau như thế nào?

Props là dữ liệu component nhận từ bên ngoài. Component không nên tự thay đổi props.

State là dữ liệu do component quản lý và có thể thay đổi theo tương tác hoặc kết quả xử lý.

Một giá trị không nên nằm trong state nếu có thể tính trực tiếp từ props hoặc state khác.

## 4.3 Khi nào component render lại?

Component có thể render lại khi:

- State thay đổi.
- Props thay đổi.
- Context thay đổi.
- Component cha render lại.
- Store bên ngoài thông báo phần state đã đăng ký thay đổi.

Render lại là thực hiện lại hàm component để tạo mô tả giao diện mới. Điều này không đồng nghĩa toàn bộ DOM thật bị tạo lại.

## 4.4 Reconciliation là gì?

Reconciliation là quá trình React so sánh kết quả render mới với kết quả trước để quyết định cập nhật gì.

React dựa vào loại phần tử, vị trí và `key` để xác định phần tử được giữ lại, cập nhật hoặc tạo mới.

## 4.5 `key` trong danh sách có vai trò gì?

`key` giúp React nhận diện mỗi phần tử qua các lần render.

Một `key` tốt cần:

- Duy nhất trong danh sách hiện tại.
- Ổn định qua các lần render.
- Gắn với danh tính thật của dữ liệu.

Không nên dùng index khi danh sách có thể thêm, xóa hoặc thay đổi thứ tự.

## 4.6 `useState` hoạt động như thế nào?

`useState` tạo state cho functional component.

Hàm cập nhật state yêu cầu React lên lịch render mới. Nếu state mới phụ thuộc state cũ, nên dùng dạng cập nhật bằng hàm.

Cần tránh:

- Sửa trực tiếp object hoặc array.
- Lưu dữ liệu có thể tính được.
- Gộp quá nhiều trạng thái không liên quan.
- Chia quá nhỏ những trạng thái luôn thay đổi cùng nhau.

## 4.7 Batching là gì?

Batching là việc React gộp nhiều cập nhật state thành một lần render.

Vì cập nhật được lên lịch, đọc state ngay sau khi gọi hàm cập nhật vẫn có thể nhận giá trị của lần render hiện tại.

## 4.8 `useEffect` dùng để làm gì?

`useEffect` dùng để đồng bộ component với hệ thống bên ngoài React.

Các trường hợp phù hợp:

- Gọi API.
- Đăng ký event listener.
- Đồng bộ local storage.
- Thiết lập timer.
- Kết nối WebSocket.
- Tương tác với thư viện bên ngoài.

Không nên dùng effect chỉ để tính một giá trị có thể tính trực tiếp khi render.

## 4.9 Dependency array của `useEffect` hoạt động như thế nào?

Dependency array chứa các giá trị được sử dụng trong effect và có thể thay đổi theo từng lần render.

Thiếu dependency có thể làm effect dùng dữ liệu cũ.

Thêm dependency không ổn định như object hoặc function mới tạo mỗi lần có thể làm effect chạy liên tục.

Giải pháp là xem lại cấu trúc code, không phải xóa dependency tùy tiện.

## 4.10 Stale closure trong React là gì?

Stale closure xảy ra khi callback giữ state hoặc props của một lần render cũ.

Thường xuất hiện trong timer, event listener, Promise callback, subscription hoặc effect thiếu dependency.

Cách xử lý:

- Khai báo dependency đầy đủ.
- Dùng cập nhật state bằng hàm.
- Dùng ref khi cần đọc giá trị mới nhất nhưng không muốn làm callback thay đổi.
- Tổ chức lại luồng dữ liệu.

## 4.11 `useRef` dùng để làm gì?

`useRef` giữ một giá trị qua nhiều lần render mà việc thay đổi giá trị không làm component render lại.

Hai mục đích chính:

- Truy cập phần tử DOM.
- Giữ dữ liệu thay đổi nhưng không dùng để hiển thị.

Không nên thay state bằng ref nếu giao diện cần cập nhật khi giá trị thay đổi.

## 4.12 `useMemo` và `useCallback` khác nhau như thế nào?

`useMemo` ghi nhớ kết quả tính toán.

`useCallback` ghi nhớ tham chiếu của hàm.

Nên dùng khi có phép tính đáng kể, cần giữ tham chiếu ổn định hoặc đã xác định vấn đề render.

Không nên dùng tự động cho mọi giá trị và mọi hàm.

## 4.13 `React.memo` hoạt động như thế nào?

`React.memo` giúp React có thể bỏ qua render khi props không thay đổi theo so sánh nông.

Nếu props chứa object, array hoặc function mới tạo mỗi lần, `React.memo` có thể không có hiệu quả.

`React.memo` không ngăn render lại do state nội bộ hoặc context.

## 4.14 Controlled và uncontrolled component khác nhau như thế nào?

Controlled component lấy giá trị từ React state.

Uncontrolled component để DOM giữ trạng thái và React đọc khi cần, thường qua ref.

Controlled phù hợp khi cần kiểm tra dữ liệu theo thời gian thực, điều khiển giá trị từ bên ngoài hoặc đồng bộ nhiều trường.

## 4.15 Lifting state up là gì?

Lifting state up là chuyển state lên component cha chung gần nhất để nhiều component con dùng cùng nguồn dữ liệu.

State nên đặt ở vị trí thấp nhất nhưng đủ để các component cần thiết truy cập.

## 4.16 Props drilling là gì?

Props drilling là truyền props qua nhiều tầng component trung gian dù các tầng đó không dùng dữ liệu.

Cách xử lý:

- Composition.
- Đưa component đến gần nơi quản lý state.
- Context.
- Store ngoài.
- Tổ chức lại cây component.

## 4.17 Custom hook là gì?

Custom hook là hàm bắt đầu bằng `use`, dùng để đóng gói logic có sử dụng hook.

Custom hook chia sẻ logic, không tự chia sẻ state giữa các component.

Một custom hook nên có đầu vào và đầu ra rõ, cleanup đúng và không phụ thuộc ngầm quá nhiều.

## 4.18 Context API phù hợp với trường hợp nào?

Context phù hợp với theme, ngôn ngữ, phiên đăng nhập, cấu hình chung hoặc dependency.

Nếu value của Provider thay đổi, các consumer liên quan có thể render lại.

Nếu Context chứa object lớn và thay đổi thường xuyên, nên tách Context hoặc dùng store có selector.

## 4.19 Error Boundary là gì?

Error Boundary bắt lỗi xảy ra trong quá trình render của cây component con và hiển thị giao diện thay thế.

Error Boundary không bắt lỗi trong event handler, callback bất đồng bộ hoặc chính Error Boundary.

Nên đặt theo khu vực chức năng để một lỗi không làm hỏng toàn bộ ứng dụng.

## 4.20 Cách tổ chức một component lớn nên như thế nào?

Xác định component đang chứa những trách nhiệm nào:

- Giao diện.
- Form.
- API.
- Chuyển đổi dữ liệu.
- Phân quyền.
- Tracking.
- Modal.
- Nghiệp vụ.

Có thể tách logic API sang service hoặc query hook, logic dùng lại sang custom hook, giao diện độc lập sang component con và hàm chuyển đổi sang utility.

Không nên tách quá nhỏ khiến phải nhảy qua nhiều file để hiểu một luồng đơn giản.


---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Component là gì?
2. Props và state khác nhau như thế nào?
3. Khi nào component render lại?
4. Reconciliation là gì?
5. key trong danh sách có vai trò gì?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
