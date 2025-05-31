import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { remark } from 'remark';
import html from 'remark-html';

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | AI Hustle Hub</title>
        <meta name="description" content={`Read: ${post.title}`} />
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>{post.title}</h1>
        <p><em>{post.date}</em></p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        title: frontmatter.title,
        date: frontmatter.date,
        content: contentHtml,
      },
    },
  };
}
