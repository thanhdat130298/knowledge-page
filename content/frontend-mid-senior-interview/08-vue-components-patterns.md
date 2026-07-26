# 14. Vue Components: props, emits, slots, provide/inject

> Bài 14/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích one-way data flow
- Dùng slots/v-model đúng cách
- Chọn provide/inject vs props vs composable

## Cách trả lời phỏng vấn

1. Nhấn mạnh: props xuống, events lên.
2. Slots = API UI linh hoạt cho design system.
3. provide/inject cho dependency xuyên cây, không thay state toàn cục lung tung.

## Kiến thức cốt lõi

### 1. Props & emits

```ts
const props = defineProps<{ title: string }>()
const emit = defineEmits<{ (e: 'update:title', v: string): void }>()
```

Không mutate props. Muốn chỉnh → emit để parent đổi source of truth.

### 2. `v-model`

Syntactic sugar cho prop + emit `update:*`. Multiple v-model trong Vue 3 rất hay được hỏi.

### 3. Slots

- Default / named / scoped slots
- Scoped: parent nhận data từ child để render (table cell templates, select options)

### 4. provide/inject

Truyền theme, form context, tree depth — tránh props drilling. Không phải thay Pinia cho business state lớn.

### 5. Composables vs mixins

Mixins: nguồn không rõ, conflict tên. Composables: explicit import, TypeScript tốt hơn — câu trả lời chuẩn mid+.

### 6. Câu trả lời mẫu

> “Em giữ one-way flow: props in, emits out. UI linh hoạt dùng slots. Context sâu cây dùng provide/inject. Logic tái sử dụng đưa vào composable, tránh mixin.”


## Tóm tắt nhanh

- One-way data flow
- Slots cho customization
- Composable > mixin

## Tự kiểm tra

1. Mutate props nguy hiểm thế nào?
2. Scoped slot dùng khi nào?
3. Khác provide/inject và Pinia?

## Lỗi thường gặp

- Props drilling 6–7 tầng không chịu tách
- Dùng mixin cho mọi thứ
- Child tự sửa prop rồi expect parent sync
