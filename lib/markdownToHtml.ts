import { remark } from 'remark'
import html from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  let processedHtml = result.toString();
  processedHtml = processedHtml.replace(/<img([^>]+)>/g, (match, p1) => {
    if (p1.includes('loading=')) {
      return match;
    }
    return `<img${p1} loading="lazy">`;
  });
  return processedHtml;
}
