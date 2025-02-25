'use client'
import React, { useState } from "react";
import { Alert, Button, Grid2, Link, Modal, Paper, Switch, Typography } from "@mui/material";
import SelectSearch from "@/components/SelectSearch";
import TextInputCustom from "@/components/TextInputCustom";
import { Col, Row } from "@/components/Grids";
import ButtonSelect from "@/components/ButtonSelect";

import LineSpace from "@/components/LineSpace";
import StteperCustom from "@/components/StepperCustom";
import Container from "@/components/Container";
import { environment } from "@/environments/environment";
import { useAuth } from "@/app/hooks/AuthService";
import { CheckCircleOutline, CloseSharp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import MultiImageUploader from "@/components/ImagesSelect";


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
      if(key === 'file'){
        for (let i = 0; i < form.file.length; i++) {
                
          formData.append(key + i, form.file[i]);
        }
      }else{
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

  const onSelectSeriesItems = (value: any) => {
    if (form?.series_items.includes(value)) {
      const newValue = form?.series_items.replace(value + ',', '');
      setForm({
        ...form,
        series_items: newValue
      })
    } else {
      setForm({
        ...form,
        series_items: form?.series_items + value + ',',
      });
    }
  };

  const onSelectAdditionalInfo = (value: any) => {
    if (form?.additional_info.includes(value)) {
      const newValue = form?.additional_info.replace(value + ',', '');
      setForm({
        ...form,
        additional_info: newValue
      })
    } else {
      setForm({
        ...form,
        additional_info: form?.additional_info + value + ',',
      });
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <Container>

      <form method="post" encType="multipart/form-data">
        <input type="hidden" name="user_id" value="7" />
        <StteperCustom
          contents={[
            {
              header: 'Informações do veículo',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px] mb-5" >Qual veículo você quer anunciar?</Typography>
                  <Alert className="w-[100%]" severity="info">Os itens com (*) são obrigatórios</Alert>

                  <TextInputCustom label="marca" name="brand" onChange={(e) => setInputValue('brand', e.target.value)} />

                  <TextInputCustom label="modelo" name="model" onChange={(e) => setInputValue('model', e.target.value)} />

                  <TextInputCustom label="ano" name="year" onChange={(e) => setInputValue('year', e.target.value)} />

                  <TextInputCustom label="versão" name="version" onChange={(e) => setInputValue('version', e.target.value)} />
                </Col>
            },

            {
              header: 'Informações do veículo',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px] mb-5" >Informações do veículo
                  </Typography>
                  <Alert className="w-[100%]" severity="info">Os itens com (*) são obrigatórios</Alert>

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
              header: 'Itens do veículo',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px]  mb-5" >Itens de série e opcionais do seu veículo</Typography>
                  <Row container spacing={1}>
                    {itensCarro.map((item) => (
                      <ButtonSelect key={item} selected={form?.series_items?.includes(item)} onClick={() => onSelectSeriesItems(item)}>{item}</ButtonSelect>
                    ))}
                  </Row>
                </Col>
            },

            {
              header: 'Informações',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px]  mb-5" >Informações adicionais</Typography>
                  <Row container spacing={1}>
                    {caracteristicasCarro.map((item) => (
                      <ButtonSelect key={item} selected={form?.additional_info?.includes(item)} onClick={() => onSelectAdditionalInfo(item)}>{item}</ButtonSelect>
                    ))}
                  </Row>
                </Col>
            },
            {
              header: 'Fotos',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px]  mb-5" >Escolha as fotos do seu anúncio</Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Boas fotos te ajudam a tornar seu anúncio mais visível</Alert>

                  {/*<Image src={fotos} alt="carro" />*/}
                  <MultiImageUploader onChange={(images: any) => setInputValue('file', images)} />
                </Col>
            },
            {
              header: 'Valor',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px]  mb-5" >Defina o valor do veículo</Typography>

                  <Row container>
                    <Typography variant="h2" color="black" className="mb-5 text-[#01004c] font-[400]" >R$ </Typography>
                    <Typography variant="h2" color="black" className="mb-5 text-[#01004c] font-[400]" > {form.price ?? '0.00'}</Typography>
                  </Row>

                  <TextInputCustom label="Valor" name="price" onChange={(e) => setInputValue('price', e.target.value)} />

                  <Typography variant="body1" color="black" className="mb-5" >
                    Aceito troca <Switch defaultChecked />
                  </Typography>

                  <LineSpace margin="0" />

                  <Typography variant="h6" color="black" className="mb-5" >
                    Referência de preço para BA
                  </Typography>

                  <Row container spacing={2}>
                    {precosfipe.map((item, index) => (
                      <Paper key={'fipe'+index} className="mb-5 w-[150px] pt-3 " variant="outlined">
                        <Typography variant="body1" color="black" className="text-center font-[500]" >
                          {item.valor}
                        </Typography>
                        <Typography variant="body2" color="black" className="text-center mb-3 text-uppercase" >
                          {item.tipo}
                        </Typography>
                      </Paper>
                    ))}
                  </Row>

                  <Link className="text-center" href="#">Saiba mais sobre os preços</Link>

                  <Alert className="w-[100%] my-10" severity="warning">Quando o preço está muito acima da média e do Preço Fipe, o interesse de possíveis compradores pode ser menor</Alert>

                </Col>
            },
            {
              header: 'Para finalizar',
              content:
                <Col>
                  <Typography variant="h4" color="black" className="w-[800px]  mb-5" >Crie um título e compartilhe </Typography>
                  <Alert className="w-[100%] mb-10" severity="info">Anúncios mais completos vendem mais rápido.
                  </Alert>

                  <TextInputCustom label="Título*" name="title" onChange={(e) => setInputValue('title', e.target.value)} />
                  <TextInputCustom
                    label="Descrição*"
                    name="description"
                    type="textarea"
                    minRows={3}
                    className="" onChange={(e) => setInputValue('description', e.target.value)} />

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
    </Container>
  );
}


const inputList = [
  {
    label: 'CEP da localização do veículo*',
    name: 'cep',
  },
  {
    label: 'Placa do carro*',
    name: 'plate',
  },
  {
    label: 'Quilometragem (km)*',
    name: 'km',
  },
  {
    label: 'Cor',
    name: 'color',
  },
  {
    label: 'Câmbio',
    name: 'transmission',
  },
  {
    label: 'Quantidade de portas',
    name: 'qtd_doors',
  },
  {
    label: 'Combustível',
    name: 'fuel',
  },
  {
    label: 'Direção',
    name: 'direction',
  },
  {
    label: 'Tipo do veículo',
    name: 'vehicle_type',
  },
]

const itensCarro = [
  "Airbag",
  "Ar Condicionado",
  "Alarme",
  "Bancos de Couro",
  "Blindado",
  "Camera de ré",
  "Com Kit GNV",
  "Conexão USB",
  "Computador de bordo",
  "Controle automático de velocidade",
  "Interface Bluetooth",
  "Navegador GPS",
  "Rodas de liga leve",
  "Sensor de ré",
  "Som",
  "Teto Solar",
  "Tração 4x4",
  "Trava elétrica",
  "Vidro elétrico",
  "Volante multifuncional"
];

const caracteristicasCarro = [
  "Carro de leilão",
  "Com chave reserva",
  "Com garantia de fábrica",
  "Com manual",
  "Com multas",
  "IPVA pago",
  "Ótimo estado",
  "Revisões feitas em concessionária",
  "Único dono",
  "Veículo em financiamento",
  "Veículo quitado"
];

const precosfipe = [

  {
    valor: "R$ 5.000,00",
    tipo: "Mínimo",
  },
  {
    valor: "R$ 10.000,00",
    tipo: "Médio",
  },
  {
    valor: "R$ 15.000,00",
    tipo: "Máximo",
  },
]