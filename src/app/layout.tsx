import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Guapi",
  description: "Curso e-commerce guapi, estudo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="bg-slate-700">
      <body className={inter.className}>
        <NavBar />
        <main className="container mx-auto py-32 flex justify-center   min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
