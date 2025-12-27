import Script from "next/script";

export default function ThemeHead() {
  return (
    <Script id="theme-loader" strategy="beforeInteractive">
      {`
        (function () {
          try {
            var root = document.documentElement;

            // Get cookie helper
            function getCookie(name) {
              var match = document.cookie.match(
                new RegExp('(^| )' + name + '=([^;]+)')
              );
              return match ? decodeURIComponent(match[2]) : null;
            }

            // Set cookie helper (2 years)
            function setCookie(name, value) {
              var isLocalhost = location.hostname === "localhost";
              var baseCookie =
                name +
                '=' +
                encodeURIComponent(value) +
                '; path=/' +
                '; max-age=' +
                60 * 60 * 24 * 365 * 2;

              var domain = location.hostname.split('.').slice(-2).join('.');

              document.cookie =
                baseCookie + (isLocalhost ? '' : '; domain=' + domain);
            }

            var mode = getCookie("themeMode");
            var colorClass = getCookie("themeColor");

            var isSystem = mode === "system";

            // If cookie not found, try localStorage
            if (!mode) {
              mode = localStorage.getItem("themeMode");
              colorClass = localStorage.getItem("themeColor");
              isSystem = mode === "system";

              if (mode) setCookie("themeMode", mode);
              if (colorClass) setCookie("themeColor", colorClass);
            } else {
              localStorage.setItem("themeMode", mode);
              if (colorClass) localStorage.setItem("themeColor", colorClass);
            }

            // Default to system
            if (!mode) {
              var systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
              ).matches;

              mode = systemPrefersDark ? "dark" : "light";
              isSystem = true;

              localStorage.setItem("themeMode", "system");
              setCookie("themeMode", "system");
            }

            // If system mode, recalculate dark/light
            if (isSystem) {
              var prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
              ).matches;

              mode = prefersDark ? "dark" : "light";
            }

            root.classList.toggle("dark", mode === "dark");
            root.classList.toggle("system", isSystem);

            if (colorClass) {
              root.classList.remove(
                ...(root.className.match(/theme\\d+/g) || [])
              );
              root.classList.add(colorClass);
            }

            // Theme color meta
            var themeColorMap = [
              "#482dff",
              "#D32F2F",
              "#00796B",
              "#1565C0",
              "#FFC107",
              "#C2185B",
              "#E64A19",
              "#455A64",
              "#5D4037",
              "#7B1FA2",
              "#283593",
            ];

            var themeColor =
              mode === "dark"
                ? "#1d1d1d"
                : colorClass
                ? themeColorMap[colorClass.split("theme")[1]]
                : "#fffdfc";

            if (themeColor) {
              var meta = document.querySelector("meta[name='theme-color']");
              if (!meta) {
                meta = document.createElement("meta");
                meta.name = "theme-color";
                document.head.appendChild(meta);
              }
              meta.setAttribute("content", themeColor);
            }
          } catch (e) {
            console.error("Theme load failed:", e);
          }
        })();
      `}
    </Script>
  );
}
