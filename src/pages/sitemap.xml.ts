import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const posts = await getCollection('blog');
  const urls = [
    {
      loc: new URL(`${base}/`, site).toString(),
      lastmod: new Date().toISOString()
    },
    ...posts.map((post) => ({
      loc: new URL(`${base}/posts/${post.id}/`, site).toString(),
      lastmod: (post.data.updatedDate ?? post.data.date).toISOString()
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
