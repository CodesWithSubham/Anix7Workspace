import { notFound } from "next/navigation";
import type { Metadata } from "next";
import getAniPicModel from "@/lib/db/models/AniPic";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { DownloadButton } from "./ImageClientAction";
import { buildSeoDescription, buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";
import { capitalize } from "@/utils/capitalize";

type Props = { params: Promise<{ sno: string }> };

async function getImage(sno: number) {
  "use cache";
  cacheLife("days");
  cacheTag(`image:${sno}`);

  const AniPic = await getAniPicModel();
  const imgObj = await AniPic.findOne({ sno, approved: true }).lean();

  if (!imgObj) return null;

  const img = {
    sno: imgObj.sno,
    originalUrl: imgObj.originalUrl,
    displayUrl: imgObj.displayUrl,
    thumbnailUrl: imgObj.thumbnailUrl,
    width: imgObj.width,
    height: imgObj.height,
    tags: imgObj.tags,
    title: buildSeoTitle(imgObj.tags),
    description: buildSeoDescription(imgObj.tags),
    downloads: imgObj.downloads,
  };

  return img;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sno } = await params; // ✅ unwrap
  const img = await getImage(Number(sno));

  if (!img) {
    return { title: "Image Not Found", robots: { index: false, follow: false } };
  }

  const canonical = `/i/${img.sno}`;

  return {
    title: img.title,
    description: img.description,
    keywords: img.tags,

    alternates: { canonical },

    openGraph: {
      title: img.title,
      description: img.description,
      url: canonical,
      siteName: "AniPic",
      type: "article",
      images: [
        {
          url: img.thumbnailUrl,
          width: img.width,
          height: img.height,
          alt: img.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: img.title,
      description: img.description,
      images: [img.displayUrl],
    },
  };
}

export default async function ImagePageInner({ params }: Props) {
  const { sno } = await params;
  const img = await getImage(Number(sno));
  if (!img) return notFound();

  return (
    <section className="w-full flex flex-col md:flex-row gap-2 mx-auto p-4">
      {/* Hidden Title & Desc */}
      <p className="sr-only">{img.title}</p>
      <p className="sr-only">{img.description}</p>

      {/* Image Section */}
      <div className="flex-1 rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
        <Image
          src={img.displayUrl}
          unoptimized
          alt={img.title}
          width={512}
          height={Math.round(512 * ((img.height || 512) / (img.width || 512)))}
          className="w-full max-h-[70vh] object-contain"
        />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 max-md:mx-4">
          <DownloadButton sno={img.sno} />
        </div>

        {/* Tags Section */}
        {img.tags.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Tags</p>

            <div className="flex flex-wrap gap-2">
              {img.tags.map((tag, i) => (
                <span
                  key={`${tag.split(" ").join("")}-${i}`}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-neutral-700 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  {capitalize(tag)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// function TotalDownloads({ sno }: { sno: number }) {
//   return <span>0</span>;
// }
