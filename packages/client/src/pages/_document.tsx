import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="business">
      <Head></Head>
      <body className="scroll-smooth">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
