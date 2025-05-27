import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  const posts = files.map(filename => {
    const filePath = path.join(process.cwd(), 'posts', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      frontMatter: data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Welcome to AI Hustle Hub</h1>
      <ul>
        {posts.map(({ slug, frontMatter }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{frontMatter.title}</a>
            </Link>
            <p>{frontMatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

