import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

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
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br" className="bg-slate-700">
        <body className={inter.className}>
          <NavBar />
          <main className="container mx-auto px-8 py-32 flex justify-center   min-h-screen">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
