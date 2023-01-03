import {React, useEffect, useState} from 'react'
import { Container, Heading, Table, Thead, Tr, Td, Tbody, Button, Stack   } from '@chakra-ui/react'
import {gettipoMaquina} from '../data/Tipomaq'
import {useRouter} from 'next/router'


const index = () => {
  const [tipomaquina, settipomaquina] = useState([{
   
    tipo:'',
    precio:'',
}])

 const router = useRouter()


useEffect(() => {
    gettipoMaquina().then(res => {
        settipomaquina(res.data)
    })
}, [])

const contentTable = () => {
    return tipomaquina.map(tipomaquina => {
    return (
        <Tr key={tipomaquina.id}>
        <Td>{tipomaquina.tipo}</Td>
        <Td>{tipomaquina.precio}</Td>
        <Button colorScheme="cyan" variant="outline" size="md" onClick={()=>router.push(`./Tipomaq/${tipomaquina._id}`)}>Editar</Button>
        <Button colorScheme="red" variant="outline" size="md" onClick="a">Eliminar</Button>
        </Tr>
    )
    }, [])
};



return (
    <>
    <Container maxW="container.xl" p="10">
      <Heading as="h1"spacing="8" p="5">Maquinas</Heading>
      <Button colorScheme="cyan" mt="10" mb="10" onClick={()=>router.push('./createtipomaq')}>Agregar Maquina</Button>
      <Stack spacing={4} mt="10">
        <Table variant="simple">
          <Thead>
            <Tr>
                <Td>Tipo</Td>
                <Td>Precio</Td>
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
