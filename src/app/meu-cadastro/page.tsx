'use client'
import * as React from 'react';
import {
  TextField,
  Typography,
  Box,
  Paper,
  Link,
  Radio,
  Grid2,
  Alert,
} from '@mui/material';
import { Col, Row } from '@/components/Grids';

import { ButtonCustom } from '@/components/ButtonCustom';
import { useAuth } from "../hooks/AuthService";
import UserService from '@/services/UserService';
import { CheckCircleOutline } from '@mui/icons-material';

export default function Cadastro() {

  const { user, login, register, updateUser } = useAuth();
  const [typeUser, setTypeUser] = React.useState<any>('1');
  const [gender, setGender] = React.useState<any>('1');
  const [infoUpdated, setInfoUpdated] = React.useState<any>(false);
  const [addressUpdated, setAddressUpdated] = React.useState<any>(false);
  const [totalscore, setTotalScore] = React.useState<any>(0);

  React.useEffect(() => {
    getUser(user?.id);
    setTypeUser(user?.type_user);
    setGender(user?.gender);
    getScore();
  }, [user?.id]);

  async function getUser(id: any) {
    if(!id) return
    const response = await UserService.getById(id);
  }

  async function handleSubmitData(e: any) {
    e.preventDefault()

    const notAllowed = ['email', 'cpf'];
    const form: any = {};

    for (let index = 0; index < e.target.length; index++) {
      if (
        e.target[index].name
        && !notAllowed.includes(e.target[index].name)
        && e.target[index].value != ""
      )
        form[e.target[index].name] = e.target[index].value;
    }

    form['type_user'] = typeUser;
    form['gender'] = gender;

    const response: any = await UserService.update(user?.id as string, form);
    updateUser({
      ...user,
      ...response
    });
    handlerInfoUpdated();
  }

  const handleSubmitAddress = async (e: any) => {
    e.preventDefault()

    const form: any = {};
    for (let index = 0; index < e.target.length; index++) {
      if (e.target[index].name)
        form[e.target[index].name] = e.target[index].value;
    }

    form['user_id'] = user?.id;

    if (!user?.addresses?.[0]?.id) {
      const response = await UserService.createAddress(form);
      updateUser({
        ...user,
        addresses: [response]
      })
    } else {
      const response = await UserService.updateAddress(user.addresses?.[0].id, form);
      updateUser({
        ...user,
        addresses: [response]
      })
    }

    handlerAddressUpdated();
  }

  /*const handleSubmitPhone = async(e: any) => {
    e.preventDefault()

    const form: any = {};
    for (let index = 0; index < e.target.length; index++) {
      if (e.target[index].name)
        form[e.target[index].name] = e.target[index].value;
    }
 
    const response = await UserService.update(user?.address?.id as string, form);
    console.log(response);
    
  }*/

  const handlerTypeUser = (e: any) => {
    setTypeUser(e.target.value);
  }

  const handlerGender = (e: any) => {
    setGender(e.target.value);
  }

  const handlerInfoUpdated = () => {
    setInfoUpdated(true);
    setTimeout(() => {
      setInfoUpdated(false);
    }, 3000);
  }

  const handlerAddressUpdated = () => {
    setAddressUpdated(true);
    setTimeout(() => {
      setAddressUpdated(false);
    }, 3000);
  }

  const handlerCep = (e: any) => {
    if (e.target.value.length == 8)
    fetch(`https://viacep.com.br/ws/${e.target.value}/json/`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('street')?.setAttribute('value', data.logradouro);
        document.getElementById('district')?.setAttribute('value', data.bairro);
        document.getElementById('city')?.setAttribute('value', data.localidade);
        document.getElementById('state')?.setAttribute('value', data.uf);
      })
  }

  const getScore = async() => {
    const score: any = await UserService.getScore(user?.id as string);

    const totalPoints = score.reduce((sum: any, score: any) => {
      return sum + (score.score_category?.points || 0);
    }, 0);

    setTotalScore(totalPoints);
  }

  return (
    <Col container spacing={2} p={2} style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h6" className="text-black mt-5 border-b" >
        Atualmente você tem <strong>{totalscore}</strong> pontos
      </Typography>

      <Typography variant="h5" className="text-black mt-5" >
        Meu cadastro
      </Typography>

      <Paper elevation={2} variant="outlined" className="rounded-xl p-5 max-w-[550px]" >
        <Col mb={5}>
          <Box pt={3}>

            <form onSubmit={handleSubmitData}>

              <Typography variant="h6" className="text-black" >
                Dados da conta
              </Typography>

              <Row container spacing={2}>
                <Typography variant="body1" color="black" className="" >
                  Pessoa física <Radio name="type_user" value="PF" checked={typeUser === 'PF'} onChange={handlerTypeUser} />
                </Typography>

                <Typography variant="body1" color="black" className="" >
                  Pessoa jurídica <Radio name="type_user" value="PJ" checked={typeUser === 'PJ'} onChange={handlerTypeUser} />
                </Typography>
              </Row>


              <Box>
                <TextField
                  focused
                  margin="normal"
                  required
                  fullWidth
                  name="cpf"
                  disabled
                  defaultValue={user?.cpf}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  autoComplete="email"
                  disabled
                  defaultValue={user?.email}
                />
                <TextField
                  focused
                  margin="normal"
                  required
                  fullWidth
                  label="Como você quer ser chamado(a)?"
                  name="name"
                  defaultValue={user?.name}
                  helperText="Aparecerá em seu perfil, anúncios e chats."
                />
                <TextField
                  focused
                  margin="normal"
                  fullWidth
                  label="Telefone"
                  name="phone"
                  defaultValue={user?.phone}
                />
                <TextField
                  focused
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  className='mb-5'
                  helperText="Sua senha deve ter pelo menos 6 caracteres"
                />

                <TextField
                  focused
                  margin="normal"
                  required
                  type="date"
                  name="date_birth"
                  defaultValue={user?.date_birth}
                />

                <Typography variant="body1" className="text-black mt-3" >
                  Gênero
                </Typography>
                <Row container spacing={2}>
                  <Typography variant="body1" color="black" className="" >
                    Feminino <Radio name="gender" value="1" checked={gender === '1'} onChange={handlerGender} />
                  </Typography>

                  <Typography variant="body1" color="black" className="" >
                    Masculíno <Radio name="gender" value="2" checked={gender === '2'} onChange={handlerGender} />
                  </Typography>

                  <Typography variant="body1" color="black" className="" >
                    Não informar <Radio name="gender" value="3" checked={gender === '3'} onChange={handlerGender} />
                  </Typography>
                </Row>

                <ButtonCustom
                  type="submit"
                  className='mt-5'
                >
                  Salvar alterações
                </ButtonCustom>

                {infoUpdated && <Alert className='mt-5' icon={<CheckCircleOutline fontSize="inherit" />} severity="success">
                  Dados pessoais alterados com sucesso!
                </Alert>}

              </Box>

            </form>

          </Box>
        </Col>
      </Paper>



      <Paper elevation={2} variant="outlined" className="rounded-xl p-5 max-w-[550px] mb-5" >

        <Col mb={5}>
          <Box pt={3}>

            <form onSubmit={handleSubmitAddress}>

              <Typography variant="h6" className="text-black" >
                Meu endereço
              </Typography>

              <Grid2 container>
                {inputsAddress.map((input) => (
                  <Col size={{ md: input.size }} key={input.name}>
                    <TextField
                      focused
                      margin="normal"
                      required
                      label={input.label}
                      name={input.name}
                      id={input.name}
                      style={{ marginRight: 10 }}
                      defaultValue={user?.addresses?.[0]?.[input.name]}
                      onChange={input.name === 'zip_code' ? handlerCep : undefined}
                    />
                  </Col>
                ))}


                <ButtonCustom
                  type="submit"
                  className='my-5'
                >
                  Salvar alterações
                </ButtonCustom>

                {addressUpdated && <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="success">
                  Endereço atualizado com sucesso!
                </Alert>}

              </Grid2>

            </form>

          </Box>
        </Col>
      </Paper>

      {/*<Paper elevation={2} variant="outlined" className="rounded-xl p-5 max-w-[550px] mb-5" >
        <Col mb={5}>
          <Box pt={3}>

            <form onSubmit={handleSubmitPhone}>

              <Typography variant="h6" className="text-black" >
                Meu telefone
              </Typography>

                  <Col>
                    <TextField
                      focused
                      margin="normal"
                      required
                      label="Telefone"
                      name="phone"
                      style={{ marginRight: 10 }}
                      defaultValue={user?.phones?.[0]?.number}
                    />
                  </Col>                
               
                <ButtonCustom
                  type="submit"
                  className='mt-5'
                >
                  Salvar alterações
                </ButtonCustom>

            </form>

          </Box>
        </Col>
      </Paper>*/}

    </Col>
  );
}


const inputsAddress = [
  { label: 'CEP', name: 'zip_code', size: 12 },
  { label: 'Rua', name: 'street', size: 12 },
  { label: 'Número', name: 'number', size: 4 },
  { label: 'Complemento', name: 'complement', size: 8 },
  { label: 'Bairro', name: 'district', size: 4 },
  { label: 'Cidade', name: 'city', size: 4 },
  { label: 'Estado', name: 'state', size: 4 },
]