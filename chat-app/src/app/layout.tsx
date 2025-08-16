import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import TanstackProvider from "@/providers/tanstack-provider";

export const metadata: Metadata = {
  title: "Chat Buddy",
  description: "Chat Buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-700">
      <body className={`antialiased`}>
        <TanstackProvider>{children}</TanstackProvider>
        <ToastContainer position="top-center" limit={3} />
      </body>
    </html>
  );
}
