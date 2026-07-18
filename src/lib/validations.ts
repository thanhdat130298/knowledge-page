import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username tối thiểu 3 ký tự")
      .max(32)
      .regex(/^[a-zA-Z0-9_]+$/, "Chỉ chữ, số và gạch dưới"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Nhập mật khẩu"),
});

export const profileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
  display_name: z.string().max(80).optional(),
  bio: z.string().max(500).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Nhập nội dung").max(2000),
  parent_id: z.string().uuid().optional().nullable(),
  article_id: z.string().min(1),
});

export const ratingSchema = z.object({
  article_id: z.string().min(1),
  rating: z.number().int().min(1).max(5),
});

export const feedbackSchema = z.object({
  article_id: z.string().min(1),
  feedback_type: z.enum([
    "incorrect",
    "outdated",
    "hard_to_understand",
    "missing_content",
    "missing_examples",
    "suggestion",
    "typo",
    "other",
  ]),
  content: z.string().min(5).max(5000),
  selected_text: z.string().max(2000).optional().nullable(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Tên tối thiểu 2 ký tự").max(80),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug không hợp lệ"),
  description: z.string().max(500).optional().nullable(),
  icon: z.string().max(40).optional().nullable(),
  sort_order: z.number().int().min(0).max(9999),
  is_active: z.boolean(),
});

export const articleMetaSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug không hợp lệ"),
  excerpt: z.string().max(500).optional().nullable(),
  category_id: z.string().optional().nullable(),
  level: z.enum(["junior", "middle", "senior", "all"]),
  status: z.enum(["draft", "published", "archived"]),
  is_featured: z.boolean().optional(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(160).optional().nullable(),
  cover_image_url: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional(),
});
