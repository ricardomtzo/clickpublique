import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "../globals.css";
import { Container, CssBaseline } from '@mui/material';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Checkout",
  description: "",
};

export default function RootLayout({ children }: 
  Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased bg-[#ffff]`}
      >
        <Navbar />
        <Container className='m-0 p-0 max-w-[100%] bg-[#ffff]'>
        <CssBaseline />
          {children}
        </Container>
      </body>
    </html>
  );
}
