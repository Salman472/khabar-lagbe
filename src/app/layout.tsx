import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/sessionProvider/Provider";

export const metadata: Metadata = {
  title: "Khabar Lagbe",
  description: "Khabar Lagbe | Tasty Food And Fast Delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="w-full min-h-screen bg-linear-to-b from-green-100 to-white"
    >
      <body className="min-h-full flex flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
