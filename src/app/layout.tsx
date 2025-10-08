"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import ThemeWrapper from "./settings/ThemeProvider"; 
import "./globals.css";
// import AuthInitializer from "./AuthInitializer";
import AuthPersist from "./AuthPersists";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });


export const metadata = {
  title: "StockMate | Track products, monitor stock, and manage your inventory from one clean dashboard",
  description:
    "Track products, monitor stock, and manage your inventory from one clean dashboard ",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Stock Mate | Track products, monitor stock, and manage your inventory from one clean dashboard",
  description:
    "Track products, monitor stock, and manage your inventory from one clean dashboard ",
    url: "https://stockmate-five.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://stockmate-five.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "StockMate",
      },
    ],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <Provider store={store}>
          <AuthPersist/>
          <ThemeWrapper>
            {/* <AuthInitializer /> */}
          
            {children}
          </ThemeWrapper>
          <Toaster position="top-right" reverseOrder={false} />
        </Provider>
      </body>
    </html>
  );
}