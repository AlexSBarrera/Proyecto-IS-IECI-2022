import {React, useEffect, useState} from 'react'
import { Container, Heading, Table, Thead, Tr, Td, Tbody, Button, Stack   } from '@chakra-ui/react'
import {getMaquina} from '../data/maquinas'
import {useRouter} from 'next/router'


const index = () => {
  const [maquina, setmaquina] = useState([{
    id:'',
    number:'',
    tipo:'',
    serie:'',
    marca:'',
    capacidad:'',
    observaciones:'',
    usohoras:''
}])

 const router = useRouter()


useEffect(() => {
    getMaquina().then(res => {
        setmaquina(res.data)
    })
}, [])

const contentTable = () => {
    return maquina.map(maquina => {
    return (
        <Tr key={maquina.id}>
        <Td>{maquina.number}</Td>
        <Td>{maquina.tipo}</Td>
        <Td>{maquina.serie}</Td>
        <Td>{maquina.marca}</Td>
        <Td>{maquina.capacidad}</Td>
        <Td>{maquina.observaciones}</Td>
        <Td>{maquina.usohoras}</Td>
        <Button colorScheme="cyan" variant="outline" size="md" onClick={()=>router.push(`./Maquinas/update${maquina._id}`)}>Editar</Button>
        <Button colorScheme="red" variant="outline" size="md">Eliminar</Button>
        </Tr>
    )
    }, [])
};



return (
    <>
    <Container maxW="container.xl" p="10">
      <Heading as="h1"spacing="8" p="5">Maquinas</Heading>
      <Button colorScheme="cyan" mt="10" mb="10" onClick={()=>router.push('./createmaquinas')}>Agregar Maquina</Button>
      <Stack spacing={4} mt="10">
        <Table variant="simple">
          <Thead>
            <Tr>
                <Td>Numero de maquina</Td>
                <Td>Tipo</Td>
                <Td>Serie</Td>
                <Td>Marca</Td>
                <Td>Capacidad</Td>
                <Td>Observaciones</Td>
                <Td>Uso horas</Td>
                <Td>Editar</Td>
            </Tr>
          </Thead>
          <Tbody>
            {contentTable()}
          </Tbody>
        </Table>
        <Button colorScheme="red" variant="outline" size="md" onClick={()=> router.push('./')}>Volver</Button>
      </Stack>
    </Container>
  </>
  )
}


export default index
