import type { Metadata } from "next";
import { Instrument_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getLinks } from "@/queries/link";
import DataProvider from "@/components/provider/DataProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Devlinks",
  description:
    "Simple and efficient way for developers to share all their links",
  icons: "/assets/images/devlinks-icon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = await getLinks();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <DataProvider value={links}>{children}</DataProvider>
      </body>
    </html>
  );
}
