# 08. HTML Forms, SEO meta & document performance

> Bài 8/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- So sánh validation native vs JS
- Nêu meta/OG cần thiết cho share & SEO
- Hiểu preload/preconnect ở mức phỏng vấn

## Cách trả lời phỏng vấn

1. Tách: UX validation (client) vs security validation (server).
2. SEO: semantic + meta + performance, không chỉ nhồi keyword.
3. Perf HTML: ưu tiên critical resources, tránh chặn render.

## Kiến thức cốt lõi

### 1. Form HTML tốt trông như thế nào?

```html
<form method="post" action="/api/login" novalidate>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="username" required />

  <label for="password">Mật khẩu</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required />

  <button type="submit">Đăng nhập</button>
</form>
```

- `label` rõ ràng.
- `autocomplete` giúp password manager / UX.
- `required`/`type=email` = tầng 1; server vẫn phải validate.

### 2. Native validation vs JS validation

| Native | JS |
|--------|----|
| Nhanh, miễn phí | Custom UI/message, multi-step, async check |
| Ít đồng nhất cross-browser UI | Kiểm soát trải nghiệm |

Mid+: dùng native làm baseline, JS để UX; **không tin client**.

### 3. SEO meta cơ bản

- `title`, `meta name="description"`
- Open Graph: `og:title`, `og:description`, `og:image`
- Canonical khi nội dung trùng
- Semantic headings + internal link

### 4. Document performance hints

- `preconnect` tới origin API/font quan trọng
- `preload` font/hero image critical (không lạm dụng)
- Script: `type="module"`, defer/async đúng chỗ; framework thường lo bundling

### 5. Câu trả lời mẫu

> “Form: label + autocomplete + native constraint, JS cho UX, server là nguồn sự thật. SEO: title/description/OG + semantic. Perf: preconnect/preload có chọn lọc, tránh block render.”


## Tóm tắt nhanh

- Client validation ≠ security
- Meta + semantic là cặp SEO cơ bản
- Resource hints dùng có chủ đích

## Tự kiểm tra

1. Vì sao vẫn cần validate server khi input có `required`?
2. `preconnect` khác `preload` thế nào?
3. Kể 3 thẻ meta hữu ích khi share link

## Lỗi thường gặp

- Chỉ validate client
- Preload mọi thứ → phản tác dụng
- Title trùng mọi trang
