import { NotFoundAnimatedSvg } from "@shared/components/NotFoundSvg";
import { Button } from "@shared/components/ui/Button";

export default function NotFound() {
  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <div className="w-full flex flex-col  items-center justify-center gap-8">
        <h1 className="text-5xl font-extrabold font-serif">URL Not found!</h1>

        <NotFoundAnimatedSvg />

        <p className="mt-1">The URL you were looking for could not be found</p>
        <Button href="/">Go back to Home</Button>
      </div>
    </div>
  );
}
