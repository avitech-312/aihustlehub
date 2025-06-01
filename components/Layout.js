import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <title>AI Hustle Hub</title>
        <meta name="description" content="AI Hustle Hub: Explore AI tools, tips, and side hustles to grow your income." />
      </Head>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
        <header>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#00FFAA' }}>AI Hustle Hub</h1>
          <hr />
        </header>
        <main>{children}</main>
        <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#999' }}>
          © {new Date().getFullYear()} AI Hustle Hub. All rights reserved.
        </footer>
      </div>
    </>
  );
}

