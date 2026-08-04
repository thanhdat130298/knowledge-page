/**
 * Normalize media URLs so <img src> can load them.
 * Google Drive "/view" links are HTML pages — not direct image bytes.
 */

const DRIVE_FILE_RE =
  /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?.*id=)|docs\.google\.com\/.*?\/d\/)([a-zA-Z0-9_-]+)/;

export function extractGoogleDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  const match = trimmed.match(DRIVE_FILE_RE);
  return match?.[1] || null;
}

export function isGoogleDriveShareUrl(url: string): boolean {
  return Boolean(extractGoogleDriveFileId(url));
}

/**
 * Convert share links (Drive, etc.) into a URL more suitable for <img>.
 * Drive files must be shared as "Anyone with the link" for this to work.
 */
export function toDirectImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  const driveId = extractGoogleDriveFileId(trimmed);
  if (driveId) {
    // Thumbnail endpoint is more reliable in <img> than /uc?export=view
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w2000`;
  }

  return trimmed;
}

export function mediaUrlHint(url: string): string | null {
  if (!url.trim()) return null;
  if (isGoogleDriveShareUrl(url)) {
    return "Link Google Drive đã được chuyển sang dạng xem ảnh trực tiếp. File phải public (Anyone with the link). Drive đôi khi vẫn chặn hotlink — nên dùng Supabase Storage / Imgur / URL .jpg/.png trực tiếp.";
  }
  if (/drive\.google\.com\/file\/d\//.test(url) && url.includes("/view")) {
    return "Đây là trang xem Drive, không phải URL ảnh. Dùng URL trực tiếp (.jpg/.png) hoặc upload lên Storage.";
  }
  return null;
}
