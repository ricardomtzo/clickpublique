'use client'
import React, { useEffect, useState } from "react";
import { Alert, Button, Grid2, Link, Modal, Paper, Switch, TextareaAutosize, Typography } from "@mui/material";
import SelectSearch from "@/components/SelectSearch";
import TextInputCustom from "@/components/TextInputCustom";
import { Col, Row } from "@/components/Grids";
import ButtonSelect from "@/components/ButtonSelect";

import StteperCustom from "@/components/StepperCustom";
import { environment } from "@/environments/environment";
import { useAuth } from "@/app/hooks/AuthService";
import { CheckCircleOutline, CloseSharp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import MultiImageUploader from "@/components/ImagesSelect";
import { isMobile } from "@/config/utils";


export default function Home() {

  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ price: 0, details_immobile: '', details_condominium: '' });

  const setInputValue = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = () => {
    setLoading(true);
    if (!user?.id) return;

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('category', '1');

    Object.keys(form).forEach(key => {
      if (key === 'file') {
        for (let i = 0; i < form.file.length; i++) {

          formData.append(key + i, form.file[i]);
        }
      } else {
        formData.append(key, form[key]);
      }
    });

    fetch(`${environment.apiUrl}/ads`, {
      method: 'POST',
      body: formData,

    })
      .then(response => response.json())
      .then(data => {

        if (data?.id) {
          setOpen(true);
        }

      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

  }

  const onSelectDetailsImmobile = (value: any) => {
    if (form?.details_immobile?.includes(value)) {
      const newValue = form?.details_immobile.replace(value + ',', '');
      setForm({
        ...form,
        details_immobile: newValue
      })
    } else {
      setForm({
        ...form,
        details_immobile: form?.details_immobile + value + ',',
      });
    }
  };

  const onSelectDetailsCondominium = (value: any) => {
    if (form?.details_condominium?.includes(value)) {
      const newValue = form?.details_condominium.replace(value + ',', '');
      setForm({
        ...form,
        details_condominium: newValue
      })
    } else {
      setForm({
        ...form,
        details_condominium: form?.details_condominium + value + ',',
      });
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <Col className="w-[100%] py-5 px-4 pb-20">

      <form method="post" encType="multipart/form-data" className=" m-auto">
        <input type="hidden" name="user_id" value="7" />
        <StteperCustom
          contents={[
            {
              header: 'Informações',
              content:
                <Col className="max-w-[600px]">
                  <Typography variant="h6" color="black" className="mb-5" >Crie um título e compartilhe </Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Anúncios mais completos vendem mais rápido.
                  </Alert>

                  {inputList.map((input, index) => (
                    <TextInputCustom
                      key={'obrig' + index}
                      label={input.label}
                      name={input.name}
                      type={input?.type ?? "text"}
                      multiline={input?.type === 'textarea'} 
                      rows={4}
                      fullWidth
                      onChange={(e) => setInputValue(input.name, e.target.value)}
                    />
                  ))}

                </Col>
            },
            {
              header: 'Detalhes do Imóvel e do Condomínio',
              content:
                <Col className="max-w-[600px]">
                  <Typography variant="h6" color="black" className="mt-5 mb-2" >Detalhes do Imóvel</Typography>
                  <Row container spacing={1}>
                    {detailsImmobile.map((item) => (
                      <ButtonSelect key={item} selected={form?.details_immobile?.includes(item)} onClick={() => onSelectDetailsImmobile(item)}>{item}</ButtonSelect>
                    ))}
                  </Row>

                  <Typography variant="h6" color="black" className="mt-5 mb-2" >Detalhes do Condomínio</Typography>
                  <Row container spacing={1}>
                    {detailCondominium.map((item) => (
                      <ButtonSelect key={item} selected={form?.details_condominium?.includes(item)} onClick={() => onSelectDetailsCondominium(item)}>{item}</ButtonSelect>
                    ))}
                  </Row>
                </Col>
            },
            {
              header: 'Fotos',
              content:
                <Col className="max-w-[600px]">
                  <Typography variant="h6" color="black" className=" mb-5" >Escolha as fotos do seu anúncio</Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Boas fotos te ajudam a tornar seu anúncio mais visível</Alert>

                  <MultiImageUploader onChange={(images: any) => setInputValue('file', images)} />
                </Col>
            },
            {
              header: 'Para finalizar',
              content:
                <Col className="max-w-[600px]">
                  <TextInputCustom
                    label="CEP da localização do imóvel*"
                    name="cep"
                    onChange={(e) => setInputValue('cep', e.target.value)}
                  />
                  <Row container className="mt-5 justify-between align-center">
                    <Typography variant="body1" color="black" className="mb-5 pt-2" >
                      Contato: {user?.phone}
                    </Typography>

                    <Typography variant="body1" color="black" className="mb-5" >
                      Ocultar meu telefone neste anúncio <Switch defaultChecked />
                    </Typography>
                  </Row>

                  <Alert className="w-[100%] my-5" severity="warning">Não pedimos códigos por ligação, chat ou WhatsApp. Desconfie se alguém entrar em contato ou enviar comprovante de pagamento em nome da Click e Publique</Alert>

                  <Typography variant="body2" color="black" className="mb-5" >
                    Ao continuar, você está ciente que a Click e Publique poderá compartilhar seus dados com instituições financeiras parceiras, que poderão oferecer soluções para potenciais compradores e que não compartilhamos seus dados com empresas de fora do Grupo Click e Publique Brasil que oferecem atividades similares às nossas.
                    O uso dos seus dados pode ser consultado na Política de privacidade, com a qual você concorda ao enviar o anúncio.
                  </Typography>

                  <Button disabled={loading} onClick={submit} variant="contained" type="button" size="large" className="bg-[#1df166] h-[55px] text-white" >Cadastrar anúncio</Button>
                </Col>
            },
          ]}


        />
      </form>

      <Modal open={open} onClose={handleModal}>
        <Grid2 container flex={1} className="items-center justify-center h-screen" >
          <Paper className="p-10 text-center" >
            <CheckCircleOutline className="text-[#1df166] text-[100px]" />
            <Typography variant="h6" className="mb-5" >
              Anúncio cadastrado com sucesso!
            </Typography>
            <Button
              variant="contained"
              type="button"
              size="small"
              className="bg-[#1df166] text-white"
              onClick={() => router.push('/perfil')} >Ir para meus anúncios</Button>
          </Paper>
        </Grid2>
      </Modal>
    </Col>
  );
}


const inputList = [
  {
    label: 'Título*',
    name: 'title',
  },
  {
    label: 'Descrição*',
    name: 'description',
    type: 'textarea',
  },
  {
    label: 'Tipo*',
    name: 'type',
  },
  {
    label: 'Quer vender ou alugar?*',
    name: 'sell_or_rent',
  },
  {
    label: 'Quantidade de quartos*',
    name: 'number_rooms',
    type: 'number',
  },
  {
    label: 'Quantidade de banheiros*',
    name: 'number_bathrooms',
    type: 'number',
  },
  {
    label: 'Tamanho*',
    name: 'size',
    type: 'number',
  },
  {
    label: 'Quantidade de vagas de estacionamento*',
    name: 'parking_spaces',
    type: 'number',
  },
  {
    label: 'Valor condominio*',
    name: 'value_condominium',
  },
  {
    label: 'Valor IPTU*',
    name: 'value_iptu',
  }
]

const detailsImmobile = [
  "Área de serviço",
  "Armários na cozinha",
  "Armários no quarto",
  "Mobiliado",
  "Ar condicionado",
  "Churrasqueira",
  "Varanda",
  "Quarto de serviço",
];

const detailCondominium = [
  "Condomínio fechado",
  "Segurança 24h",
  "Área murada",
  "Permitido animais",
  "Portão eletrônico",
  "Academia",
  "Piscina",
]
