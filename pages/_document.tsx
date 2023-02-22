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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// styled-components와 tailwind함께 사용 + SSR방식인 경우 필요
// import Document, {
//     Html,
//     Head,
//     Main,
//     NextScript,
//     DocumentContext,
// } from "next/document";
// import { ServerStyleSheet } from "styled-components";
// import Layout from "@/components/layout/Layout";

// class MyDocument extends Document {
//     static async getInitialProps(ctx: DocumentContext) {
//         const sheet = new ServerStyleSheet();
//         const originalRenderPage = ctx.renderPage;
//         try {
//             ctx.renderPage = () =>
//                 originalRenderPage({
//                     enhanceApp: (App) => (props) =>
//                         sheet.collectStyles(<App {...props} />),
//                 });

//             const initialProps = await Document.getInitialProps(ctx);
//             return {
//                 ...initialProps,
//                 styles: (
//                     <>
//                         {initialProps.styles}
//                         {sheet.getStyleElement()}
//                     </>
//                 ),
//             };
//         } finally {
//             sheet.seal();
//         }
//     }

//     render() {
//         return (
//             <Html>
//                 <Head />
//                 <body>
//                     <Layout>
//                         <Main />
//                         <NextScript />
//                     </Layout>
//                 </body>
//             </Html>
//         );
//     }
// }

// export default MyDocument;
