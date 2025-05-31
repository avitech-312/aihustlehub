import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>AI Hustle Hub</title>
        <meta name="description" content="AI-powered blogging hub" />
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>AI Hustle Hub Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {post.title} – {post.date}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
    };
  });

  return {
    props: {
      posts,
    },
  };
}


