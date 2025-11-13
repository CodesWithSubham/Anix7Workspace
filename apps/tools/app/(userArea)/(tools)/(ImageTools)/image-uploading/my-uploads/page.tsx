import { Button } from "@shared/components/ui/Button";
import MyImages from "./myImages";
import { TiArrowBackOutline } from "react-icons/ti";

export default async function MyImg() {
  return (
    <>
      <Button href="/image-uploading">
        <TiArrowBackOutline />
        Back to Image Upload
      </Button>
      <MyImages />
    </>
  );
}
