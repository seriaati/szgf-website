import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const PageMeta = ({
  title,
  description,
  path = "",
  image,
}: PageMetaProps) => {
  const baseUrl = "https://szgf.seria.moe";
  const fullUrl = `${baseUrl}${path}`;
  const defaultImage = `${baseUrl}/og-image.png`; // You can add a default OG image

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      {(image || defaultImage) && (
        <meta property="og:image" content={image || defaultImage} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {(image || defaultImage) && (
        <meta name="twitter:image" content={image || defaultImage} />
      )}
    </Helmet>
  );
};

export default PageMeta;
