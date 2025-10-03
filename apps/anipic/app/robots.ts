export default function robots() {
  return {
    rules: [
      {
        userAgent: "*", // applies to all bots
        allow: "/",
        disallow: ["/admin"], // disallow /i and /link
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
