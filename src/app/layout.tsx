// "use client"
// // import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import { store } from './redux/store/store'
// import { Provider } from 'react-redux'
// import ThemeProvider from "./settings/ThemeProvider";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Provider store={store}>
//           <ThemeProvider>
//           {children}
//         </ThemeProvider>
//         <Toaster position="top-right" reverseOrder={false} />
//         </Provider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
"use client" // (You can remove this; layout can be a Server Component. Keeping it is OK.)

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import ThemeProvider from "./settings/ThemeProvider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// OPTIONAL: no-flash so the right class is set before paint
const noFlash = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
} catch(e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </Provider>
      </body>
    </html>
  );
}