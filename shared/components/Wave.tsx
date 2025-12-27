export default function Wave() {
  return (
    <div className=" fixed bottom-0 w-full -z-10">
      <div className="relative">
        <svg
          className=" absolute bottom-0 w-full h-16 min-h-24 max-h-40"
          preserveAspectRatio="none"
          shapeRendering="auto"
          viewBox="0 24 150 28"
        >
          <defs>
            <path
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              id="wave-bg"
            />
          </defs>
          <g className="fill-theme-150 dark:*:fill-neutral-700 *:w-full">
            <use
              x="48"
              y="0"
              xlinkHref="#wave-bg"
              className="opacity-70"
              style={{
                animation:
                  "waveMove 7s cubic-bezier(0.55, 0.5, 0.45, 0.5) -2s infinite",
              }}
            />
            <use
              x="48"
              y="3"
              xlinkHref="#wave-bg"
              className="opacity-50"
              style={{
                animation:
                  "waveMove 10s cubic-bezier(0.55, 0.5, 0.45, 0.5) -3s infinite",
              }}
            />
            <use
              x="48"
              y="5"
              xlinkHref="#wave-bg"
              className="opacity-30"
              style={{
                animation:
                  "waveMove 13s cubic-bezier(0.55, 0.5, 0.45, 0.5) -4s infinite",
              }}
            />
            <use
              x="48"
              y="7"
              xlinkHref="#wave-bg"
              className="opacity-100"
              style={{
                animation:
                  "waveMove 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) -5s infinite",
              }}
            />
          </g>
        </svg>
        <style>
          {`
          @keyframes waveMove {
            0% {
              transform: translate3d(-90px, 0, 0);
            }
            100% {
              transform: translate3d(85px, 0, 0);
            }
          }
          `}
        </style>
      </div>
      <div className="relative bg-theme-150 h-32 md:h-36 dark:bg-neutral-700"></div>
    </div>
  );
}
