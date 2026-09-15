import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open channel",
  description: "A focused streaming chat interface.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
