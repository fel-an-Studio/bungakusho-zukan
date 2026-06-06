import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Culture Atlas",
  description:
    "文学賞を入口に、受賞作・作家・映像化作品・関連作品のつながりをたどる文化作品データベースです。",
  openGraph: {
    title: "Culture Atlas",
    description:
      "文学賞を入口に、受賞作・作家・映像化作品・関連作品のつながりをたどる文化作品データベースです。",
    siteName: "Culture Atlas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}