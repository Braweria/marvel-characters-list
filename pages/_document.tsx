import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { MetaTags } from "../components/seo/MetaTags";

const favicon = "";
const language = "de";

export default function CustomDocument(): JSX.Element {
  return (
    <Html lang={language}>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href={favicon} />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <MetaTags meta={{ author: "Wiktoria Mielcarek", type: "website" }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

CustomDocument.getInitialProps = NextDocument.getInitialProps;
