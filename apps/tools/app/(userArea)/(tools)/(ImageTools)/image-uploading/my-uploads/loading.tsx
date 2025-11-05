
import ImageContent from "@shared/components/loader/ImageContent";

export default function Loading() {
  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="flex items-center w-11/12">
          <ImageContent className="w-full h-full" uniqueKey={`image-loading-${index}`} />
        </div>
      ))}
    </div>
  );
}
