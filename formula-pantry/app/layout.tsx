import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/PCNavbar";
import PCNavbar from "../components/PCNavbar";
import MobileNavbar from "@/components/MobileNavbar";

const harmonySans = localFont({
  src: [
    {
      path: "../public/fonts/harmonyos-sans-webfont/HarmonyOS_Sans_Regular.woff",
      weight: "400",
      style: "normal",
      variable: "--font-harmony-sans-regular",
    },
    {
      path: "../public/fonts/harmonyos-sans-webfont/HarmonyOS_Sans_Medium.woff",
      weight: "500",
      style: "normal",
      variable: "--font-harmony-sans-medium",
    },
    {
      path: "../public/fonts/harmonyos-sans-webfont/HarmonyOS_Sans_Bold.woff",
      weight: "700",
      style: "normal",
      variable: "--font-harmony-sans-bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Sector Talks",
  description: "Rev your Formula 1 curiosity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="relative w-full min-h-screen">
          <div className='relative w-full flex flex-col lg:flex-row'>
            <MobileNavbar />
            <PCNavbar />
            
          </div>
        </div>
      </body>
    </html>
  );
}
