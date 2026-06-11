import type { Metadata } from "next";
import { Roboto_Flex, Encode_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Imersão Next.js",
  description: "Base DS para aulas de Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body
        className={`antialiased ${robotoFlex.variable} ${encodeSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}
