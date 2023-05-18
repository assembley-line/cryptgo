import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "CryptGo",
  description: "Easily send coded-encrypted messages privately",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
