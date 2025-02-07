import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sogeo:wght@400&display=swap" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
