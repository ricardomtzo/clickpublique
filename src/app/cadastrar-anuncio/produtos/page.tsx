'use client'
import React, { useState } from "react";
import { Alert, Button, Grid2, Link, Modal, Paper, Switch, Typography } from "@mui/material";
import SelectSearch from "@/components/SelectSearch";
import TextInputCustom from "@/components/TextInputCustom";
import { Col, Row } from "@/components/Grids";
import ButtonSelect from "@/components/ButtonSelect";

import LineSpace from "@/components/LineSpace";
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
  const [form, setForm] = useState<any>({
    title: 'Toyota Corolla',
    description: 'descricao',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 10000,
    version: 'XEi 2.0',
    cep: '01001-000',
    plate: 'ABC-1234',
    km: 45000,
    color: 'Prata',
    trasmission: 'Automático',
    qtd_doors: 4,
    fuel: 'Gasolina',
    direction: 'Elétrica',
    vehicle_type: 'Sedan',
    series_items: '',
    additional_info: ''
  });

  const setInputValue = (name: string, value: any) => {
    console.log(name, value)
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

  const onSelectAdditionalInfo = (value: any) => {
    if (form?.type.includes(value)) {
      const newValue = form?.type.replace(value + ',', '');
      setForm({
        ...form,
        type: newValue
      })
    } else {
      setForm({
        ...form,
        type: form?.type + value + ',',
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
              header: 'Informações do produto',
              content:
                <Col>
                    <Typography variant="h6" color="black" className=" mb-5" >Crie um título e compartilhe </Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Anúncios mais completos vendem mais rápido.
                  </Alert>

                  {inputList.map((input, index) => (
                    <TextInputCustom
                      key={'obrig' + index}
                      label={input.label}
                      name={input.name}
                      onChange={(e) => setInputValue(input.name, e.target.value)}
                    />
                  ))}

                </Col>
            },
            {
              header: 'Informações',
              content:
                <Col>
                  <Typography variant="h6" color="black" className=" mb-5" >Tipo de produto</Typography>
                  <Row container spacing={1}>
                    {typeProduct.map((item) => (
                      <ButtonSelect key={item} selected={form?.additional_info?.includes(item)} onClick={() => onSelectAdditionalInfo(item)}>{item}</ButtonSelect>
                    ))}
                  </Row>
                </Col>
            },
            {
              header: 'Fotos',
              content:
                <Col>
                  <Typography variant="h6" color="black" className=" mb-5" >Escolha as fotos do seu anúncio</Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Boas fotos te ajudam a tornar seu anúncio mais visível</Alert>

                  <MultiImageUploader onChange={(images: any) => setInputValue('file', images)} />
                </Col>
            },
            {
              header: 'Valor',
              content:
                <Col>
                  <Typography variant="h6" color="black" className=" mb-5" >Defina o valor do produto</Typography>

                  <Row container>
                    <Typography variant="h2" color="black" className="mb-5 text-[#01004c] font-[400]" >R$ </Typography>
                    <Typography variant="h2" color="black" className="mb-5 text-[#01004c] font-[400]" > {form.price ?? '0.00'}</Typography>
                  </Row>

                  <TextInputCustom label="Valor" name="price" onChange={(e) => setInputValue('price', e.target.value)} />

                  <Typography variant="body1" color="black" className="mb-5" >
                    Aceito troca <Switch defaultChecked />
                  </Typography>

                  <LineSpace margin="0" />
                  <Link className="text-center" href="#">Saiba mais sobre os preços</Link>
                  <Alert className="w-[100%] my-10" severity="warning">Quando o preço está muito acima da média e dos outros anúncios, o interesse de possíveis compradores pode ser menor</Alert>
                </Col>
            },
            {
              header: 'Para finalizar',
              content:
                <Col>
                  <TextInputCustom
                      label="CEP da localização do produto*"
                      name="zip_code"
                      onChange={(e) => setInputValue('zip_code', e.target.value)}
                    />
                  <Row container className="mt-5 justify-between align-center">
                    <Typography variant="body1" color="black" className="mb-5 pt-2" >
                      Contato: (11) 99999-9999
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
              onClick={() => router.push('./meus-anuncios')} >Ir para meus anúncios</Button>
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
  },
  {
    label: 'Condição*',
    name: 'condition',
  },
  {
    label: 'Tipo',
    name: 'type',
  },
  {
    label: 'Cor',
    name: 'color',
  }
]

const typeProduct = [
  "Eletrônico",
  "Para casa",
  "Moda",
  "Movel",
  "Outros"
];
