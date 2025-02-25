'use client'
import React, {  } from "react";
import { Paper, Typography } from "@mui/material";
import { Col, Row } from "@/components/Grids";
import { AssignmentIndOutlined, AdminPanelSettingsOutlined, CreditCardOutlined, NotificationsActiveOutlined, SchoolOutlined } from "@mui/icons-material";
import TextIcon from "@/components/TextIcon";
import { ButtonCustom } from "@/components/ButtonCustom";
import TextInputCustom from "@/components/TextInputCustom";


export default function MeuCadastro() {

  const ButtonMenu = ({ content }: any) => {

    return (
      <Col sx={{
        backgroundColor: '#fff',
        padding: '10px 5px 1px 15px',
        borderRadius: '50px',
        margin: '10px 0px',
        ":hover": {
          cursor: 'pointer',
          backgroundColor: '#2825812e'
        }
      }}>
        {content}
      </Col>
    )
  }


  return (
    <Row container spacing={2} className="p-5 justify-center h-[1300px] max-w-[1200px] m-auto"  >
      <Col size={{ xs: 12, sm: 12, md: 4, lg: 4 }} >
        <Paper variant="outlined" className="rounded-xl p-8" >
          <ButtonMenu content={
            <TextIcon
              text="Meu cadastro"
              textSize="18px"
              icon={<AssignmentIndOutlined className="text-[24px] mr-2" />}
            />
          } />

          <ButtonMenu content={
            <TextIcon
              text="Segurança e privacidade"
              textSize="18px"
              icon={<AdminPanelSettingsOutlined className="text-[24px] mr-2" />}
            />
          } />

          <ButtonMenu content={
            <TextIcon
              text="Pagamentos"
              textSize="18px"
              icon={<CreditCardOutlined className="text-[24px] mr-2" />}
            />
          } />

          <ButtonMenu content={
            <TextIcon
              text="Comunicações"
              textSize="18px"
              icon={<NotificationsActiveOutlined className="text-[24px] mr-2" />}
            />
          } />

          <ButtonMenu content={
            <TextIcon
              text="Meu nível"
              textSize="18px"
              icon={<SchoolOutlined className="text-[24px] mr-2" />}
            />
          } />

        </Paper>
      </Col>

      <Col className="px-3" size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
        <Typography variant="body1" className="text-black " >Meu cadastro</Typography>
        <Typography variant="subtitle1" className="text-[grey] text-sm" >Configure seu cadastro e aumente a confiança do seu perfil</Typography>

        <Paper variant="outlined" className="rounded-xl p-7 my-5" >
          <Col>
            <Typography variant="body1" className="text-black " >Dados da conta</Typography>
            <TextInputCustom variant="filled" placeholder="Nome" />
            <TextInputCustom variant="filled" placeholder="Como você quer ser chamado(a)?" />
            <TextInputCustom variant="filled" placeholder="Email" />
            <TextInputCustom variant="filled" placeholder="CPF" />
            <TextInputCustom variant="filled" placeholder="Celular" />
            <TextInputCustom variant="filled" placeholder="Senha" />
          </Col>

          <ButtonCustom variant="contained" className="mt-5" >Salvar alterações</ButtonCustom>
        </Paper>

        <Typography variant="body1" className="text-black mt-5" >Endereço</Typography>
        <Typography variant="subtitle1" className="text-[grey] text-sm" >Configure seus dados de endereço</Typography>

        <Paper variant="outlined" className="rounded-xl p-7 my-5" >
          <Col>
            <Typography variant="body1" className="text-black " >Dados de endereço</Typography>

            <TextInputCustom variant="filled" placeholder="Nome" />
            <TextInputCustom variant="filled" placeholder="Como você quer ser chamado(a)?" />
            <TextInputCustom variant="filled" placeholder="Email" />
            <TextInputCustom variant="filled" placeholder="CPF" />
            <TextInputCustom variant="filled" placeholder="Celular" />
            <TextInputCustom variant="filled" placeholder="Senha" />
          </Col>

          <ButtonCustom variant="contained" className="mt-5" >Salvar alterações</ButtonCustom>
        </Paper>

      </Col>
    </Row>
  );
}
