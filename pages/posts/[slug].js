import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  const paths = files.map(filename => ({
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
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontMatter: data,
      content,
    },
  };
}

export default function PostPage({ frontMatter, content }) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
