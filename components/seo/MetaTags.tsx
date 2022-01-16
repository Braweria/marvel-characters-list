export function MetaTags({ meta, children }: MetaTagsProps): JSX.Element {
  return (
    <>
      {meta.description && (
        <>
          <meta name="description" content={meta.description} />
          <meta property="og:description" content={meta.description} />
          <meta name="twitter:description" content={meta.description} />
        </>
      )}

      {meta.keywords && (
        <meta name="keywords" content={meta.keywords.join(", ")} />
      )}

      {meta.author && <meta name="author" content="Wiktoria Mielcarek" />}
      {(meta.copyright || meta.author) && (
        <meta name="copyright" content={meta.copyright ?? meta.author} />
      )}

      {meta.url && <meta property="og:url" content={meta.url} />}

      {meta.siteName && (
        <meta property="og:site_name" content={meta.siteName} />
      )}

      {meta.type && <meta property="og:type" content={meta.type} />}

      {meta.title && (
        <>
          <meta property="og:title" content={meta.title} />
          <meta name="twitter:title" content={meta.title} />
        </>
      )}

      {meta.image && (
        <>
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:image" content={meta.image} />
        </>
      )}

      {meta.imageAlt && (
        <>
          <meta property="og:image:alt" content={meta.imageAlt} />
          <meta property="twitter:image:alt" content={meta.imageAlt} />
        </>
      )}

      {meta.twitterCard && (
        <meta name="twitter:card" content={meta.twitterCard} />
      )}

      {meta.twitterSite && (
        <meta name="twitter:site" content={meta.twitterSite} />
      )}
      {meta.twitterCreator && (
        <meta name="twitter:creator" content={meta.twitterCreator} />
      )}

      {children}
    </>
  );
}

type MetaTagsProps = {
  meta: Meta;
  children?: JSX.Element[] | JSX.Element;
};

type Meta = {
  type?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  copyright?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  siteName?: string;
  twitterCard?: "summary_large_image" | "summary" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
};
