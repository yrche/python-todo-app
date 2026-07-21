import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChakraUIProvider, ReactQueryProvider } from "@/utils/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
