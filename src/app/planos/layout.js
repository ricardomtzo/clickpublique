import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import localFont from "next/font/local";
import "../globals.css";
import { Container, CssBaseline } from '@mui/material';
import Navbar from '@/components/Navbar';

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

export const metadata = {
  title: "Checkout",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CssBaseline />
        <Navbar />
        <Container className='m-0 p-0 max-w-[100%] h-[100%] bg-[#f4f5f9]'>
          {children}
        </Container>
      </body>
    </html>
  );
}
