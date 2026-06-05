import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文学賞図鑑",
  description:
    "芥川賞・直木賞・本屋大賞などの受賞作を、作品名・作家名・受賞年から探せる読書案内サイトです。",
  openGraph: {
    title: "文学賞図鑑",
    description:
      "芥川賞・直木賞・本屋大賞などの受賞作を、作品名・作家名・受賞年から探せる読書案内サイトです。",
    siteName: "文学賞図鑑",
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