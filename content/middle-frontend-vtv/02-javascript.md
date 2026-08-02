# 02. JavaScript

> Bài 2/22 trong series **Middle Frontend Interview (VTV)**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

- Giải thích và đưa ví dụ cho: **Scope là gì?**
- Giải thích và đưa ví dụ cho: **Hoisting là gì?**
- Giải thích và đưa ví dụ cho: **Closure là gì?**
- Giải thích và đưa ví dụ cho: **this trong JavaScript được xác định như thế nào?**
- Giải thích và đưa ví dụ cho: **Event loop hoạt động như thế nào?**
- Giải thích và đưa ví dụ cho: **Promise có những trạng thái nào?**
- Giải thích và đưa ví dụ cho: **async/await khác Promise chain như thế nào?**
- Giải thích và đưa ví dụ cho: **Promise.all, Promise.allSettled, Promise.race và Promise.any khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Mutation và immutability khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Shallow copy và deep copy khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Debounce và throttle khác nhau như thế nào?**
- Giải thích và đưa ví dụ cho: **Memory leak trong frontend thường đến từ đâu?**

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

## 2.1 Scope là gì?

Scope xác định phạm vi mà một biến, hàm hoặc giá trị có thể được truy cập.

JavaScript có các phạm vi chính:

- Global scope: có thể được truy cập từ nhiều vị trí trong chương trình.
- Function scope: biến chỉ được truy cập bên trong hàm đã khai báo nó.
- Block scope: biến chỉ tồn tại trong khối lệnh được bao bởi dấu ngoặc nhọn.
- Module scope: biến chỉ tồn tại bên trong module nếu không được export.

`var` có function scope. `let` và `const` có block scope. Khi JavaScript tìm một biến, nó kiểm tra phạm vi hiện tại trước. Nếu không tìm thấy, nó tiếp tục tìm ở phạm vi bên ngoài. Quá trình này tạo thành scope chain.

## 2.2 Hoisting là gì?

Hoisting là cách JavaScript xử lý phần khai báo trước khi thực thi code.

Function declaration có thể được gọi trước vị trí khai báo vì toàn bộ phần khai báo hàm được xử lý trong giai đoạn khởi tạo.

Biến khai báo bằng `var` được tạo và khởi tạo với giá trị `undefined` trước khi dòng khai báo được thực thi.

Biến khai báo bằng `let` và `const` cũng được tạo trước, nhưng chưa được khởi tạo để sử dụng. Khoảng thời gian từ đầu phạm vi đến dòng khai báo được gọi là temporal dead zone. Truy cập trong khoảng này gây lỗi.

Hoisting không có nghĩa là code thật sự được di chuyển lên đầu file. Đây là cách môi trường thực thi chuẩn bị các khai báo trước khi chạy từng dòng.

## 2.3 Closure là gì?

Closure xuất hiện khi một hàm vẫn có thể truy cập các biến thuộc phạm vi bên ngoài sau khi hàm bên ngoài đã kết thúc.

Một hàm không chỉ lưu phần code của nó mà còn giữ liên kết với lexical environment tại nơi nó được tạo. Nhờ vậy, hàm có thể tiếp tục sử dụng dữ liệu ở phạm vi ngoài.

Closure thường được dùng để:

- Giữ trạng thái riêng.
- Tạo hàm cấu hình sẵn.
- Xây callback.
- Xây custom hook.
- Đóng gói dữ liệu để hạn chế truy cập trực tiếp.

Closure cũng có thể gây giữ bộ nhớ lâu hơn cần thiết nếu callback, timer hoặc event listener vẫn giữ tham chiếu đến dữ liệu lớn.

## 2.4 `this` trong JavaScript được xác định như thế nào?

Giá trị của `this` trong hàm thông thường phụ thuộc vào cách hàm được gọi.

Các trường hợp chính:

- Gọi như phương thức của object: `this` thường trỏ đến object đứng trước dấu chấm.
- Gọi như hàm độc lập: trong strict mode, `this` là `undefined`.
- Gọi bằng `call`, `apply` hoặc `bind`: `this` được chỉ định rõ.
- Gọi bằng `new`: `this` trỏ đến object mới được tạo.
- Arrow function: không có `this` riêng mà lấy `this` từ phạm vi bên ngoài.

Trong React functional component, thường không cần sử dụng `this`.

## 2.5 Event loop hoạt động như thế nào?

JavaScript trên trình duyệt thường thực thi code trên một main thread. Code đồng bộ được đưa vào call stack và chạy lần lượt.

Các công việc bất đồng bộ như timer, request mạng hoặc sự kiện trình duyệt được môi trường bên ngoài JavaScript xử lý. Khi hoàn thành, callback tương ứng được đưa vào hàng đợi.

Event loop kiểm tra:

1. Call stack đã trống chưa.
2. Có microtask đang chờ không.
3. Có task thông thường đang chờ không.
4. Trình duyệt có thể cập nhật giao diện hay không.

Microtask có độ ưu tiên cao hơn task thông thường. Promise callback thường nằm trong microtask queue. `setTimeout` callback thường nằm trong task queue.

## 2.6 Promise có những trạng thái nào?

Promise có ba trạng thái:

- Pending: đang chờ kết quả.
- Fulfilled: hoàn thành thành công.
- Rejected: hoàn thành thất bại.

Khi Promise đã chuyển sang fulfilled hoặc rejected thì trạng thái không đổi lại.

`.then()` xử lý kết quả thành công. `.catch()` xử lý lỗi. `.finally()` thực hiện công việc chung sau khi Promise kết thúc.

Mỗi lần gọi `.then()` hoặc `.catch()` tạo ra một Promise mới. Nếu callback trả về một Promise, bước tiếp theo chờ Promise đó hoàn thành.

## 2.7 `async/await` khác Promise chain như thế nào?

`async/await` là cú pháp giúp viết logic Promise theo dạng gần giống code đồng bộ.

Một hàm có `async` luôn trả về Promise. `await` tạm dừng phần thực thi bên trong hàm đó cho đến khi Promise hoàn thành, nhưng không chặn toàn bộ main thread.

`async/await` thường dễ đọc khi có nhiều bước phụ thuộc nhau. Promise chain có thể rõ hơn khi cần ghép nhiều luồng xử lý theo chuỗi.

Lỗi trong `async/await` thường được xử lý bằng `try/catch`. Các công việc độc lập không nên bị đặt thành nhiều câu `await` nối tiếp nếu có thể chạy đồng thời.

## 2.8 `Promise.all`, `Promise.allSettled`, `Promise.race` và `Promise.any` khác nhau như thế nào?

`Promise.all` chờ tất cả Promise thành công. Nếu một Promise thất bại, kết quả chung thất bại ngay.

`Promise.allSettled` chờ tất cả Promise kết thúc và trả về trạng thái từng Promise.

`Promise.race` hoàn thành theo Promise đầu tiên kết thúc, bất kể thành công hay thất bại.

`Promise.any` hoàn thành theo Promise đầu tiên thành công. Chỉ thất bại khi toàn bộ Promise đều thất bại.

## 2.9 Mutation và immutability khác nhau như thế nào?

Mutation là thay đổi trực tiếp dữ liệu hiện tại.

Immutability là tạo dữ liệu mới thay vì sửa trực tiếp dữ liệu cũ.

Trong React, state nên được cập nhật theo hướng immutable để React có thể nhận biết thay đổi thông qua tham chiếu mới.

Immutability giúp:

- Dễ so sánh trạng thái cũ và mới.
- Dễ hoàn tác.
- Dễ kiểm thử.
- Giảm tác động phụ không mong muốn.

## 2.10 Shallow copy và deep copy khác nhau như thế nào?

Shallow copy tạo object hoặc array mới ở cấp ngoài cùng, nhưng các object lồng bên trong vẫn dùng chung tham chiếu.

Deep copy tạo bản sao độc lập cho toàn bộ cấu trúc lồng nhau.

Spread syntax và `Object.assign` chỉ tạo shallow copy.

Không nên deep copy toàn bộ dữ liệu chỉ để cập nhật một phần nhỏ. Nên tạo mới đúng các cấp dữ liệu đã thay đổi.

## 2.11 Debounce và throttle khác nhau như thế nào?

Debounce trì hoãn việc thực thi cho đến khi sự kiện ngừng xảy ra trong một khoảng thời gian.

Throttle giới hạn số lần thực thi trong một khoảng thời gian.

Debounce phù hợp với tìm kiếm theo từ khóa hoặc kiểm tra dữ liệu sau khi người dùng ngừng nhập.

Throttle phù hợp với scroll, resize hoặc sự kiện có tần suất cao.

## 2.12 Memory leak trong frontend thường đến từ đâu?

Các nguyên nhân thường gặp:

- Không gỡ event listener.
- Không dừng timer.
- Không hủy subscription.
- Không đóng WebSocket.
- Callback giữ tham chiếu đến dữ liệu lớn.
- Cache không có giới hạn.
- Tác vụ bất đồng bộ vẫn cập nhật sau khi component unmount.

Giải pháp là thực hiện cleanup đúng lúc, giới hạn cache và kiểm soát vòng đời tài nguyên.

## 2.13 Error handling nên tổ chức như thế nào?

Lỗi cần được xử lý ở đúng tầng:

- Tầng gọi API chuẩn hóa lỗi kỹ thuật.
- Tầng nghiệp vụ xác định lỗi có thể retry hoặc phải dừng.
- Tầng giao diện quyết định thông báo.
- Hệ thống logging lưu dữ liệu cần điều tra.

Cần phân biệt lỗi dữ liệu đầu vào, lỗi xác thực, lỗi phân quyền, lỗi mạng, lỗi server và lỗi logic.

---

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

1. Scope là gì?
2. Hoisting là gì?
3. Closure là gì?
4. this trong JavaScript được xác định như thế nào?
5. Event loop hoạt động như thế nào?

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
