// src/lib/devlog.ts
// Dev Log 글을 다루는 공통 함수. 목록·상세·홈·RSS가 같이 쓴다.
import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"devlog">;

/** 최신 글이 앞에 오도록 정렬된 전체 글 */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("devlog");
  return posts.sort(
    (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
}

/** 날짜를 YYYY-MM-DD 로 */
export function formatDate(date?: Date): string {
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

/**
 * 본문 앞부분 요약. description이 없을 때 홈 카드·OG·RSS 설명으로 쓴다.
 * 마크다운·HTML 기호를 걷어내고 maxLength 글자에서 자른다.
 */
export function excerpt(post: Post, maxLength = 120): string {
  if (post.data.description) return post.data.description;
  const text = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ") // 코드 블록
    .replace(/<[^>]+>/g, " ") // HTML 태그 (<br/>, <img> 등)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 링크는 글자만
    .replace(/^#{1,6}\s+/gm, "") // 제목 기호
    .replace(/^[-*_]{3,}\s*$/gm, " ") // 구분선
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "") // 목록 기호
    .replace(/^>\s?/gm, "") // 인용
    .replace(/[*`~]/g, "") // 강조 기호 (밑줄 _ 은 deleted_at 같은 이름 때문에 남긴다)
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
}

/** 글 주소 */
export function postUrl(post: Post): string {
  return `/devlog/${post.id}/`;
}
