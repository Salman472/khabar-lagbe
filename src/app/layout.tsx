import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/sessionProvider/Provider";
import StoreProvider from "@/redux/StoreProvider";

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
      className="w-full min-h-screen bg-linear-to-b from-green-50 to-white"
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <StoreProvider>{children}</StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
