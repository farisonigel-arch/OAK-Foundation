import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OAK Foundation — Partner Convening 2026",
  description: "OAK Foundation Partner Convening 2026 event registration and attendance platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
