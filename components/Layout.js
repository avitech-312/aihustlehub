// components/Layout.js
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>AI Hustle Hub</title>
        <meta name="description" content="Explore AI-powered blog content and tools for online income." />
      </Head>
      <header>
        <h1>
          <Link href="/">AI Hustle Hub</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 AI Hustle Hub</p>
        <a href="https://ko-fi.com/aavi31193" target="_blank">Support me on Ko-fi</a>
      </footer>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        header {
          margin-bottom: 2rem;
          text-align: center;
        }
        footer {
          margin-top: 3rem;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
