export type ArticleStatus = "draft" | "published" | "archived";
export type ArticleLevel = "junior" | "middle" | "senior" | "all";
export type LearningStatus = "not_started" | "learning" | "understood" | "review";
export type CommentModeration = "visible" | "hidden" | "spam";
export type FeedbackStatus = "pending" | "reviewing" | "resolved" | "rejected";
export type FeedbackType =
  | "incorrect"
  | "outdated"
  | "hard_to_understand"
  | "missing_content"
  | "missing_examples"
  | "suggestion"
  | "typo"
  | "other";
export type QuickFeedbackType = "useful" | "hard_to_understand" | "inaccurate";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  article_count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  article_count?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category_id: string | null;
  level: ArticleLevel;
  status: ArticleStatus;
  is_featured: boolean;
  author_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  reading_time_minutes: number;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  tags?: Tag[];
  author?: Profile | null;
  rating_avg?: number;
  rating_count?: number;
  comment_count?: number;
  bookmark_count?: number;
}

export interface Comment {
  id: string;
  article_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  moderation: CommentModeration;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  author?: Profile | null;
  vote_count?: number;
  user_voted?: boolean;
  replies?: Comment[];
}

export interface ArticleFeedback {
  id: string;
  article_id: string;
  user_id: string;
  feedback_type: FeedbackType;
  content: string;
  selected_text: string | null;
  status: FeedbackStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  article?: Article | null;
  user?: Profile | null;
}

export interface Bookmark {
  id: string;
  article_id: string;
  user_id: string;
  created_at: string;
  article?: Article | null;
}

export interface LearningProgress {
  id: string;
  article_id: string;
  user_id: string;
  status: LearningStatus;
  updated_at: string;
  article?: Article | null;
}

export type ArticleSort =
  | "updated"
  | "published"
  | "rating"
  | "comments"
  | "bookmarks";

export interface ArticleFilters {
  q?: string;
  category?: string;
  tag?: string;
  level?: ArticleLevel | "all";
  sort?: ArticleSort;
  page?: number;
  pageSize?: number;
  featured?: boolean;
  status?: ArticleStatus;
}
