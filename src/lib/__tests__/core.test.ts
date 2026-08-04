import { describe, expect, it } from "vitest";
import {
  generateSlug,
  isSafeAuthRedirect,
  isValidSlug,
  sanitizeAuthRedirect,
} from "@/lib/slug";
import { isAdminEmail, readingTimeFromText } from "@/lib/utils";
import {
  extractGoogleDriveFileId,
  toDirectImageUrl,
} from "@/lib/media-url";
import { loginSchema, registerSchema, ratingSchema, seriesSchema } from "@/lib/validations";
import { extractHeadings, googleSearchUrl } from "@/lib/content";

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

  it("validates series", () => {
    expect(
      seriesSchema.safeParse({
        title: "JS Closures",
        slug: "js-closures",
        description: "Series về closure",
        is_published: true,
        sort_order: 1,
      }).success,
    ).toBe(true);
    expect(
      seriesSchema.safeParse({
        title: "X",
        slug: "Bad Slug",
        is_published: false,
        sort_order: 0,
      }).success,
    ).toBe(false);
  });
});

describe("reading time", () => {
  it("computes minutes", () => {
    const text = Array.from({ length: 400 }, () => "word").join(" ");
    expect(readingTimeFromText(text)).toBe(2);
  });
});

describe("media url", () => {
  it("converts Google Drive /view links to thumbnail URL", () => {
    const share =
      "https://drive.google.com/file/d/1kYRBNniDhqNf5x4d-sObiMBnNlJWecuQ/view?usp=drive_link";
    expect(extractGoogleDriveFileId(share)).toBe(
      "1kYRBNniDhqNf5x4d-sObiMBnNlJWecuQ",
    );
    expect(toDirectImageUrl(share)).toBe(
      "https://drive.google.com/thumbnail?id=1kYRBNniDhqNf5x4d-sObiMBnNlJWecuQ&sz=w2000",
    );
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

  it("makes duplicate heading slugs unique", () => {
    const headings = extractHeadings({
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Cơ chế" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Cơ chế" }],
        },
      ],
    });
    expect(headings[0]?.id).toBe("co-che");
    expect(headings[1]?.id).toBe("co-che-1");
  });
});

describe("google search url", () => {
  it("encodes heading text for Google", () => {
    expect(googleSearchUrl("Closure là gì?")).toBe(
      "https://www.google.com/search?q=Closure%20l%C3%A0%20g%C3%AC%3F",
    );
    expect(googleSearchUrl("  ")).toBe("https://www.google.com/");
  });
});
