// pages/index.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({ posts }) {
  return (
    <Layout>
      <h2>Latest Posts</h2>
      <ul>
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <h3>{frontmatter.title} – {frontmatter.date}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);
    const slug = filename.replace('.md', '');

    return { slug, frontmatter };
  });

  return {
    props: {
      posts,
    },
  };
}


