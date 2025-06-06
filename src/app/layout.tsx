import type { Metadata } from "next";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "primereact/resources/themes/lara-light-blue/theme.css";

import { PrimeReactProvider } from 'primereact/api';

import localFont from "next/font/local";
import "./globals.css";
import { theme } from "../config/theme";
import { Css } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from "./hooks/AuthService";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <StyledEngineProvider injectFirst>
        <PrimeReactProvider>
        <AuthProvider>

          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f6fe]`}
          >
            {children}
          </body>
          </AuthProvider>

        </PrimeReactProvider>
      </StyledEngineProvider>
    </html>
  );
}
