import { useState, useEffect } from 'react'
import {Select,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {gethorarios,sendReserv} from '../../Data/horario'

const Reserva = () => {

  const [horarios, sethorario] = useState ([{
    dia:'',
    inicio: '',
    final: '',
    maquina:'',
    user:'',
    status:''
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


    useEffect(() => {gethorarios().then(res =>{sethorario(res.data)})
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


  return (

    <>
    <style>
                {`
                    body {
                        background: #008080;
                    }
                `}
    </style>
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
      <Heading as="h2" size="md" textAlign="center" mt="10">Seleccione su Horario</Heading>
      <FormControl>
        <FormLabel>Horario</FormLabel>
            <Select placeholder='Horario' name="id" onChange={handleChange}>
            {horSel()}
          </Select>
          <FormLabel>Usuario</FormLabel>
          <Input placeholder="Usuario" name="user" type= "text" onChange={handleChange}/>
          <Button mt={4} variantColor="teal" type="submit" onClick = {onSubmit}>Reservar</Button>
      </FormControl>
      </Container>
      </>

  )

}

export default Reserva