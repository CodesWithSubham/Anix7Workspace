import { NotFoundAnimatedSvg } from "@shared/components/svg/NotFoundSvg";
import { Button } from "@shared/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <div className="w-full flex flex-col mt-5 items-center justify-center gap-8">
        <h1 className="text-5xl font-extrabold font-serif">Not found - 404!</h1>

        <NotFoundAnimatedSvg />

        <p className="mt-1">The page you were looking for could not be found</p>
        <Button href="/" className="button font-semibold mt-2">
          Go back to Home
        </Button>
      </div>
    </>
  );
}
