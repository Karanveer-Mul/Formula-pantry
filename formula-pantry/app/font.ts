import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-gilroy",
  display: "swap",
});

export const harmony = localFont({
  src: [
    {
      path: "../public/fonts/HarmonyOS_Sans_Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HarmonyOS_Sans_Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HarmonyOS_Sans_Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-harmony",
  display: "swap",
});

export const novecento = localFont({
  src: [
    {
      path: "../public/fonts/Novecento-Sans-W01-Md.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-novecento",
  display: "swap",
});