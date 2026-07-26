# 04. JavaScript: Types, equality, prototype & class

> Bài 4/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích primitive vs reference
- So sánh `==` / `===` và object identity
- Nắm prototype chain ở mức đủ phỏng vấn

## Cách trả lời phỏng vấn

1. `{} !== {}` vì khác reference — câu kinh điển.
2. Ưu tiên `===`, hiểu coercion khi bị hỏi `==`.
3. Class là syntax sugar trên prototype.

## Kiến thức cốt lõi

### 1. Primitive vs Object

Primitive (string, number, bool, null, undefined, symbol, bigint): so sánh theo giá trị.

Object/array/function: gán = copy **reference**.

```js
const a = { x: 1 }
const b = a
b.x = 2
console.log(a.x) // 2
```

### 2. Equality

- `===`: không ép kiểu (trừ NaN đặc biệt / Object.is chi tiết hơn)
- `==`: có coercion — dễ bug (`0 == ''` …)

```js
{} === {} // false
```

Deep equal cần thư viện / tự so sánh có kiểm soát.

### 3. Prototype

Object kế thừa property qua `[[Prototype]]`. `obj.toString` lấy từ `Object.prototype` nếu không own.

```js
class User {
  constructor(name) { this.name = name }
  hello() { return `Hi ${this.name}` }
}
```

Method nằm trên `.prototype`, instance share.

### 4. `null` vs `undefined`

- `undefined`: chưa gán / thiếu
- `null`: chủ đích “không có giá trị”

### 5. Câu trả lời mẫu

> “Primitive copy value, object copy reference nên hai literal `{}` không bằng nhau. Em dùng `===`. Class/prototype giải thích kế thừa method. Phân biệt null/undefined khi design API.”


## Tóm tắt nhanh

- Reference equality cho object
- === mặc định
- Class ↔ prototype

## Tự kiểm tra

1. Shallow copy array thế nào? Deep thì sao?
2. `Object.is(NaN, NaN)`?
3. Own property khác inherited thế nào?

## Lỗi thường gặp

- Mutate shared object bất ngờ
- Dùng == trong business logic
- Không hiểu method trên prototype
