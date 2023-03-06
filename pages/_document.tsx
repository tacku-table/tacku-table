import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta property="og:url" content="http://gocoder.tistory.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="고코더의 IT Express" />
      <meta property="og:description" content="모든 IT 정보를 " />
      <meta
        property="og:image"
        content="https://t1.daumcdn.net/cfile/tistory/234774445960F69422"
      />
      cs
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
