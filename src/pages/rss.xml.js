// src/pages/rss.xml.js
// Dev Log 구독 피드: https://www.nsklog.dev/rss.xml
import rss from "@astrojs/rss";
import { getSortedPosts, excerpt, postUrl } from "../lib/devlog";

export async function GET(context) {
  const posts = await getSortedPosts();
  return rss({
    title: "NSK Dev Log",
    description: "개발 기록과 실험을 남기는 공간",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post, 200),
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: "<language>ko-kr</language>",
  });
}
