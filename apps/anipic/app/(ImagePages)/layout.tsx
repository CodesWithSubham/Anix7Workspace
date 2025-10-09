import { ImgProvider } from "./imgProvider";

export default function ImagePagesLayout({ children }: { children: React.ReactNode }) {
  return <ImgProvider>{children}</ImgProvider>;
}
