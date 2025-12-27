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
import { useSearchParams } from "next/navigation";
import { JSX, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IProps, QRCode } from "react-qrcode-logo";
import type {
  contentTab,
  DesignTab,
  InnerOuterEyeColor,
  InnerOuterRadii,
  QrData,
  QrFrame,
} from "./types";

// ==================================================
// =================== Presets ======================
// ==================================================
const frameIcons = [
  <svg key={0} strokeWidth="0" viewBox="0 0 16 16" className="p-2">
    <path
      stroke="none"
      d="M15.9 12.9 11 8l4.9-4.9v-.7L13.6.1a.5.5 0 0 0-.7 0L8 5 3.1.1h-.7L.1 2.4a.5.5 0 0 0 0 .7L5 8 .1 12.9v.7l2.3 2.3a.5.5 0 0 0 .7 0L8 11l4.9 4.9h.7l2.3-2.3a.5.5 0 0 0 0-.7z"
      fill="#000000"
    />
  </svg>,
  <svg key={1} viewBox="0 0 50 59">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        fillRule="nonzero"
        d="M47.3 0H2.7A2.8 2.8 0 0 0 0 2.7v52.7c0 1.7 1.3 3 2.7 3h44.4c1.4 0 2.7-1.3 2.7-2.8V2.7c.2-1.5-1-2.7-2.5-2.7Zm.6 45.8c0 1.3-1 2.1-2 2.1H4.1A2 2 0 0 1 2 46V4.1C2 2.9 3 2 4 2h41.7C47.1 2 48 3 48 4v41.7Z"
      />
      <path
        fill="#96949B"
        fillRule="nonzero"
        d="M6 18.7h12.7V6H6v12.7ZM8.1 8h8.5v8.5H8V8Zm2.1 2.1h4.2v4.2h-4.2v-4.2Zm21.1 8.5H44V6H31.3v12.7ZM33.4 8H42v8.5h-8.5V8Zm2.2 2.1h4.2v4.2h-4.2v-4.2ZM6 44h12.7V31.3H6V44Zm2.1-10.6h8.5V42H8v-8.5Zm2.1 2.2h4.2v4.2h-4.2v-4.2ZM42 39.8H44V44h-4.2v-6.3h2v2Zm0-6.4H44v2.2h-2.1v-2.2Zm0-2v2h-2.1v-2h2Zm-21.1 4.2h2V44h-2v-8.4Zm-8.5-14.8V25H8.1v-2.1H6v-2.1h6.3Zm8.5-6.4h2v2.2h-2v-2.2ZM27 8.1v4.2H25V6h4.2v2.1h-2Zm-6.3 0h2v2.1h-2v-2Zm21 16.9H44v4.2h-4.2v-2h2V25Zm-2-4.2v2h-4.2v4.3h-4.3V25h2.1v-4.2h6.4ZM25 29.2h-2.1v-2h-2.1V25H25v4.2Zm12.7 4.2h2v2.2h-2v-2.2ZM41.9 23V25h-2.1v-2.1h2Zm-19 6.3v2.1h-2.1v-2h2Zm12.7 10.6h2V44h-4.2v-4.2h2.2Zm-6.4 0h2.1v2h-2V44H25v-2.1h2.1v-2.1h2.1Zm0-2.1v-2.1h4.2v2h-4.2Zm0-10.6h2.1v6.3h-2v2.2H27v2H25v-4.2h-2.1v-2h6.3v-2.2h-2v-2h2Zm-19 0v2.1h-2v-2h2Zm25.4 8.5h-2.2v-2.2h2.2v2.2Zm2-4.3h-4.2v-2h4.3v2Zm-21-10.5h2v2h-2V25h2v4.2h-2v-2h-2.2v2h-2V25h2v-4.2h2.2Zm6.3 0v-4.2h6.3v6.3H25v-2.1h2.1v-2.1H25v2h-2.1Zm0-8.5H25v2.1h-2.1v-2Zm-2.1 8.5h2v2h-2v-2Zm6.3-6.4v-2h2.1v2h-2Z"
      />
      <path d="M0 0h50v50H0z" />
    </g>
  </svg>,
  <svg key={2} viewBox="0 0 38 44">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        fillRule="nonzero"
        d="M2 43.8h33.3c1.1 0 2-1 2-2l.2-39.6c0-1.1-1-2-2-2L2.2 0c-1 0-2 1-2.2 2v39.6c-.1 1.2.8 2.1 2 2.1ZM1.6 9.4c0-1 .8-1.6 1.5-1.6h31.3c1 0 1.6.8 1.6 1.6v31.2c0 1-.8 1.6-1.6 1.6H3c-.9 0-1.5-.8-1.5-1.6V9.4Z"
      />
      <path
        fill="#96949B"
        fillRule="nonzero"
        d="M5 21h9v-9H5v9Zm1.5-7.5h6v6h-6v-6ZM8 15h3v3H8v-3Zm15 6h9v-9h-9v9Zm1.5-7.5h6v6h-6v-6ZM26 15h3v3h-3v-3ZM5 39h9v-9H5v9Zm1.5-7.5h6v6h-6v-6ZM8 33h3v3H8v-3Zm22.5 3H32v3h-3v-4.5h1.5V36Zm0-4.5H32V33h-1.5v-1.5Zm0-1.5v1.5H29V30h1.5Zm-15 3H17v6h-1.5v-6Zm-6-10.5v3h-3V24H5v-1.5h4.5Zm6-4.5H17v1.5h-1.5V18Zm4.5-4.5v3h-1.5V12h3v1.5H20Zm-4.5 0H17V15h-1.5v-1.5Zm15 12H32v3h-3V27h1.5v-1.5Zm-1.5-3V24h-3v3h-3v-1.5h1.5v-3H29Zm-10.5 6H17V27h-1.5v-1.5h3v3Zm9 3H29V33h-1.5v-1.5Zm3-7.5v1.5H29V24h1.5ZM17 28.5V30h-1.5v-1.5H17Zm9 7.5h1.5v3h-3v-3H26Zm-4.5 0H23v1.5h-1.5V39h-3v-1.5H20V36h1.5Zm0-1.5V33h3v1.5h-3Zm0-7.5H23v4.5h-1.5V33H20v1.5h-1.5v-3H17V30h4.5v-1.5H20V27h1.5ZM8 27v1.5H6.5V27H8Zm18 6h-1.5v-1.5H26V33Zm1.5-3h-3v-1.5h3V30Zm-15-7.5H14V24h-1.5v1.5H14v3h-1.5V27H11v1.5H9.5v-3H11v-3h1.5Zm4.5 0v-3h4.5V24h-3v-1.5H20V21h-1.5v1.5H17Zm0-6h1.5V18H17v-1.5Zm-1.5 6H17V24h-1.5v-1.5ZM20 18v-1.5h1.5V18H20Z"
      />
      <path d="M1 8h35v35H1z" />
    </g>
  </svg>,
  <svg key={3} viewBox="0 0 38 47">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        fillRule="nonzero"
        d="M2 37.5h33.3c1.1 0 2-1 2-2V2.2C37.5.9 36.6 0 35.5 0H2C1 0 0 1 0 2v33.3c0 1.3 1 2.2 2 2.2ZM1.6 3.1c0-1 .7-1.5 1.5-1.5h31.3c1 0 1.5.7 1.5 1.5v31.3c0 1-.7 1.5-1.5 1.5H3c-1 0-1.5-.7-1.5-1.5V3Z"
      />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M1.6 46.9h34.3c.8 0 1.6-.6 1.6-1.6v-4.7c0-.8-.6-1.5-1.6-1.5H20.3l-1.6-1.6-1.5 1.6H1.6c-.8 0-1.6.6-1.6 1.5v4.7c0 1 .6 1.6 1.6 1.6Z"
      />
      <path
        fill="#96949B"
        fillRule="nonzero"
        d="M5 14h9V5H5v9Zm1.5-7.5h6v6h-6v-6ZM8 8h3v3H8V8Zm15 6h9V5h-9v9Zm1.5-7.5h6v6h-6v-6ZM26 8h3v3h-3V8ZM5 32h9v-9H5v9Zm1.5-7.5h6v6h-6v-6ZM8 26h3v3H8v-3Zm22.5 3H32v3h-3v-4.5h1.5V29Zm0-4.5H32V26h-1.5v-1.5Zm0-1.5v1.5H29V23h1.5Zm-15 3H17v6h-1.5v-6Zm-6-10.5v3h-3V17H5v-1.5h4.5Zm6-4.5H17v1.5h-1.5V11ZM20 6.5v3h-1.5V5h3v1.5H20Zm-4.5 0H17V8h-1.5V6.5Zm15 12H32v3h-3V20h1.5v-1.5Zm-1.5-3V17h-3v3h-3v-1.5h1.5v-3H29Zm-10.5 6H17V20h-1.5v-1.5h3v3Zm9 3H29V26h-1.5v-1.5Zm3-7.5v1.5H29V17h1.5ZM17 21.5V23h-1.5v-1.5H17Zm9 7.5h1.5v3h-3v-3H26Zm-4.5 0H23v1.5h-1.5V32h-3v-1.5H20V29h1.5Zm0-1.5V26h3v1.5h-3Zm0-7.5H23v4.5h-1.5V26H20v1.5h-1.5v-3H17V23h4.5v-1.5H20V20h1.5ZM8 20v1.5H6.5V20H8Zm18 6h-1.5v-1.5H26V26Zm1.5-3h-3v-1.5h3V23Zm-15-7.5H14V17h-1.5v1.5H14v3h-1.5V20H11v1.5H9.5v-3H11v-3h1.5Zm4.5 0v-3h4.5V17h-3v-1.5H20V14h-1.5v1.5H17Zm0-6h1.5V11H17V9.5Zm-1.5 6H17V17h-1.5v-1.5ZM20 11V9.5h1.5V11H20Z"
      />
      <path d="M1 1h35v35H1z" />
    </g>
  </svg>,
  <svg key={4} viewBox="0 0 38 47">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        fillRule="nonzero"
        d="M35.5 9.4H2c-1 0-2 1-2 2v33.3c0 1.2 1 2.2 2 2.2h33.3c1.1 0 2-1 2-2V11.5c.2-1.3-.7-2.2-1.8-2.2Zm.4 34.4c0 .9-.7 1.5-1.5 1.5H3c-1 0-1.5-.8-1.5-1.5V12.4c0-1 .7-1.6 1.5-1.6h31.3c1 0 1.5.8 1.5 1.6v31.3Z"
      />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M36 0H1.5C.6 0 0 .6 0 1.6v4.7c0 .7.6 1.5 1.6 1.5h15.6l1.6 1.6 1.5-1.6H36c.8 0 1.6-.6 1.6-1.5V1.5c0-1-.6-1.6-1.6-1.6Z"
      />
      <path
        fill="#96949B"
        fillRule="nonzero"
        d="M5 24h9v-9H5v9Zm1.5-7.5h6v6h-6v-6ZM8 18h3v3H8v-3Zm15 6h9v-9h-9v9Zm1.5-7.5h6v6h-6v-6ZM26 18h3v3h-3v-3ZM5 42h9v-9H5v9Zm1.5-7.5h6v6h-6v-6ZM8 36h3v3H8v-3Zm22.5 3H32v3h-3v-4.5h1.5V39Zm0-4.5H32V36h-1.5v-1.5Zm0-1.5v1.5H29V33h1.5Zm-15 3H17v6h-1.5v-6Zm-6-10.5v3h-3V27H5v-1.5h4.5Zm6-4.5H17v1.5h-1.5V21Zm4.5-4.5v3h-1.5V15h3v1.5H20Zm-4.5 0H17V18h-1.5v-1.5Zm15 12H32v3h-3V30h1.5v-1.5Zm-1.5-3V27h-3v3h-3v-1.5h1.5v-3H29Zm-10.5 6H17V30h-1.5v-1.5h3v3Zm9 3H29V36h-1.5v-1.5Zm3-7.5v1.5H29V27h1.5ZM17 31.5V33h-1.5v-1.5H17Zm9 7.5h1.5v3h-3v-3H26Zm-4.5 0H23v1.5h-1.5V42h-3v-1.5H20V39h1.5Zm0-1.5V36h3v1.5h-3Zm0-7.5H23v4.5h-1.5V36H20v1.5h-1.5v-3H17V33h4.5v-1.5H20V30h1.5ZM8 30v1.5H6.5V30H8Zm18 6h-1.5v-1.5H26V36Zm1.5-3h-3v-1.5h3V33Zm-15-7.5H14V27h-1.5v1.5H14v3h-1.5V30H11v1.5H9.5v-3H11v-3h1.5Zm4.5 0v-3h4.5V27h-3v-1.5H20V24h-1.5v1.5H17Zm0-6h1.5V21H17v-1.5Zm-1.5 6H17V27h-1.5v-1.5ZM20 21v-1.5h1.5V21H20Z"
      />
      <path d="M1 11h35v35H1z" />
    </g>
  </svg>,
  <svg key={5} viewBox="0 0 24 38">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#000"
        fillRule="nonzero"
        d="M20.3 0H2.8A2.8 2.8 0 0 0 0 2.8v31.9c0 1.5 1.3 2.8 2.8 2.8h17.4c1.5 0 2.8-1.3 2.8-2.8V2.8C23 1.3 21.9 0 20.3 0Zm-10 3.6h4.2c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-4.2A.3.3 0 0 1 10 4l.3-.3Zm-1.7 0c.2 0 .3.1.3.3 0 .2-.2.3-.3.3a.3.3 0 0 1-.3-.3c0-.1.1-.3.3-.3Zm13.9 26H.6V7.9h21.9v21.9Z"
      />
      <path
        fill="#96949B"
        fillRule="nonzero"
        d="M3 16h5.7v-6H3v6Zm1-5h3.7v4H4v-4Zm.9 1h1.9v2h-2v-2Zm9.4 4H20v-6h-5.7v6Zm1-5H19v4h-3.8v-4Zm1 1H18v2h-1.9v-2ZM3 28h5.7v-6H3v6Zm1-5h3.7v4H4v-4Zm.9 1h1.9v2h-2v-2ZM19 26h.9v2H18v-3h1v1Zm0-3h.9v1h-1v-1Zm0-1v1h-1v-1h1Zm-9.5 2h1v4h-1v-4Zm-3.8-7v2H4v-1H3v-1h2.8Zm3.8-3h1v1h-1v-1Zm2.8-3v2h-.9v-3h1.9v1h-1Zm-2.8 0h1v1h-1v-1Zm9.5 8h.9v2H18v-1h1v-1Zm-1-2v1h-1.9v2h-1.9v-1h1v-2H18Zm-6.6 4h-1v-1h-.9v-1h1.9v2Zm5.7 2h1v1h-1v-1Zm1.9-5v1h-1v-1h1Zm-8.5 3v1h-1v-1h1Zm5.6 5h1v2h-2v-2h1Zm-2.8 0h1v1h-1v1h-1.9v-1h1v-1h.9Zm0-1v-1h1.9v1h-2Zm0-5h1v3h-1v1h-1v1h-.9v-2h-1v-1h2.9v-1h-1v-1h1Zm-8.5 0v1h-1v-1h1Zm11.3 4h-1v-1h1v1Zm1-2h-2v-1h2v1Zm-9.5-5h1v1h-1v1h1v2h-1v-1h-1v1h-.9v-2h1v-2h1Zm2.9 0v-2h2.8v3h-1.9v-1h1v-1h-1v1h-1Zm0-4h.9v1h-1v-1Zm-1 4h1v1h-1v-1Zm2.8-3v-1h1v1h-1Z"
      />
      <path d="M0 7h23v23H0z" />
    </g>
  </svg>,
];
const shape: { type: NonNullable<IProps["qrStyle"]>; svg: JSX.Element }[] = [
  // squares | dots | fluid
  {
    type: "squares",
    svg: (
      <svg viewBox="0 0 6 6">
        <path
          d="M5 1h1V0H4v1H3V0H0v2h1V1h2v1H2v1H0v3h2-1V4h1v1h1v1h3-1V5h1V4H5v1H3V3h1v1h1V3h1V2H5V1zm0 2H4V2h1v1z"
          fill="#000000"
        />
      </svg>
    ),
  },
  // ... other shapes
  {
    type: "fluid",
    svg: (
      <svg viewBox="0 0 6 6">
        <path
          d="M2.5 3c.3 0 .5-.2.5-.5V2h1.5c.3 0 .5-.2.5-.5S4.8 1 4.5 1H4V0H2v2.5c0 .3.2.5.5.5zM4 1zM5.5 3c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zM.5 1C.8 1 1 .8 1 .5V0H0v.5c0 .3.2.5.5.5z"
          fill="#000000"
        />
        <path
          d="M4 4H3c-.6 0-1 .4-1 1H1V2.5C1 2.2.8 2 .5 2s-.5.2-.5.5V5c0 .6.4 1 1 1h2V5h1v1h1V5c0-.6-.4-1-1-1z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    type: "dots",
    svg: (
      <svg viewBox="0 0 6 6" className="dark:*:fill-black">
        <circle cx=".5" cy=".5" r=".5" />
        <circle cx="1.5" cy=".5" r=".5" />
        <circle cx="3.5" cy=".5" r=".5" />
        <circle cx="4.5" cy=".5" r=".5" />
        <circle cx=".5" cy="1.5" r=".5" />
        <circle cx="4.5" cy="1.5" r=".5" />
        <circle cx="5.5" cy="1.5" r=".5" />
        <circle cx=".5" cy="2.5" r=".5" />
        <circle cx="1.5" cy="2.5" r=".5" />
        <circle cx=".5" cy="3.5" r=".5" />
        <circle cx="1.5" cy="3.5" r=".5" />
        <circle cx="4.5" cy="3.5" r=".5" />
        <circle cx="5.5" cy="3.5" r=".5" />
        <circle cx="2.5" cy="4.5" r=".5" />
        <circle cx="1.5" cy="5.5" r=".5" />
        <circle cx="3.5" cy="5.5" r=".5" />
        <circle cx="5.5" cy="5.5" r=".5" />
      </svg>
    ),
  },
];

const eyes: {
  inner: { svg: JSX.Element; style: NonNullable<IProps["eyeRadius"]> }[];
  outer: { svg: JSX.Element; style: NonNullable<IProps["eyeRadius"]> }[];
} = {
  inner: [
    {
      svg: (
        <svg viewBox="0 0 6 6">
          <path d="M0 0h6v6H0z" fill="#000000" />
        </svg>
      ),
      style: [0, 0, 0],
    },
    {
      svg: (
        <svg viewBox="0 0 6 6">
          <path
            d="M6 1.7v2.7C6 5.2 5.2 6 4.3 6H1.7C.7 6 0 5.3 0 4.3V1.7C0 .8.8 0 1.7 0h2.7C5.3 0 6 .7 6 1.7z"
            fill="#000000"
          />
        </svg>
      ),
      style: [10, 10, 10],
    },
    {
      svg: (
        <svg viewBox="0 0 7 7">
          <circle cx="3.5" cy="3.5" r="3" fill="#000000" />
        </svg>
      ),
      style: [100, 100, 100],
    },
    {
      svg: (
        <svg viewBox="0 0 6 6">
          <path fill="#000000" d="M3 6a3 3 0 0 1-3-3V0h3a3 3 0 0 1 3 3 3 3 0 0 1-3 3z" />
        </svg>
      ),
      style: [
        [0, 100, 100, 100],
        [100, 0, 100, 100],
        [100, 100, 100, 0],
      ],
    },
  ],
  outer: [
    {
      svg: (
        <svg viewBox="0 0 14 14">
          <path d="M0 0v14h14V0H0zm12 12H2V2h10v10z" fill="#000000" />
        </svg>
      ),
      style: [0, 0, 0],
    },
    {
      svg: (
        <svg viewBox="0 0 14 14">
          <path
            d="M4.5 14h5.1C12 14 14 12 14 9.6V4.5C14 2 12 0 9.5 0H4.4C2 0 0 2 0 4.4v5.1C0 12 2 14 4.5 14zM12 4.8v4.4c0 1.5-1.3 2.8-2.8 2.8H4.8A2.7 2.7 0 0 1 2 9.2V4.8C2 3.3 3.3 2 4.8 2h4.4C10.8 2 12 3.2 12 4.8z"
            fill="#000000"
          />
        </svg>
      ),
      style: [50, 50, 50],
    },
    {
      svg: (
        <svg viewBox="0 0 14 14">
          <path
            d="M0 7a7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7 7 7 0 0 0-7 7zm7 5a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5z"
            fill="#000000"
          />
        </svg>
      ),
      style: [999, 999, 999],
    },
    {
      svg: (
        <svg viewBox="0 0 14 14">
          <path
            d="M0 0v9.6C0 12 2 14 4.4 14h5.1C12 14 14 12 14 9.6V4.4C14 2 12 0 9.6 0H0zm9.2 12H4.8A2.9 2.9 0 0 1 2 9.2V2h7.2C10.7 2 12 3.3 12 4.8v4.4c0 1.5-1.3 2.8-2.8 2.8z"
            fill="#000000"
          />
        </svg>
      ),
      style: [
        [0, 50, 50, 50],
        [50, 0, 50, 50],
        [50, 50, 50, 0],
      ],
    },
    {
      svg: (
        <svg viewBox="0 0 14 14">
          <path
            d="M0 0v7a7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7H0zm7 12a5 5 0 0 1-5-5V2h5a5 5 0 0 1 5 5 5 5 0 0 1-5 5z"
            fill="#000000"
          />
        </svg>
      ),
      style: [
        [0, 999, 999, 999],
        [999, 0, 999, 999],
        [999, 999, 999, 0],
      ],
    },
  ],
};

const designTabs: DesignTab[] = ["Frame", "Style", "Logo", "Advance"];

// The logo image. It can be a url/path or a base64 value
const defaultLogos = [
  null,
  "/assets/img/link.png",
  "/assets/img/text.png",
  "/assets/img/fill.png",
  "/assets/img/email.png",
  "/assets/img/wifi.png",
  "/assets/img/vcard.png",
  "/assets/img/share2.png",
  "/assets/img/share.png",
  "/assets/img/android.png",
  "/assets/img/touch.png",
  "/assets/img/appleMusic.png",
  "/assets/img/music.png",
  "/assets/img/music2.png",
  "/assets/img/video.png",
  "/assets/img/whatsapp.png",
  "/assets/img/gallery.png",
  "/assets/img/bitcoin.png",
  "/assets/img/paypal.png",
];
const allContent: contentTab[] = ["URL", "Text", "Email", "Wifi", "Image", "Video"];

export default function QRCodeGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const downloadRef = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState(false);
  const [designTab, setDesignTab] = useState(designTabs[0]);
  const [content, setContent] = useState(allContent[0]);
  const searchParams = useSearchParams();
  // Set initial state from URL
  useLayoutEffect(() => {
    const initial = searchParams.get("content") as contentTab | null;
    const newContent = initial && allContent.includes(initial) ? initial : allContent[0];
    setContent(newContent);
  }, [searchParams]);
  // Update URL when content changes (without full reload)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("content") !== content) {
      params.set("content", content);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [content]);

  const [qrData, setQrData] = useState<QrData>({});
  // const [logo, setLogo] = useState(defaultLogos);
  const [logo] = useState(defaultLogos);

  const [qrSetting, setQrSetting] = useState<IProps>({
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

  const setEyeRadius = useCallback(
    (
      eye: "inner" | "outer",
      value: NonNullable<IProps["eyeRadius"]>,
      eyeIndex?: 0 | 1 | 2 // optional
    ) => {
      const defaultObj: InnerOuterRadii = { inner: [0, 0, 0, 0], outer: [0, 0, 0, 0] };

      // Normalize always into tuple [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii]
      const normalize = (
        val: NonNullable<IProps["eyeRadius"]>
      ): [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii] => {
        if (Array.isArray(val)) {
          // case 1: tuple-of-3
          if (val.length === 3) {
            return val.map((item) => {
              if (typeof item === "number") return { inner: item, outer: item };
              if (Array.isArray(item)) return { inner: item, outer: item };
              return item;
            }) as [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii];
          }

          // case 2: array of 4 numbers -> treat as one CornerRadii
          if (val.length === 4 && val.every((n) => typeof n === "number")) {
            return [
              { inner: val, outer: val },
              { inner: val, outer: val },
              { inner: val, outer: val },
            ];
          }
        }

        if (typeof val === "number") {
          return [
            { inner: val, outer: val },
            { inner: val, outer: val },
            { inner: val, outer: val },
          ];
        }

        // already InnerOuterRadii
        return [val as InnerOuterRadii, val as InnerOuterRadii, val as InnerOuterRadii];
      };

      setQrSetting((prev) => {
        const prevNormalized = normalize(prev.eyeRadius ?? [defaultObj, defaultObj, defaultObj]);
        const newNormalized = normalize(value);

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
            idx === eyeIndex ? { ...item, [eye]: newNormalized[eyeIndex][eye] } : item
          ) as [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii],
        };
      });
    },
    []
  );
  const setEyeColor = useCallback(
    (eye: "inner" | "outer", value: NonNullable<IProps["eyeColor"]>, eyeIndex?: 0 | 1 | 2) => {
      const defaultObj: InnerOuterEyeColor = { inner: "#000000", outer: "#000000" };

      // Normalize into tuple [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor]
      const normalize = (
        val: NonNullable<IProps["eyeColor"]>
      ): [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor] => {
        if (Array.isArray(val)) {
          // tuple-of-3
          if (val.length === 3) {
            return val.map((item) => {
              if (typeof item === "string") return { inner: item, outer: item };
              return item;
            }) as [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor];
          }
        }

        if (typeof val === "string") {
          return [
            { inner: val, outer: val },
            { inner: val, outer: val },
            { inner: val, outer: val },
          ];
        }

        // already InnerOuterEyeColor
        return [val as InnerOuterEyeColor, val as InnerOuterEyeColor, val as InnerOuterEyeColor];
      };

      setQrSetting((prev) => {
        const prevNormalized = normalize(prev.eyeColor ?? [defaultObj, defaultObj, defaultObj]);
        const newNormalized = normalize(value);

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
            idx === eyeIndex ? { ...item, [eye]: newNormalized[eyeIndex][eye] } : item
          ) as [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor],
        };
      });
    },
    []
  );

  // useEffect(() => {
  //   setQrSetting((prev) => ({
  //     ...prev,
  //     qr: { ...prev.qr, bgColor: c },
  //   }));
  // }, [eyeStyle]);

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

  useEffect(() => {
    let val = "";
    if (content === "URL" && qrData.URL?.url) {
      val = qrData.URL.url;
    } else if (content === "Text" && qrData.Text?.text) {
      val = qrData.Text.text;
    } else if (content === "Wifi" && qrData.Wifi?.name) {
      val = `WIFI:S:${qrData.Wifi?.name};T:${qrData.Wifi?.encryption ?? ""};P:${
        qrData.Wifi?.encryption && qrData.Wifi?.password ? qrData.Wifi.password : ""
      };H:${qrData.Wifi?.hidden ? "true" : "false"};;`;
    } else if (content === "Email" && qrData.Email?.email) {
      val = `mailto:${qrData.Email?.email}?subject=${encodeURIComponent(
        qrData.Email?.subject ?? ""
      )}&body=${encodeURIComponent(qrData.Email?.body ?? "")}`;
    }

    setQrSetting((prev) => ({
      ...prev,
      value: val || "https://tools.anix7.in",
    }));
  }, [qrData, content]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: boolean } }
  ) => {
    const { name, value }: { name: string; value: string | boolean } = e.target;

    setQrData((prev) => ({
      ...prev,
      [content]: { ...prev[content], [name]: value },
    }));
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
              {/* <div> */}
              <div
                ref={downloadRef}
                className="flex items-center justify-center p-1 bg-transparent"
              >
                <Frame frame={frame}>
                  <QRCode
                    style={{ height: 200, width: 200 }}
                    ref={ref}
                    // logoOnLoad={(e) => console.log("logo loaded", e)}
                    size={1000}
                    {...qrSetting}
                  />
                </Frame>
              </div>
              {/* </div> */}
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
                className={`w-full py-1.5 font-bold text-center rounded-l-[4px] transition-all duration-300 ${
                  tab ? "bg-transparent cursor-pointer" : "bg-theme-450 text-white"
                }`}
                onClick={() => setTab(() => false)}
              >
                Content
              </div>
              <div
                className={`w-full py-1.5 font-bold text-center rounded-r-[4px] transition-all duration-300 ${
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
                    onClick={() => setContent(item)}
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
