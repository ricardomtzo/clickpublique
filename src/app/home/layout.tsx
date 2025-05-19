'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "../globals.css";
import Navbar from "@/components/Navbar";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { PrimeReactProvider } from "primereact/api";
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/config/theme";

import { StyledEngineProvider } from '@mui/material/styles';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>

      <ThemeProvider theme={theme}>
        <div className='bg-white'>
          <CssBaseline />
          <Navbar />
          <Container style={{ padding: '20px'}}>
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
                <Link color="gray" style={{ color: 'gray', marginRight: '10px' }} href="#">
                  Sobre nós
                </Link>
                <Link color="primary" style={{ color: 'gray' }} href="#">
                  Contato
                </Link>
              </Box>
            </Box>
          </footer>


        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
