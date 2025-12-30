import Image from "next/image";
import Link from "next/link";

export type SafeImages = {
  sno: number;
  thumbnailUrl: string;
  width: number;
  height: number;
  title: string;
};

function reorder<T>(items: T[]) {
  const half = Math.ceil(items.length / 2);
  const result: T[] = [];

  for (let i = 0; i < half; i++) {
    if (items[i]) result.push(items[i]);
    if (items[i + half]) result.push(items[i + half]);
  }

  return result;
}

export default function ImageGrid({ images }: { images: SafeImages[] }) {
  const orderedImages = reorder(images);

  return (
    <div className="columns-1 min-[320px]:columns-2 sm:columns-3 lg:columns-4 gap-x-4 gap-y-4">
      {orderedImages.map(({ sno, thumbnailUrl, width, height, title }, index) => (
        <Link
          key={sno}
          href={`/i/${sno}`}
          className="block mb-4 break-inside-avoid rounded-xl overflow-hidden"
        >
          <Image
            src={thumbnailUrl}
            unoptimized
            width={320}
            height={Math.round(320 * ((height || 320) / (width || 320)))}
            alt={title}
            className="w-full h-auto object-cover rounded-lg"
            loading={index < 8 ? "eager" : "lazy"}
          />

          {/* Hidden tags for seo */}
          <p className="hidden">{title}</p>
        </Link>
      ))}
    </div>
  );
}
