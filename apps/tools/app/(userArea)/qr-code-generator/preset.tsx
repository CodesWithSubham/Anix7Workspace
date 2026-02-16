import type { IProps as QrProps } from "react-qrcode-logo";
import type { contentTab, DesignTab } from "./types";

export const frameIcons = [
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

export const shape: { type: NonNullable<QrProps["qrStyle"]>; svg: React.ReactNode }[] = [
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

export const eyes: {
  inner: { svg: React.ReactNode; style: NonNullable<QrProps["eyeRadius"]> }[];
  outer: { svg: React.ReactNode; style: NonNullable<QrProps["eyeRadius"]> }[];
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

export const designTabs: DesignTab[] = ["Frame", "Style", "Logo", "Advance"];

// The logo image. It can be a url/path or a base64 value
export const defaultLogos = [
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
export const allContent: contentTab[] = ["URL", "Text", "Email", "Wifi", "Image", "Video"];
