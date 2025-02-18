'use client'
import * as React from 'react';
import {
  TextField,
  Typography,
  Box,
  Paper,
  Link,
} from '@mui/material';
import { Col, Row } from '@/components/Grids';
import Image from 'next/image';

import logo from '../assets/imgs/logo.jpg';
import { ButtonCustom } from '@/components/ButtonCustom';
import LineSpace from '@/components/LineSpace';

import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../hooks/AuthService';

export default function Login() {
  const { login, register } = useAuth();

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {


    e.preventDefault()

    const email = e.currentTarget['email'].value;
    const password = e.currentTarget['password'].value;

    login(email, password);
  }

  return (
    <Row container spacing={2} justifyContent={'center'} alignItems={'center'} style={{ height: '100vh' }}>

      <Col size={{ xs: 12, sm: 12, md: 4, lg: 4 }}  >
        <img src={logo.src} alt="logo" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 10, margin: 'auto' }} />

        <Typography variant="h6" className="text-center text-black mt-3" >
          Bem vindo ao nosso site
        </Typography>
      </Col>

    <form onSubmit={handleSubmit}>
      <Paper elevation={2} variant="outlined" className="rounded-xl p-5" >
        <Col mb={5}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Typography variant="h4" className="text-center text-black" >
              Entrar
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                className='mb-5'
                id="password"
                autoComplete="current-password"
              />
              <ButtonCustom
                type="submit"
                fullWidth
                variant="contained"
                className='mt-5'
                
              >
                Entrar

              </ButtonCustom>
            </Box>
          </Box>
        </Col>

        <Col container spacing={2} mb={3} justifyContent={'center'} alignItems={'center'} >
          <ButtonCustom variant='outlined' style={{ backgroundColor: '#fff'}}>
            <GoogleIcon fontSize='large' sx={{ color: '#000',mr:1 }} /> Entrar com uma conta Google
          </ButtonCustom>

          <ButtonCustom variant='outlined' style={{ backgroundColor: '#fff'}}>
            Entrar com uma conta do Facebook
          </ButtonCustom>

        </Col>

        <LineSpace />

        <Typography variant="body2" className="text-center text-black" >
          Não tem uma conta?
          <Link href="/cadastro" className="text-center ml-2 ">
            Cadastre-se
          </Link>
        </Typography>

      </Paper>

    </form>

      <Typography variant="body2" className="text-center text-black" >
        Ao se registrar, você concorda com nossos
        <Link href="/register" className="text-center ml-2 " >
          Termos de uso
        </Link>
        e
        <Link href="/register" className="text-center ml-2 " >
          Política de privacidade
        </Link>
      </Typography>

    </Row>
  );
}