'use client';
import React, { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Resumo from "@/components/Resumo";
import StepperCustom from "@/components/Stepper";

export default function Cardpayment() {

  const [error, setError] = useState([]);
  const [tipo, setTipo] = useState('CNPJ');

  const handleTipo = (event) => {
    setTipo(event.target.value);
  };

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  // Função para validar CNPJ
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  }

  const onblur = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case 'nome':
        // Validação do nome (apenas letras e espaços, mínimo 3 caracteres)
        const nomeValido = /^[a-zA-Z\s]{3,}$/.test(value);
        if (!nomeValido) {
          setError(error => [...error, "nome"]);
          return false;
        } else if (nomeValido) {
          setError(error.filter(item => item !== "nome"));
          return false;
        }
        break;
      case 'email':
        // Validação do e-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!emailValido) {
          setError(error => [...error, "email"]);
          return false;
        } else if (emailValido) {
          setError(error.filter(item => item !== "email"));
          return false;
        }
        break;
      case 'cpfCNPJ':
        // Validação do CPF
        const valida = tipo === 'CPF' ? validarCPF(value) : validarCNPJ(value);
        if (!valida) {
          setError(error => [...error, "cpf"]);
          return false;
        } else if (valida) {
          setError(error.filter(item => item !== "cpf"));
          return false;
        }
        break;

      default:
        break;
    }
  }
  // Função para validar o formulário
  function onSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpfCNPJ").value.trim();

    // Validação do nome (apenas letras e espaços, mínimo 3 caracteres)
    const nomeValido = /^[a-zA-Z\s]{3,}$/.test(nome);
    if (!nomeValido) {
      setError(error => [...error, "nome"]);
      return false;
    }

    // Validação básica de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setError(error => [...error, "email"]);
      return false;
    }

    // Validação de CPF
    if (!validarCPF(cpf)) {
      setError(error => [...error, "cpf"]);
      return false;
    }

    // Validação de CNPJ
    if (!validarCNPJ(cnpj)) {
      setError(error => [...error, "cnpj"]);
      return false;
    }

    return true;
  }

  function mascaraCPF(cpf) {
    cpf.value = cpf.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  // Função para aplicar máscara no CNPJ
  function mascaraCNPJ(cnpj) {
    cnpj.value = cnpj.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  return (
    <div>
      <Grid2 container spacing={2} pb={20} height={"100%"} backgroundColor="white">

        <Grid2 container className=" mt-10 justify-center" size={{ md: 6 }}>
          <Grid2 className="w-[70%]">
            <StepperCustom />
            <Typography variant="h6" color="black">Crie sua conta</Typography>
            <Box className="h-[2px] bg-gray-300 my-2 mb-8" />

            <form onSubmit={onSubmit}>
              <Grid2 container className="my-8" spacing={2}>

                <Grid2 size={{ sm: 12, xs: 12, md: 12 }}>
                  <Typography variant="body1" color="black" className="mb-3">Nome completo</Typography>
                  <TextField
                    error={error.includes("nome")}
                    required
                    fullWidth
                    variant="outlined"
                    id="nome"
                    onBlur={onblur}
                    helperText={error.includes("nome") && "Digite um nome válido"}
                    placeholder="Nome completo" />
                </Grid2>
                <Grid2 size={{ sm: 12, xs: 12, md: 6 }}>
                  <Typography variant="body1" color="black" className="mb-3">E-mail</Typography>

                  <TextField
                    error={error.includes("email")}
                    required
                    fullWidth
                    id="email"
                    type="email"
                    onBlur={onblur}
                    variant="outlined"
                    placeholder="exemplo@email.com"
                    helperText={error.includes("email") && "Digite um e-mail válido"}
                  />
                </Grid2>
                <Grid2 size={{ sm: 12, xs: 12, md: 6 }}>
                  <Typography variant="body1" color="black" className="mb-3">Confirme o e-mail</Typography>
                  <TextField
                    required
                    fullWidth
                    id="email2"
                    type="email"
                    onBlur={onblur}
                    variant="outlined"
                    placeholder="exemplo@email.com"
                    error={error.includes("email")}
                    helperText={error.includes("email") && "Digite um e-mail válido"}
                  />
                </Grid2>
              </Grid2>

              <FormControl>
                <Typography
                  id="lradio"
                  variant="body1"
                  color="black"
                  className="mb-3 ">Tipo de contratação</Typography>
                <RadioGroup
                  row
                  aria-labelledby="lradio"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={handleTipo} value="CNPJ" checked={tipo === 'CNPJ'} className="text-[gray]" control={<Radio />} label="CNPJ" />
                  <FormControlLabel onChange={handleTipo} value="CPF" checked={tipo === 'CPF'} className="text-[gray]" control={<Radio />} label="CPF" />

                </RadioGroup>
              </FormControl>

              <Typography variant="body1" color="black" className="mb-3 mt-2">{tipo === 'CNPJ' ? 'CNPJ' : 'CPF'}</Typography>
              <TextField
                id="cpfCNPJ"
                onInput={tipo === 'CNPJ' ? (e) => mascaraCNPJ(e.target) : (e) => mascaraCPF(e.target)}
                required
                fullWidth
                onBlur={onblur}
                error={error.includes("cpf")}
                helperText={error.includes("cpf") && tipo === 'CNPJ' ? "Digite um CNPJ valido" : "Digite um CPF valido"}
                placeholder={`${tipo === 'CNPJ' ? '00.000.000/0000-00' : '000.000.000-00'}`}
                variant="outlined" />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className="mt-5 mb-5"
                style={{ backgroundColor: "#32C770" }}
              >Continuar </Button>
            </form>
            <Typography variant="p" color="grey.400" className="mt-5">Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência neste site e para outros fins descritos na nossa política de privacidade.</Typography>
          </Grid2>

        </Grid2>

        <Resumo />

      </Grid2>

    </div>
  );
}
