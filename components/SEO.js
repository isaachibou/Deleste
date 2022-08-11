import Head from 'next/head';
import favicon from '../public/favicon.svg';

export default function SEO({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
    </Head>
  );
}
