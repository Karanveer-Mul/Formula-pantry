import type { Metadata } from "next";
import { gilroy, harmony, novecento } from "./font";
import "./globals.css";
import PCNavbar from "@/app/components/layout/PCNavbar";
import MobileNavbar from "@/app/components/layout/MobileNavbar";
import Head from "next/head";

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
    <html lang="en" className={`${gilroy.variable} ${harmony.variable} ${novecento.variable}`}>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Sector Talks" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={`antialiased`}>
        <div className="relative w-full min-h-screen">
          <div className='relative w-full flex flex-col lg:flex-row'>
            <MobileNavbar />
            <PCNavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
