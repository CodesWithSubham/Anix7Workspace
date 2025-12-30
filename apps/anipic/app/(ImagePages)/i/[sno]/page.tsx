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
      <p className="hidden">{img.title}</p>
      <p className="hidden">{img.description}</p>

      <Image
        src={img.displayUrl}
        unoptimized
        alt={`AniPic ${img.sno}`}
        width={800}
        height={600}
        className="object-contain w-full md:max-w-md h-full rounded-2xl"
      />

      <div className="flex-1">
        <div className="flex gap-2 mx-4">
          {/* <LikeButton /> */}
          <div className="flex items-center gap-2">
            <DownloadButton sno={img.sno} />
            {/* <TotalDownloads sno={img.sno} /> */}
          </div>
        </div>
        <div className="mt-4">
          {/* <p className="text-gray-400 text-xs mt-2">Downloads: {img.downloads}</p> */}

          {img.tags.length > 0 && (
            <p className="mt-2 text-gray-700 flex flex-wrap items-center gap-1">
              Tags:
              {img.tags.map((tag, i) => (
                <span key={`${tag}-${i}`} className="border px-1 border-theme-250 rounded">
                  {capitalize(tag)}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// function TotalDownloads({ sno }: { sno: number }) {
//   return <span>0</span>;
// }
