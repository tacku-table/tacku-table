import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" href="data:;base64,iVBORw0KGgo="></link>
      <link
        rel="stylesheet"
        as="style"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
      />
      <script defer src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
