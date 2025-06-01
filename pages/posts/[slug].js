// pages/posts/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../../components/Layout';

export default function PostPage({ frontmatter, content }) {
  return (
    <Layout>
      <Head>
        <title>{frontmatter.title} | AI Hustle Hub</title>
        <meta name="description" content={frontmatter.excerpt || 'AI-powered blog post'} />
      </Head>
      <article>
        <h1>{frontmatter.title}</h1>
        <p><em>{frontmatter.date}</em></p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data: frontmatter, content: markdownContent } = matter(fileContent);
  const processedContent = await remark().use(html).process(markdownContent);
  const content = processedContent.toString();

  return {
    props: {
      frontmatter,
      content,
    },
  };
}

