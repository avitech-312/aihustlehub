import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

export default function Post({ frontmatter, content }) {
  return (
    <main>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'))
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.md', '') }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'posts', slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  return { props: { frontmatter, content } }
}

