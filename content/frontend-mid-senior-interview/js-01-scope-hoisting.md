# 01. JavaScript: Scope, hoisting & TDZ

> Bài 1/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt var / let / const và scope
- Giải thích hoisting + Temporal Dead Zone
- Tránh bug scope trong vòng lặp và callback

## Cách trả lời phỏng vấn

1. Mở đầu: scope quyết định biến sống ở đâu, không chỉ 'cú pháp khai báo'.
2. Luôn có ví dụ nhỏ chạy được trong đầu interviewer.
3. Kết bằng thói quen: ưu tiên const → let, gần như không dùng var.

## Kiến thức cốt lõi

### 1. `var` / `let` / `const`

| | Scope | Re-assign | Hoisting |
|---|---|---|---|
| `var` | function | có | có, init `undefined` |
| `let` | block | có | có, nhưng TDZ |
| `const` | block | không (binding) | có, TDZ |

`const` object vẫn mutate được nội dung:

```js
const user = { name: 'An' }
user.name = 'Bình' // OK
// user = {} // TypeError
```

### 2. Hoisting

Function declaration hoist cả body → gọi trước khi khai báo được.

`var` hoist khai báo, giá trị `undefined` đến lúc gán.

`let`/`const` hoist nhưng nằm **TDZ**: truy cập trước dòng khai báo → `ReferenceError`.

```js
console.log(a) // undefined
var a = 1

console.log(b) // ReferenceError
let b = 2
```

### 3. Classic loop + `var` bug

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 3 3 3 — vì cùng 1 biến i function-scope
```

`let` mỗi vòng một binding → `0 1 2`.

### 4. Câu trả lời mẫu ~45s

> “Em ưu tiên `const`/`let` vì block scope, tránh surprise của `var`. Hoisting với `let`/`const` vẫn xảy ra nhưng bị TDZ nên không đọc trước khai báo được. Bug hay gặp là `var` trong loop với async callback.”


## Tóm tắt nhanh

- Block scope > function scope cho code hiện đại
- TDZ giải thích ReferenceError trước khai báo
- Loop + async: dùng let/const

## Tự kiểm tra

1. Vì sao `const` vẫn đổi được property object?
2. TDZ là gì?
3. Sửa vòng lặp in ra 0 1 2 với setTimeout?

## Lỗi thường gặp

- Nói const object là immutable hoàn toàn
- Không phân biệt hoist var vs let
- Vẫn dùng var trong codebase mới
