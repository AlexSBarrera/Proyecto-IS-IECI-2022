import { useState, useEffect } from 'react'
import {Select,Container,Heading,Input,Stack,Table,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {gethorariosAll,sendReserv} from '../../Data/horario'
import {getusers} from '../../Data/usuario'
import router from 'next/router'

const Reserva = () => {

  const [horarios, sethorario] = useState ([{
    dia:'',
    inicio: '',
    final: '',
    maquina:'',
    user:'',
    status:''
  }])

  const [users, setusers] = useState ([{
    name:'',
    HorasUso: 0,
    HorasExtra: 0,
    correo:'',
    rol:''
  }])

  const [request, setrequest] = useState ([{
    id:'',
    user: '',
  }])

  const handleChange = (e) => {

		setrequest({
			...request,
			[e.target.name]: e.target.value
		})
    console.log ("id = ",request.id)
    console.log ("user = ",request.user)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
	  await sendReserv( request.id, request.user)
		}


    useEffect(() => {gethorariosAll().then(res =>{sethorario(res.data)})
    }, [])

    useEffect(() => {getusers().then(res =>{setusers(res.data)})
    }, [])

  const horTable =()=>{
    return horarios.map(horario=>{
      return(
        <Tr key={horario._id}>
          <Td>{horario.dia}</Td>
          <Td>{horario.inicio}:00 hrs</Td>
          <Td>{horario.final}:00 hrs</Td>
          <Td>{horario.Maquina}</Td>
          <Td>{horario.status}</Td>
        </Tr>
      )
    })
  }

  const horSel =()=>{
    return horarios.map(horario=>{
      return(
        <option key={horario._id} value={horario._id}>{horario.inicio}:00 hrs -{horario.final}:00 hrs {horario.dia}</option>
      )
    })
  }

  const userSel =()=>{
    return users.map(users=>{
      return(
        <option key={users._id} value={users._id}>{users.name}</option>
      )
    })
  }
  const [open, setOpen] = useState(false);

  return (

    <>
<style>
                {`
                    body {
                        background: #008080;
                    }
                `}
    </style>

    <header style={{backgroundColor: '#00bcd4', height: '95px'}}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" color="primary" style={{backgroundColor: '#4caf50', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../Avisos/CrearAviso')}>
                    Anuncios
                    </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: '#4caf50', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../Maquinas')}>
                    Maquinas
                    </Button>
                    <Button onClick={() => setOpen(!open)} variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}}>
                    Opciones Horarios
                    </Button>
                    { open &&
                    <div>
                        <Button variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../horarios/Reserva')}>
                        Reserva Horario
                        </Button>
                        <Button variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../horarios/Cancel')}>
                        Cancela Horario
                        </Button>
                        <Button variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../horarios/Create')}>
                        Crear Horario
                        </Button>
                        <Button variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../horarios/Update')}>
                        Actualizar Horario
                        </Button>
                        <Button variant="contained" color="primary" style={{backgroundColor: 'black', padding: '8px 13px', borderRadius: '5px', color: '#fff'}} onClick={()=> router.push('../horarios/Delete')}>
                        Borrar Horario
                        </Button>
                    </div>
                    }
                </div>
            </header>

      <Container maxW= '2xl'  centerContent>
        <Heading as="h2" size="2xl" textAlign="center" mt="10"> lista de Horarios Disponible</Heading>
          <Stack spacing={4} mt="10">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Td>Fecha</Td>
                  <Td>Inicio</Td>
                  <Td>Final</Td>
                  <Td>Maquina</Td>
                  <Td>status</Td>
                </Tr>
              </Thead>
              <Tbody>
                {horTable()}
              </Tbody>
            </Table>
          </Stack>
      </Container>
      <></>
      <Container maxW="2xl">
      <Heading as="h2" size="md" textAlign="center" mt="10">Seleccione su Horario a reservar</Heading>
      <FormControl>
        <FormLabel>Horario</FormLabel>
            <Select  placeholder='Horario' name="id" onChange={handleChange}>
            {horSel()}
          </Select>

          <FormLabel>Usuario</FormLabel>
            <Select placeholder='Usuario' name="user" onChange={handleChange}>
            {userSel()}
          </Select>
          <Button mt={4} type="submit" onClick = {onSubmit}>Reservar</Button>
      </FormControl>
      <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
      </Container>
      </>

  )

}

export default Reserva