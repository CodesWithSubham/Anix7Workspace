import { cn } from "@shared/utils/cn";

export function NotFoundAnimatedSvg({
  className = "",
  ...props
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <svg
      x="0"
      y="0"
      style={{ transformOrigin: "50px 50px 0" }}
      version="1.1"
      viewBox="0 0 100 100"
      className={cn(
        "drop-shadow-[0_35px_35px] drop-shadow-theme-500/40 w-3/5! max-w-[40vh] h-3/5! max-h-[40vh]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g style={{ transformOrigin: "50px 50px 0" }}>
        <g
          style={{
            fill: "#000",
            transformOrigin: "50px 50px 0",
          }}
        >
          <g style={{ transformOrigin: "50px 50px 0" }}>
            <g style={{ fill: "#000" }}>
              <style>{`@keyframes ld-swim-px{0%,50%,to{-webkit-transform:translate(0,0) rotate(0deg);transform:translate(0,0) rotate(0deg)}12.5%{-webkit-transform:translate(1px,-2px) rotate(3deg);transform:translate(1px,-2px) rotate(3deg)}25%{-webkit-transform:translate(0,-3px) rotate(6deg);transform:translate(0,-3px) rotate(6deg)}37.5%{-webkit-transform:translate(-1px,-2px) rotate(3deg);transform:translate(-1px,-2px) rotate(3deg)}62.5%{-webkit-transform:translate(1px,2px) rotate(-3deg);transform:translate(1px,2px) rotate(-3deg)}75%{-webkit-transform:translate(0,3px) rotate(-6deg);transform:translate(0,3px) rotate(-6deg)}87.5%{-webkit-transform:translate(-1px,2px) rotate(-3deg);transform:translate(-1px,2px) rotate(-3deg)}}@-webkit-keyframes ld-swim-px{0%,50%,to{-webkit-transform:translate(0,0) rotate(0deg);transform:translate(0,0) rotate(0deg)}12.5%{-webkit-transform:translate(1px,-2px) rotate(3deg);transform:translate(1px,-2px) rotate(3deg)}25%{-webkit-transform:translate(0,-3px) rotate(6deg);transform:translate(0,-3px) rotate(6deg)}37.5%{-webkit-transform:translate(-1px,-2px) rotate(3deg);transform:translate(-1px,-2px) rotate(3deg)}62.5%{-webkit-transform:translate(1px,2px) rotate(-3deg);transform:translate(1px,2px) rotate(-3deg)}75%{-webkit-transform:translate(0,3px) rotate(-6deg);transform:translate(0,3px) rotate(-6deg)}87.5%{-webkit-transform:translate(-1px,2px) rotate(-3deg);transform:translate(-1px,2px) rotate(-3deg)}}.st71{fill:none;stroke-width:5;stroke:#000;stroke-miterlimit:10}line{stroke-width:0}.ld.ld-swim-px{-webkit-animation:ld-swim-px 3s infinite linear;animation:ld-swim-px 3s infinite linear}`}</style>
              <g
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-1.21875s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-1.21875s",
                  animationDirection: "normal",
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="ld ld-swim-px"
                  // style="stroke-width:6;stroke-miterlimit:10;fill:#fff;stroke:#000"
                  style={{
                    strokeWidth: 6,
                    strokeMiterlimit: 10,
                    fill: "#fff",
                    stroke: "#000",
                  }}
                />
              </g>
              <g
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-1.1375s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-1.1375s",
                  animationDirection: "normal",
                }}
              >
                <path
                  d="M31.866 71.591c2.57-7.556 9.709-13 18.134-13s15.564 5.444 18.134 13"
                  className="ld ld-swim-px"
                  // style="stroke-miterlimit:10;stroke-linecap:round;fill:none;stroke-width:5;stroke:#000"
                  style={{
                    strokeMiterlimit: 10,
                    strokeLinecap: "round",
                    fill: "none",
                    strokeWidth: 5,
                    stroke: "#000",
                  }}
                />
              </g>
              <g
                className="ld ld-swim-px"
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-1.05625s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-1.05625s",
                  animationDirection: "normal",
                }}
              >
                <path
                  stroke="#000"
                  d="m27.5 32.409 12 12"
                  className="st71"
                  // style="stroke:#000"
                  style={{ stroke: "#000" }}
                />
              </g>
              <g
                className="ld ld-swim-px"
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-.975s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-.975s",
                  animationDirection: "normal",
                }}
              >
                <path
                  stroke="#000"
                  d="m27.5 44.409 12-12"
                  className="st71"
                  // style="stroke:#000"
                  style={{ stroke: "#000" }}
                />
              </g>
              <g
                className="ld ld-swim-px"
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-.89375s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-.89375s",
                  animationDirection: "normal",
                }}
              >
                <path
                  stroke="#000"
                  d="m60.5 32.409 12 12"
                  className="st71"
                  // style="stroke:#000"
                  style={{ stroke: "#000" }}
                />
              </g>
              <g
                className="ld ld-swim-px"
                // style="transform-origin:50px 50px 0;animation-duration:1.3s;animation-delay:-.8125s;animation-direction:normal"
                style={{
                  transformOrigin: "50px 50px 0",
                  animationDuration: "1.3s",
                  animationDelay: "-.8125s",
                  animationDirection: "normal",
                }}
              >
                <path
                  stroke="#000"
                  d="m60.5 44.409 12-12"
                  className="st71"
                  // style={"stroke:#000"}
                  style={{ stroke: "#000" }}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
