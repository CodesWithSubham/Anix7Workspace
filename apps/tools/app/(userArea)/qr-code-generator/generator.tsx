"use client";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import Hr from "@shared/components/ui/Hr";
import {
  Checkbox,
  ColorWithInput,
  Input,
  PasswordInput,
  Select,
  TextArea,
} from "@shared/components/ui/Input";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { type IProps as QrProps, QRCode } from "react-qrcode-logo";
import type { contentTab, InnerOuterEyeColor, InnerOuterRadii, QrData, QrFrame } from "./types";
import { allContent, defaultLogos, designTabs, eyes, frameIcons, shape } from "./preset";
import { normalizeEyeColor, normalizeEyeRadius } from "./helper";

export default function QRCodeGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const downloadRef = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState(false);
  const [designTab, setDesignTab] = useState(designTabs[0]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const content = (() => {
    const param = searchParams.get("content") as contentTab | null;
    return param && allContent.includes(param) ? param : allContent[0];
  })();

  const handleContentChange = (newContent: contentTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("content", newContent);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const [qrData, setQrData] = useState<QrData>({});
  // const [logo, setLogo] = useState(defaultLogos);
  const [logo] = useState(defaultLogos);

  const [qrSetting, setQrSetting] = useState<QrProps>({
    ecLevel: "Q",
    quietZone: 35,
    qrStyle: "squares",
    bgColor: "#ffffff",
    fgColor: "#000000",
    logoWidth: 250,
    logoHeight: 250,
    logoOpacity: 1,
    removeQrCodeBehindLogo: true,
    logoPadding: 0,
    logoPaddingStyle: "square",
    eyeRadius: [
      // top/left eye
      { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
      // top/right eye
      { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
      // bottom/left
      { outer: [0, 0, 0, 0], inner: [0, 0, 0, 0] },
    ],
    eyeColor: [
      { outer: "#000000", inner: "#000000" },
      { outer: "#000000", inner: "#000000" },
      { outer: "#000000", inner: "#000000" },
    ],
  });
  const [frame, setFrame] = useState<QrFrame>({
    type: 0,
    bg: "#000000",
    text: "SCAN ME",
    font: "Arial",
    color: "#ffffff",
  });
  const ref = useRef<QRCode>(null);
  const [eyeStyle, setEyeStyle] = useState({ inner: 0, outer: 0 });

  const setEyeRadius = (
    eye: "inner" | "outer",
    value: NonNullable<QrProps["eyeRadius"]>,
    eyeIndex?: 0 | 1 | 2, // optional
  ) => {
    const defaultObj: InnerOuterRadii = { inner: [0, 0, 0, 0], outer: [0, 0, 0, 0] };

    setQrSetting((prev) => {
      const prevNormalized = normalizeEyeRadius(
        prev.eyeRadius ?? [defaultObj, defaultObj, defaultObj],
      );
      const newNormalized = normalizeEyeRadius(value);

      if (eyeIndex === undefined) {
        return {
          ...prev,
          eyeRadius: [
            { ...prevNormalized[0], [eye]: newNormalized[0][eye] },
            { ...prevNormalized[1], [eye]: newNormalized[1][eye] },
            { ...prevNormalized[2], [eye]: newNormalized[2][eye] },
          ],
        };
      }

      return {
        ...prev,
        eyeRadius: prevNormalized.map((item, idx) =>
          idx === eyeIndex ? { ...item, [eye]: newNormalized[eyeIndex][eye] } : item,
        ) as [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii],
      };
    });
  };
  const setEyeColor = (
    eye: "inner" | "outer",
    value: NonNullable<QrProps["eyeColor"]>,
    eyeIndex?: 0 | 1 | 2,
  ) => {
    const defaultObj: InnerOuterEyeColor = { inner: "#000000", outer: "#000000" };

    setQrSetting((prev) => {
      const prevNormalized = normalizeEyeColor(
        prev.eyeColor ?? [defaultObj, defaultObj, defaultObj],
      );
      const newNormalized = normalizeEyeColor(value);

      if (eyeIndex === undefined) {
        return {
          ...prev,
          eyeColor: [
            { ...prevNormalized[0], [eye]: newNormalized[0][eye] },
            { ...prevNormalized[1], [eye]: newNormalized[1][eye] },
            { ...prevNormalized[2], [eye]: newNormalized[2][eye] },
          ],
        };
      }

      return {
        ...prev,
        eyeColor: prevNormalized.map((item, idx) =>
          idx === eyeIndex ? { ...item, [eye]: newNormalized[eyeIndex][eye] } : item,
        ) as [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor],
      };
    });
  };

  // ====================================================
  // ============  Handle QR Download ===================
  // ====================================================
  const handleDownload = useCallback(() => {
    if (downloadRef.current === null) return;
    setIsLoading(true);

    const canvasWidth = 1024;
    const canvasHeight =
      (downloadRef.current.offsetHeight / downloadRef.current.offsetWidth) * 1024;

    toPng(downloadRef.current, {
      cacheBust: true,
      canvasWidth,
      canvasHeight,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${content} - Generated QR Code - Anix7 Tools.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false); // ✅ Now correctly resets loading state
      });
  }, [downloadRef, content]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: boolean } },
  ) => {
    const { name, value }: { name: string; value: string | boolean } = e.target;

    setQrData((prev) => ({
      ...prev,
      [content]: { ...prev[content], [name]: value },
    }));
  };

  let qrValue = "https://tools.anix7.in";

  switch (content) {
    case "URL":
      if (qrData.URL?.url) {
        qrValue = qrData.URL.url;
      }
      break;

    case "Text":
      if (qrData.Text?.text) {
        qrValue = qrData.Text.text;
      }
      break;

    case "Wifi":
      if (qrData.Wifi?.name) {
        qrValue = `WIFI:S:${qrData.Wifi.name};T:${qrData.Wifi.encryption ?? ""};P:${
          qrData.Wifi.encryption && qrData.Wifi.password ? qrData.Wifi.password : ""
        };H:${qrData.Wifi.hidden ? "true" : "false"};;`;
      }
      break;

    case "Email":
      if (qrData.Email?.email) {
        qrValue = `mailto:${qrData.Email.email}?subject=${encodeURIComponent(
          qrData.Email.subject ?? "",
        )}&body=${encodeURIComponent(qrData.Email.body ?? "")}`;
      }
      break;

    default:
      break;
  }

  const qrSettingOptions: QrProps = {
    ...qrSetting,
    value: qrValue,
  };

  return (
    <>
      <WorkBox className="border p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center">QR Code Generator</h1>

        <div className="flex-1 flex flex-col md:flex-row-reverse gap-2">
          {/* Sidebar with dynamic positioning */}
          <div className="flex-1">
            <div className="w-full md:sticky md:top-20 bg-theme-150 py-4 px-6 rounded-lg flex flex-col items-center scale-75 -my-12 md:scale-100 md:my-0">
              <h1 className="text-lg font-semibold text-theme-450 mb-2">Preview QR Code</h1>

              <div
                ref={downloadRef}
                className="flex items-center justify-center p-1 bg-transparent"
              >
                <Frame frame={frame}>
                  <QRCode
                    ref={ref}
                    style={{ height: 200, width: 200 }}
                    size={1000}
                    {...qrSettingOptions}
                  />
                </Frame>
              </div>

              <Button
                className="w-full max-w-56 mt-5 py-4 md:py-2"
                loading={isLoading}
                loadingText="Downloading"
                onClick={handleDownload}
                svg={
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                  >
                    <path
                      stroke="none"
                      d="M403 217a150 150 0 0 0-280-40c-60 6-107 57-107 119 0 66 54 120 120 120h260c55 0 100-45 100-100 0-53-41-96-93-99zm-179 51v-76h64v76h68L256 368 156 268h68z"
                    />
                  </svg>
                }
              >
                Download
              </Button>
            </div>
          </div>
          {/* Scrollable Content */}
          <div className="w-full p-1 space-y-2">
            <div className="flex justify-around gap-1 p-0.5 border rounded-md md:hidden">
              <div
                className={`w-full py-1.5 font-bold text-center rounded-l-sm transition-all duration-300 ${
                  tab ? "bg-transparent cursor-pointer" : "bg-theme-450 text-white"
                }`}
                onClick={() => setTab(() => false)}
              >
                Content
              </div>
              <div
                className={`w-full py-1.5 font-bold text-center rounded-r-sm transition-all duration-300 ${
                  tab ? "bg-theme-450 text-white" : "bg-transparent cursor-pointer"
                }`}
                onClick={() => setTab(() => true)}
              >
                Design
              </div>
            </div>
            {/* Content */}
            <div className={`${tab ? "hidden" : ""} md:block`}>
              <h2 className="text-xl hidden md:block">Content:</h2>
              <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                {allContent.map((item, index) => (
                  <Button
                    key={`con-${index}`}
                    className={`flex-1 min-w-14 font-semibold mx-0 border ${
                      content == item ? "bg-theme-450 text-white" : "bg-transparent text-inherit"
                    }`}
                    onClick={() => handleContentChange(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              {/* Content */}
              <div className="mb-5">
                {content === "URL" && (
                  <>
                    <p>Enter the URL:</p>
                    <Input name="url" type="url" placeholder="https://" onChange={handleChange} />
                  </>
                )}
                {content === "Text" && (
                  <>
                    <p>Enter the Text:</p>
                    <TextArea name="text" onChange={handleChange} />
                  </>
                )}
                {content === "Wifi" && (
                  <>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="SSID"
                      label="Wifi Network Name:"
                    />
                    <Select
                      label="Encryption Type:"
                      name="encryption"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        e.target = e.currentTarget; // Fix for React 18+ event handling
                        handleChange(e);
                      }}
                      options={[
                        { value: "nopass", label: "None" },
                        { value: "WPA", label: "WPA/WPA2" },
                        { value: "WEP", label: "WEP" },
                      ]}
                    />
                    <div
                      className={`-mx-1 px-1 overflow-hidden transition-all duration-500 ${
                        qrData.Wifi?.encryption ? "max-h-28" : "max-h-0 "
                      }`}
                    >
                      <PasswordInput
                        name="password"
                        onChange={handleChange}
                        label="Wifi Password:"
                      />
                    </div>
                    <Checkbox
                      className="mt-2"
                      onChange={(e) =>
                        handleChange({
                          target: { name: "hidden", value: e.target.checked },
                        })
                      }
                      label="Hidden network"
                    />
                  </>
                )}
                {content === "Email" && (
                  <>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Email Address"
                      label="Enter Email Address:"
                    />
                    <Input
                      type="text"
                      name="subject"
                      onChange={handleChange}
                      placeholder="Subject of Email"
                      label="Enter Email Subject:"
                    />
                    <TextArea name="body" onChange={handleChange} maxLength={512} />
                  </>
                )}

                {(content == "Image" || content == "Video") && (
                  <div className="text-lg text-center">Coming Soon</div>
                )}
              </div>
            </div>
            {/* Design */}
            <div className={`${tab ? "" : "hidden"} md:block`}>
              <h2 className="text-xl hidden md:block">Design:</h2>
              {/* Design Option */}
              <div className="flex  justify-stretch gap-2">
                {designTabs.map((item, index) => (
                  <Button
                    key={`con-${index}`}
                    className={`w-full px-0.5 py-2 m-0 font-semibold rounded-t-md rounded-b-none hover:scale-100 ${
                      designTab == item ? "bg-theme-450 text-white" : "bg-transparent text-inherit"
                    }`}
                    onClick={() => setDesignTab(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="w-full border border-theme-450 p-2">
                {designTab === "Frame" && (
                  <>
                    <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                      {/* Frame Type */}
                      {frameIcons.map((item, i) => (
                        <button
                          key={`con-${i}`}
                          className={`flex-1 p-1.5 min-w-16 h-16 md:min-w-20 md:h-20 flex justify-center items-center border-[3px] font-semibold rounded-md cursor-pointer ${
                            frame.type == i ? "border-theme-450" : ""
                          } `}
                          onClick={() => setFrame((prev) => ({ ...prev, type: i }))}
                        >
                          <span className="h-full dark:bg-white dark:p-0.5 rounded-xs [&>svg]:h-full [&>svg]:w-full">
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        frame.type ? "max-h-[999px]" : "max-h-0"
                      }`}
                    >
                      <h3 className="text-lg">Frame Background:</h3>
                      <ColorWithInput
                        value={frame.bg}
                        onChange={(e) => setFrame((prev) => ({ ...prev, bg: e }))}
                      />
                      <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                        <div className=" flex-1">
                          <h3 className="text-lg">Frame Text</h3>
                          <Input
                            name="frameText"
                            value={frame.text}
                            onChange={({ target }) =>
                              setFrame((prev) => ({
                                ...prev,
                                text: target.value.slice(0, 21),
                              }))
                            }
                          />
                        </div>
                        <div className=" flex-1">
                          <h3 className="text-lg">Text Font</h3>
                          <Select
                            className="w-full"
                            style={{ fontFamily: frame.font }}
                            options={[
                              { value: "Arial, sans-serif", label: "Arial" },
                              { value: "'Courier New', monospace", label: "Courier New" },
                              { value: "'Times New Roman', serif", label: "Times New Roman" },
                              { value: "'Lucida Console', monospace", label: "Lucida Console" },
                              {
                                value: "'Lucida Sans Unicode', sans-serif",
                                label: "Lucida Sans Unicode",
                              },
                              { value: "'Palatino Linotype', serif", label: "Palatino Linotype" },
                              { value: "'Tahoma', sans-serif", label: "Tahoma" },
                              { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
                              { value: "'Verdana', sans-serif", label: "Verdana" },
                              { value: "'Impact', sans-serif", label: "Impact" },
                              {
                                value: "'Comic Sans MS', cursive, sans-serif",
                                label: "Comic Sans MS",
                              },
                            ].map((font) => ({ ...font, style: { fontFamily: font.value } }))}
                            value={frame.font}
                            onChange={(e) => {
                              const { value } = e.currentTarget;
                              setFrame((prev) => ({
                                ...prev,
                                font: value,
                                text: "SCAN ME", // Reset text when font changes
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="text-lg">Text Color:</h3>
                      <ColorWithInput
                        value={frame.color}
                        onChange={(e) => setFrame((prev) => ({ ...prev, color: e }))}
                      />
                    </div>
                  </>
                )}
                {designTab === "Style" && (
                  <>
                    <div>
                      <h3 className="text-lg">Background:</h3>
                      <ColorWithInput
                        value={qrSetting.bgColor}
                        onChange={(c) =>
                          setQrSetting((prev) => ({
                            ...prev,
                            bgColor: c ?? "#ffffff", // Default to white if no color is selected
                          }))
                        }
                      />
                    </div>
                    <Hr />
                    {/* Shape Type */}
                    <div>
                      <h3 className="text-lg mb-2">Shape: </h3>
                      <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                        {shape.map(({ type, svg }, i) => (
                          <button
                            key={`con-${i}`}
                            className={`flex-1 p-1.5 min-w-14 h-14 md:min-w-16 md:h-16 flex justify-center items-center border-[3px] font-semibold rounded-md cursor-pointer ${
                              qrSetting.qrStyle == type ? "border-theme-450" : ""
                            } `}
                            onClick={() =>
                              setQrSetting((prev) => ({
                                ...prev,
                                qrStyle: type,
                              }))
                            }
                          >
                            <span className="h-full dark:bg-white dark:p-0.5 rounded-xs [&>svg]:h-full [&>svg]:w-full">
                              {svg}
                            </span>
                          </button>
                        ))}
                      </div>
                      <ColorWithInput
                        value={qrSetting.fgColor}
                        onChange={(c) =>
                          setQrSetting((prev) => ({
                            ...prev,
                            fgColor: c, // Default to black if no color is selected
                          }))
                        }
                      />
                    </div>
                    <Hr />
                    {/* Eye Inner Type */}
                    <div>
                      <h3 className="text-lg mb-2">Corner Eye: </h3>
                      <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                        {eyes.inner.map(({ style, svg }, i) => (
                          <button
                            key={`con-${i}`}
                            className={`flex-1 p-1.5 min-w-14 h-14 md:min-w-16 md:h-16 flex justify-center items-center border-[3px] font-semibold rounded-md cursor-pointer ${
                              eyeStyle.inner == i ? "border-theme-450" : ""
                            } `}
                            onClick={() => {
                              setEyeStyle((p) => ({ ...p, inner: i }));
                              setEyeRadius("inner", style);
                            }}
                          >
                            <span className="h-full dark:bg-white dark:p-0.5 rounded-xs [&>svg]:h-full [&>svg]:w-full">
                              {svg}
                            </span>
                          </button>
                        ))}
                      </div>
                      <ColorWithInput
                        value={qrSetting.fgColor}
                        onChange={(c) => setEyeColor("inner", c)}
                      />
                    </div>
                    <Hr />
                    {/* Eye Outer Type */}
                    <div>
                      <h3 className="text-lg mb-2">Corner Eye: </h3>
                      <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                        {eyes.outer.map(({ style, svg }, i) => (
                          <button
                            key={`con-${i}`}
                            className={`flex-1 p-1.5 min-w-14 h-14 md:min-w-16 md:h-16 flex justify-center items-center border-[3px] font-semibold rounded-md cursor-pointer ${
                              eyeStyle.outer == i ? "border-theme-450" : ""
                            } `}
                            onClick={() => {
                              setEyeStyle((p) => ({ ...p, outer: i }));
                              setEyeRadius("outer", style);
                            }}
                          >
                            <span className="h-full dark:bg-white dark:p-0.5 rounded-xs [&>svg]:h-full [&>svg]:w-full">
                              {svg}
                            </span>
                          </button>
                        ))}
                      </div>
                      <ColorWithInput
                        value={qrSetting.fgColor}
                        onChange={(c) => setEyeColor("outer", c)}
                      />
                    </div>
                  </>
                )}
                {designTab === "Logo" && (
                  <>
                    <div className="flex flex-wrap justify-stretch gap-2 mb-5">
                      {/* Logo */}
                      {logo.map((item, i) => (
                        <button
                          key={`con-${i}`}
                          className={`flex-1 p-1.5 min-w-16 h-16 md:min-w-20 md:h-20 flex justify-center items-center border-[3px] font-semibold rounded-md cursor-pointer ${
                            qrSetting.logoImage == item ? "border-theme-450" : ""
                          } `}
                          onClick={() =>
                            setQrSetting((prev) => ({
                              ...prev,
                              logoImage: item ?? "", // Ensure item is not null
                            }))
                          }
                        >
                          {item ? (
                            <Image
                              src={item}
                              alt="Logo Image"
                              width={80}
                              height={80}
                              className="max-w-fit h-full"
                            />
                          ) : (
                            <span className="h-full dark:bg-white dark:p-0.5 rounded-xs [&>svg]:h-full [&>svg]:w-full">
                              <svg strokeWidth="0" viewBox="0 0 16 16" className="p-2">
                                <path
                                  stroke="none"
                                  d="M15.9 12.9 11 8l4.9-4.9v-.7L13.6.1a.5.5 0 0 0-.7 0L8 5 3.1.1h-.7L.1 2.4a.5.5 0 0 0 0 .7L5 8 .1 12.9v.7l2.3 2.3a.5.5 0 0 0 .7 0L8 11l4.9 4.9h.7l2.3-2.3a.5.5 0 0 0 0-.7z"
                                  fill="#000000"
                                />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <Checkbox
                      checked={qrSetting.removeQrCodeBehindLogo}
                      onChange={(e) =>
                        setQrSetting((prev) => ({
                          ...prev,
                          removeQrCodeBehindLogo: e.target.checked,
                        }))
                      }
                      label="Remove Qr Code Behind Logo"
                      className={` overflow-hidden transition-all duration-700 ${
                        qrSetting.logoImage ? "max-h-[99px]" : "max-h-0"
                      }`}
                    />
                  </>
                )}
                {designTab === "Advance" && <div className="text-center">Coming Soon</div>}
              </div>
            </div>
          </div>
        </div>
      </WorkBox>
    </>
  );
}

function Frame({ frame, children }: { frame: QrFrame; children: React.ReactNode }) {
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [childWidth, setChildWidth] = useState(200);

  const textRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [prevTextLen, setPrevTextLen] = useState(0);

  useEffect(() => {
    if (childrenRef.current) {
      setChildWidth(childrenRef.current.clientWidth);
    }
  }, [children]);

  useEffect(() => {
    if (!textRef.current || !childWidth) return;
    const textWidth = textRef.current.scrollWidth;
    console.log("textWidth", textWidth);
    const INC = 0.06; // Increment to reduce scale

    setScale((prevScale) => {
      if (textWidth > childWidth && frame.text.length > prevTextLen) {
        return Math.max(0.1, prevScale - INC); // prevent going negative
      }
      if (frame.text.length < prevTextLen) {
        return Math.min(1, prevScale + INC); // prevent exceeding 1
      }
      return prevScale; // no change
    });

    setPrevTextLen(frame.text.length);
  }, [frame.text, childWidth, prevTextLen]);

  const textBox = (
    <div
      className="flex justify-center p-1.5 rounded-md min-h-4 overflow-x-hidden no-scrollbar"
      style={{
        color: frame.color,
        width: childWidth,
        backgroundColor: frame.bg,
      }}
      ref={textRef}
    >
      <span
        className="inline-block text-xl whitespace-nowrap"
        style={{ scale, fontFamily: frame.font }}
      >
        {frame.text}
      </span>
    </div>
  );

  if (frame.type === 1)
    return (
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: frame.bg }}>
        <div
          ref={childrenRef}
          className={`rounded-md p-2 pb-0`}
          style={{ backgroundColor: frame.bg }}
        >
          {children}
        </div>
        {textBox}
      </div>
    );

  if (frame.type === 2)
    return (
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: frame.bg }}>
        {textBox}
        <div
          ref={childrenRef}
          className={`rounded-md p-2 pt-0`}
          style={{ backgroundColor: frame.bg }}
        >
          {children}
        </div>
      </div>
    );

  if (frame.type === 3)
    return (
      <div className="bg-transparent rounded-md relative z-0">
        <div
          ref={childrenRef}
          className={`rounded-md p-2 mb-3`}
          style={{ backgroundColor: frame.bg }}
        >
          {children}
        </div>
        <div
          className="absolute w-5 h-5 top-[220px] left-1/2 -translate-x-1/2 rotate-45 -z-10"
          style={{ backgroundColor: frame.bg }}
        />
        {textBox}
      </div>
    );

  if (frame.type === 4)
    return (
      <div className="bg-transparent rounded-md relative z-0">
        {textBox}
        <div
          ref={childrenRef}
          className={`rounded-md p-2 mt-3`}
          style={{ backgroundColor: frame.bg }}
        >
          {children}
        </div>
        <div
          className="absolute w-5 h-5 bottom-[220px] left-1/2 -translate-x-1/2 rotate-45 -z-10"
          style={{ backgroundColor: frame.bg }}
        />
      </div>
    );

  if (frame.type === 5)
    return (
      <div
        className="bg-transparent rounded-3xl overflow-hidden"
        style={{ backgroundColor: frame.bg }}
      >
        <div className="w-full h-14 flex justify-center items-center">
          <div className="flex gap-1">
            <div className="h-2 w-2 bg-white rounded-full" />
            <div className="h-2 w-10 bg-white rounded-full" />
          </div>
        </div>
        <div ref={childrenRef} className="rounded-md p-2" style={{ backgroundColor: frame.bg }}>
          {children}
        </div>
        <div className="w-full h-14 flex items-center">{textBox}</div>
      </div>
    );

  return <div className="p-2">{children}</div>;
}

export function LaunchQRCodeGenerator() {
  return (
    <div className="text-center mt-8">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-lg"
      >
        Launch QR Code Generator Tool
      </Button>
    </div>
  );
}
