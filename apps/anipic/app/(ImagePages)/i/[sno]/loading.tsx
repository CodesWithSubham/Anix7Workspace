import ImageContent from "@shared/components/loader/ImageContent";

export default function Loading() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <ImageContent className="w-full h-full" uniqueKey="image-unique-key-loading" />
    </div>
  );
}
