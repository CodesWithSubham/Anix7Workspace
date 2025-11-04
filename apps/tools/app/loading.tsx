import Article from "@shared/components/loader/Article";

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Article className="w-full h-full" uniqueKey="root-loader" />
    </div>
  );
}
