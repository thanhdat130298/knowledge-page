import { describe, expect, it } from "vitest";
import {
  generateSlug,
  isSafeAuthRedirect,
  isValidSlug,
  sanitizeAuthRedirect,
} from "@/lib/slug";
import { isAdminEmail, readingTimeFromText } from "@/lib/utils";
import { loginSchema, registerSchema, ratingSchema } from "@/lib/validations";
import { extractHeadings } from "@/lib/content";

describe("slug", () => {
  it("generates slug from title", () => {
    expect(generateSlug("Event Loop hoạt động")).toMatch(/event-loop/);
  });

  it("validates slug format", () => {
    expect(isValidSlug("event-loop")).toBe(true);
    expect(isValidSlug("Event Loop")).toBe(false);
  });
});

describe("auth redirect", () => {
  it("blocks open redirects", () => {
    expect(isSafeAuthRedirect("https://evil.com")).toBe(false);
    expect(isSafeAuthRedirect("//evil.com")).toBe(false);
    expect(isSafeAuthRedirect("/articles/foo")).toBe(true);
    expect(sanitizeAuthRedirect("//evil", "/")).toBe("/");
  });
});

describe("admin allowlist", () => {
  it("checks admin emails from env", () => {
    process.env.ADMIN_EMAILS = "a@test.com,b@test.com";
    expect(isAdminEmail("a@test.com")).toBe(true);
    expect(isAdminEmail("c@test.com")).toBe(false);
  });
});

describe("validation", () => {
  it("validates login", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "x" }).success).toBe(
      true,
    );
    expect(loginSchema.safeParse({ email: "bad", password: "" }).success).toBe(
      false,
    );
  });

  it("validates register password match", () => {
    const bad = registerSchema.safeParse({
      username: "abc",
      email: "a@b.com",
      password: "password1",
      confirmPassword: "password2",
    });
    expect(bad.success).toBe(false);
  });

  it("validates rating range", () => {
    expect(ratingSchema.safeParse({ article_id: "1", rating: 5 }).success).toBe(
      true,
    );
    expect(ratingSchema.safeParse({ article_id: "1", rating: 6 }).success).toBe(
      false,
    );
  });
});

describe("reading time", () => {
  it("computes minutes", () => {
    const text = Array.from({ length: 400 }, () => "word").join(" ");
    expect(readingTimeFromText(text)).toBe(2);
  });
});

describe("tiptap headings extract", () => {
  it("extracts headings for TOC", () => {
    const headings = extractHeadings({
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2, id: "tong-quan" },
          content: [{ type: "text", text: "Tổng quan" }],
        },
      ],
    });
    expect(headings[0]?.id).toBe("tong-quan");
    expect(headings[0]?.text).toBe("Tổng quan");
  });
});
