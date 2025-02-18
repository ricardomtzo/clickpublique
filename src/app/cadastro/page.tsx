'use client'
import * as React from 'react';
import {
  TextField,
  Typography,
  Box,
  Paper,
  Link,
  Radio,
} from '@mui/material';
import { Col, Row } from '@/components/Grids';
import Image from 'next/image';

import logo from '../assets/imgs/logo.jpg';
import { ButtonCustom } from '@/components/ButtonCustom';
import LineSpace from '@/components/LineSpace';

import GoogleIcon from '@mui/icons-material/Google';

import { useAuth } from "../hooks/AuthService";

export default function Cadastro() {

  const { login, register } = useAuth();

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = {
      cpf: e.currentTarget['cpf'].value,
      name: e.currentTarget['nome'].value,
      email: e.currentTarget['email'].value,
      password: e.currentTarget['password'].value,
      type_user: e.currentTarget['type_user'].value,
      active: true

    }

    register(form, '123');


    
  }

  return (
    <Col container spacing={2} justifyContent={'center'} alignItems={'center'} style={{ margin: '20px' }}>
      <Paper elevation={2} variant="outlined" className="rounded-xl p-5 max-w-[550px]" >
        <Col mb={5}>
          <Box pt={3}>

          <form onSubmit={handleSubmit}>
            <img src={logo.src} alt="logo" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, margin: 'auto' }} />

            <Typography variant="h6" className="text-center text-black mt-3" >
              Crie sua conta
            </Typography>

            <LineSpace />

            <Typography variant="h6" className="text-black" >
              Escolha o tipo de conta
            </Typography>

            <Row container spacing={2}>
              <Typography variant="body1" color="black" className="mb-5" >
                Pessoa física <Radio name="type_user" value="PF" />
              </Typography>

              <Typography variant="body1" color="black" className="mb-5" >
                Pessoa jurídica <Radio name="type_user" value="PJ" />
              </Typography>
            </Row>


            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="cpf"
                label="CPF ou CNPJ"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Como você quer ser chamado(a)?"
                autoFocus
                name="nome"
                helperText="Aparecerá em seu perfil, anúncios e chats."
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                helperText="Enviaremos um e-mail de confirmação."
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                className='mb-5'
                autoComplete="current-password"
                helperText="Sua senha deve ter pelo menos 6 caracteres"
              />
              <ButtonCustom
                type="submit"
                fullWidth
                variant="contained"
                className='mt-5'
              >
                Cadastre-se

              </ButtonCustom>
            </Box>

            </form>

          </Box>
        </Col>

        <Col container spacing={2} mb={3} justifyContent={'center'} alignItems={'center'} >
          <ButtonCustom  variant='outlined' style={{ backgroundColor: '#fff'}}>
            <GoogleIcon fontSize='large' sx={{ color: '#000', mr: 1 }} /> Entrar com uma conta Google
          </ButtonCustom>

          <ButtonCustom  variant='outlined' style={{ backgroundColor: '#fff'}}>
            Entrar com uma conta do Facebook
          </ButtonCustom>

        </Col>

        <LineSpace />

        <Typography variant="body2" className="text-center text-black" >
          Já tem uma conta?
          <Link href="/login" className="text-center ml-2 ">
            Entrar
          </Link>
        </Typography>

      </Paper>

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

    </Col>
  );
}