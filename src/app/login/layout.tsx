import type { Metadata } from "next";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "primereact/resources/themes/lara-light-blue/theme.css";

import { PrimeReactProvider } from 'primereact/api';

import "../globals.css";

export const metadata: Metadata = {
  title: "Clique & Publique",
  description: "Bem vindo ao Clique & Publique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <PrimeReactProvider>
        <body
          className={`antialiased bg-[#f0f6fe]`}
        >
          {children}
        </body>
      </PrimeReactProvider>
    </html>
  );
}
