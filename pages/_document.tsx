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
