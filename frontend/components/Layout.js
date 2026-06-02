import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children, title = 'Earrings Store' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Premium handcrafted earrings store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
