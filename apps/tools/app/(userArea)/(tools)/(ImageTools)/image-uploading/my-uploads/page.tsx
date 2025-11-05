import { Button } from "@shared/components/ui/Button";
import MyImages from "./myImages";
import { ShareLeftSvg } from "@shared/components/svg/ShareSvg";

export default async function MyImg() {
  return (
    <>
      <Button href="/image-uploading">
        <ShareLeftSvg />
        Back to Image Upload
      </Button>
      <MyImages />
    </>
  );
}
