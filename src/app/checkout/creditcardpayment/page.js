'use client'
import { useState } from "react";
import { Box, Button, Grid2, List, ListItem, ListItemText, Radio, TextField, Typography } from "@mui/material";
import { ArrowForwardOutlined, CreditCard } from "@mui/icons-material";
import Resumo from "@/components/Resumo";
import StepperCustom from "@/components/Stepper";

const style = {
  p: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'grey.100',
};

var cartoes = {
  Visa: /^4[0-9]{12}(?:[0-9]{3})/,
  Mastercard: /^5[1-5][0-9]{14}/,
  Amex: /^3[47][0-9]{13}/,
  DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
  Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
  JCB: /^(?:2131|1800|35\d{3})\d{11}/
};

export default function Cardpayment() {

  const [error, setError] = useState([]);

  const onblur = (event) => {

    const id = event.target.id;
    const value = event.target.value.trim();

    const nomeValido = /^[a-zA-Z\s]{3,}$/.test(value);
    if (!nomeValido && id == "nome") {
      setError(error => [...error, "nome"]);
      return false;
    }else if(nomeValido && id == "nome"){
      setError(error.filter(item => item !== "nome"));
      return false;
    }

    // Validação do cartão (apenas números)
    const cartaoValido = testarCC(value, cartoes);
    if (!cartaoValido && id == "cartao") {
      setError(error => [...error, "cartao"]);
      return false;
    } else if(cartaoValido && id == "cartao"){
      setError(error.filter(item => item !== "cartao"));
      return false;
    }

    // Validação do vencimento (apenas números)
    const vencimentoValido = /^\d{2}\/\d{2}$/.test(value);
    if (!vencimentoValido && id == "vencimento") {
      setError(error => [...error, "vencimento"]);
      return false;
    } else if(vencimentoValido && id == "vencimento"){
      setError(error.filter(item => item !== "vencimento"));
      return false;
    }

    // Validação do código de segurança (apenas números)
    const codigosegurancaValido = /^\d{3,4}$/.test(value);
    if (!codigosegurancaValido && id == "codigoseguranca") {
      setError(error => [...error, "codigoseguranca"]);
      return false;
    } else if(codigosegurancaValido && id == "codigoseguranca"){
      setError(error.filter(item => item !== "codigoseguranca"));
      return false;
    }

  }


  function onSubmit(event) {
    event.preventDefault();

    setError([]);

    const nome = document.getElementById("nome").value.trim();
    const cartao = document.getElementById("cartao").value.trim();
    const vencimento = document.getElementById("vencimento").value.trim();
    const codigoseguranca = document.getElementById("codigoseguranca").value.trim();

    // Validação do nome (apenas letras e espaços, mínimo 3 caracteres)
    const nomeValido = /^[a-zA-Z\s]{3,}$/.test(nome);
    if (!nomeValido) {
      setError(error => [...error, "nome"]);
      return false;
    }

    // Validação do cartão (apenas números)
    const cartaoValido = testarCC(cartao);
    if (!cartaoValido) {
      setError(error => [...error, "cartao"]);
      return false;
    }

    // Validação do vencimento (apenas números)
    const vencimentoValido = vencimento.match(/^\d{2}\/\d{2}$/);
    if (!vencimentoValido) {
      setError(error => [...error, "vencimento"]);
      return false;
    }

    // Validação do código de segurança (apenas números)
    const codigosegurancaValido = codigoseguranca.match(/^\d{3,4}$/);
    if (!codigosegurancaValido) {
      setError(error => [...error, "codigoseguranca"]);
      return false;
    }

    return true;
  }

  function testarCC(nr, cartoes) {
    for (var cartao in cartoes) if (nr.match(cartoes[cartao])) return cartao;
    return false;
  }


  return (
    <div>
      <Grid2 container spacing={2} height={"100vh"} backgroundColor="white">

        <Grid2 container className="mt-10 justify-center" size={{ md: 6 }}>
          <Grid2 className="w-[90%]">
            <StepperCustom />
            <Typography variant="h6" color="black">Inserir detalhes de pagamento</Typography>
            <Box className="h-[2px] bg-gray-300 my-2 mb-8" />
            <form onSubmit={onSubmit}>
              <List sx={style}>
                <ListItem>
                  <Radio
                    checked
                    size="small"
                    value="a"
                    name="radio-buttons"
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full p-1"><CreditCard className="text-[grey]" /></Box>
                  <ListItemText
                    primary="Cartão de crédito"
                    secondary="Parcelas disponíveis"
                    primaryTypographyProps={{ color: "black" }} />
                  <Typography variant="subtitle2" color="primary" className="">Editar</Typography>
                </ListItem>
              </List>

              <Grid2 container className="my-8" spacing={2}>
                <Grid2 size={{ sm: 12, xs: 12, md: 12 }}>
                  <Typography variant="body1" color="black" className="mb-3">Nome do titular do cartão</Typography>
                  <TextField
                    required
                    fullWidth
                    id="nome"
                    onBlur={onblur}
                    variant="outlined"
                    error={error.includes("nome")}
                    placeholder="Nome do titular do cartão"
                    helperText={error.includes("nome") && "Digite um nome válido"}

                  />
                </Grid2>
                <Grid2 size={{ sm: 12, xs: 12, md: 12 }}>
                  <Typography variant="body1" color="black" className="mb-3">Dados do cartão</Typography>
                  <TextField
                  type="number"
                    required
                    fullWidth
                    onBlur={onblur}
                    variant="outlined"
                    id="cartao"
                    placeholder="0000 0000 0000 0000"
                    error={error.includes("cartao")}
                    helperText={error.includes("cartao") && "Digite um cartão válido"} />
                </Grid2>
                <Grid2 size={{ sm: 6, xs: 6, md: 6 }}>
                  <Typography variant="body1" color="black" className="mb-3">Vencimento</Typography>
                  <TextField
                    required
                    fullWidth
                    onBlur={onblur}
                    id="vencimento"
                    variant="outlined"
                    placeholder="10/25"
                    error={error.includes("vencimento")}
                    helperText={error.includes("vencimento") && "Digite uma data válida"} />
                </Grid2>
                <Grid2 size={{ sm: 6, xs: 6, md: 6 }}>
                  <Typography variant="body1" color="black" className="mb-3">Código de segurança</Typography>
                  <TextField
                    required
                    fullWidth
                    onBlur={onblur}
                    type="number"
                    variant="outlined"
                    id="codigoseguranca"
                    placeholder="123"
                    error={error.includes("codigoseguranca")}
                    helperText={error.includes("codigoseguranca") && "Digite um código de segurança válido"} />
                </Grid2>
              </Grid2>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className="mt-5 float-right mb-5"
                style={{ backgroundColor: "#32C770" }}
              >PAGAR R$ 649,00 <ArrowForwardOutlined /></Button>

              <Typography variant="p" color="grey.400" className="mt-5">Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência neste site e para outros fins descritos na nossa política de privacidade.</Typography>
            </form>
          </Grid2>

        </Grid2>

        <Resumo />
      </Grid2>

    </div>
  );
}
