import { useState, useEffect } from 'react'
import InputStack from '../components/InputStack'
import { Button,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody } from '@chakra-ui/react'
import axios from 'axios'
import {gethorarios} from '../Data/horario'

const Horario = () => {

  const [horario, sethorario] = useState ([{
    dia:'',
    inicio: '',
    final: '',
    maquina:'',
    user:'',
    status:''
  }])

    useEffect(() => {gethorarios().then(res =>{sethorario(res.data)})
    }, [])

  const horTable =()=>{
    return horario.map(horario=>{
      return(
        <Tr key={horario._id}>
          <Td>{horario.dia}</Td>
          <Td>{horario.inicio}</Td>
          <Td>{horario.final}</Td>
          <Td>{horario.Maquina}</Td>
          <Td>{horario.status}</Td>
        </Tr>
      )
    })
  }


  return (

    <>
      <Container maxW= 'container.xl'>
        <Heading as="h1" size="2xl" textAlign="center" mt="10"> lista de Horarios Disponible</Heading>
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
      </Container> </>

  )
}

export default Horario