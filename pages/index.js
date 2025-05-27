import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <div>
      <h1>AI Hustle Hub Blog</h1>
      <ul>
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{frontmatter.title}</a>
            </Link>
            <p>{frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'))
  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug: filename.replace('.md', ''),
      frontmatter,
    }
  })
  return { props: { posts } }
}

