'use client'
import React, { useEffect, useState } from "react";
import { alpha, Avatar, InputAdornment, InputBase, Paper, styled, Typography } from "@mui/material";
import { Col, Row, RowScroll } from "@/components/Grids";
import { CalendarTodayOutlined, CheckOutlined, Filter, LocationOnOutlined, ShareOutlined, Shop2Sharp } from "@mui/icons-material";
import LineSpace from "@/components/LineSpace";
import TextIcon from "@/components/TextIcon";
import { ButtonCustom } from "@/components/ButtonCustom";
import SearchIcon from '@mui/icons-material/Search';
import TextInputCustom from "@/components/TextInputCustom";
import SelectSearch from "@/components/SelectSearch";
import ProductsList from "@/components/Products";
import { useAuth } from "../hooks/AuthService";
import AdsService from "@/services/AdsService";
import CategorieService from "@/services/CategorieService";
import { useSearchParams } from "next/navigation";
import UserService from "@/services/UserService";
import SingleAd from "@/components/SingleAd";


export default function Home() {

  const { user: userLogged } = useAuth();
  const searchParams = useSearchParams();
  const idUser = searchParams.get("u") || userLogged?.id;

  const [ads, setAds] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getUser();
    getAds();
    getCategories();
  }, [idUser]);

  const getUser = async () => {
    if (!idUser) return
    const response = await UserService.getById(idUser);
    setUser(response);
  }

  const getAds = async () => {
    console.log(idUser)
    if (!idUser) return
    try {
      const response = await AdsService.getByUserId(idUser);
      setAds(response);
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  }

  const getCategories = async () => {
    try {
      const response = await CategorieService.getAll();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Row container spacing={2} className="p-2 mt-5" >
      <Col size={{ xs: 12, sm: 12, md: 4, lg: 4 }} >
        <Paper variant="outlined" className="rounded-xl p-8" >
          <Row container spacing={2}>
            <Avatar
              alt="Remy Sharp"
              //src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Col>
              <Typography variant="body1" className="text-black mt-3" > {user?.name} </Typography>
              <Typography className="text-black text-sm" > online</Typography>
            </Col>
          </Row>

          <Col className="mt-8">
            <TextIcon
              text={`Na Click e Publique desde ${new Date(user?.created_at).toLocaleDateString()}`}
              icon={<CalendarTodayOutlined className="text-[18px] mr-2" />}
            />
            <TextIcon
              text={`${user?.addresses[0]?.street}, ${user?.addresses[0]?.number} - ${user?.addresses[0]?.district}, ${user?.addresses[0]?.city} - ${user?.addresses[0]?.state}`}
              icon={<LocationOnOutlined className="text-[18px] mr-2" />}
            />

            <LineSpace width={'100%'} />

            <Typography variant="body1" className="text-black mb-3" > Nível de cadastro</Typography>
            <TextIcon
              text="Endereço de e-mail"
              icon={<CheckOutlined className="text-[18px] mr-2" />}
            />
            <TextIcon
              text="Número de telefone"
              icon={<CheckOutlined className="text-[18px] mr-2" />}
            />
            <TextIcon
              text="Conta do Facebook"
              icon={<CheckOutlined className="text-[18px] mr-2" />}
            />

            <LineSpace width={'100%'} />

            <ButtonCustom
              variant="contained"
              className="mb-5"
              startIcon={<Shop2Sharp />}
            >Quero uma loja profissional</ButtonCustom>

            <TextIcon
              text="Compartilhar"
              icon={<ShareOutlined className="text-[18px] mr-2" />}
            />
          </Col>
        </Paper>
      </Col>

      <Col className="px-3" size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
        <Typography variant="body1" className="text-black mb-3" >Histórico</Typography>
        <Paper variant="outlined" className="rounded-xl p-5 mb-5" >

          <Filter className="text-[25px] mb-2" />
          <Typography variant="body1" className="text-black" >{ads.length} anúncios</Typography>
          <Typography variant="body1" className="text-black text-sm" >Publicados nos últimos 180 dias</Typography>
        </Paper>

        <Typography variant="body1" className="text-black mb-1" >Anúncios do vendedor</Typography>
        <Typography variant="body1" className="text-black mb-2 text-sm" >{ads.length} anúncios publicados</Typography>

        <TextInputCustom
          placeholder="Filtrar por..."
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            },
          }}
        />

        <Row container spacing={2} >
          <Col><SelectSearch placeholder="Selecione uma categoria" options={categories} /></Col>
          <Col><SelectSearch placeholder="Localização" /></Col>
          <Col><SelectSearch placeholder="Ordenar por" /></Col>
        </Row>

        <Paper variant="outlined" className="rounded-xl p-5 mt-5 mb-10" >
          <RowScroll className="py-5 px-1">
            {ads.map((ad: any, idx: number) => (
              idx < 10 && <Col key={'ad2' + idx} className="w-[230px] mr-2" style={{ display: 'inline-block' }} ><SingleAd key={'ad' + idx} ad={ad} /></Col>
            ))}
          </RowScroll>
        </Paper>
      </Col>


    </Row>
  );
}
