import getAniPicModel from "@/lib/db/models/AniPic";
import { IMAGE_LIMIT_PER_PAGE } from "@/utils/const";
import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";

const baseUrl = process.env.BASE_URL || "https://anipic.anix7.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  cacheTag("anipicImagePages");

  const AniPic = await getAniPicModel();

  // Count total approved images
  const total = await AniPic.countDocuments({ approved: true });
  const totalPages = Math.ceil(total / IMAGE_LIMIT_PER_PAGE);

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  // Generate individual pagination page URLs
  const imagePages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${normalizedBaseUrl}/page/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Include homepage at the top
  return [
    {
      url: normalizedBaseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...imagePages,
  ];
}
