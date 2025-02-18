import type { Metadata } from "next";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Link from "next/link";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Click e Publique",
  description: "Tela de anúncios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        style={{ backgroundColor: '#ffff', }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CssBaseline />
        <Navbar />
        <Container style={{ padding: '20px' }}>
          {children}
        </Container>

        <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', width: '100%', }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary" align="left">
              {'Copyright © '}
              {new Date().getFullYear()}
              {' Minha Empresa. Todos os direitos reservados.'}
            </Typography>
            <Box>
              <Link color="gray" style={{ color: 'gray', marginRight: '10px' }}  href="#">
                Sobre nós
              </Link>
              <Link color="primary" style={{ color: 'gray' }} href="#">
                Contato
              </Link>
            </Box>
          </Box>
        </footer>

      </body>
    </html>
  );
}
