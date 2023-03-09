import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tacku-table-v1.vercel.app/" />
      <meta property="og:title" content="타쿠의 식탁" />
      <meta property="og:image" content="/images/logo.png" />
      <meta
        property="og:description"
        content="당신만의 특별한 레시피를 보여 주세요!"
      />
      <meta property="og:site_name" content="타쿠의 식탁" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
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
