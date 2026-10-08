import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dandiya Night · Tickets",
  description: "Your Dandiya Night ticket and event entry.",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
