"use client" 

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import {  store } from "./redux/store/store";
import { Provider } from "react-redux";
import ThemeProvider from "./settings/ThemeProvider";
import "./globals.css";
import AuthInitializer from "./AuthInitializer";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       <Provider store={store}>
        <ThemeProvider>
          <AuthInitializer />   {/* runs the fetchMe logic */}
           {children}
       </ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </body>
</html>
  );
}