import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "読書回遊 | Culture Atlas",
  description:
    "文学賞を入口に、次に読みたい一冊へ。受賞作、候補作、同じ作家、似たテーマの作品をたどれる読書案内サイトです。",
  openGraph: {
    title: "読書回遊 | Culture Atlas",
    description:
      "文学賞を入口に、次に読みたい一冊へ。受賞作、候補作、同じ作家、似たテーマの作品をたどれる読書案内サイトです。",
    siteName: "読書回遊",
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