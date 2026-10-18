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

/** 글 주소 */
export function postUrl(post: Post): string {
  return `/devlog/${post.id}/`;
}
