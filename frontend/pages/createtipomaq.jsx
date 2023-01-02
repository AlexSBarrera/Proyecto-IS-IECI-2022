import {React, useState} from 'react'
import { Container, Stack, Button, Heading, HStack} from '@chakra-ui/react'
import {createtipoMaquina} from '../data/Tipomaq'
import Inputform from '../Component/Inputform'
import {useRouter} from 'next/router'

const createtipotemaquina = () => {
    const [tipomaquina, settipomaquina] = useState({
        tipo:'',
        precio:'',
    })
    const router = useRouter()

    const handleChange = (e) => {
        settipomaquina({
            ...tipomaquina,
            [e.target.id]: e.target.value
        })
    }
    const submittipomaquina = (e) => {
        e.preventDefault()
        createtipoMaquina(tipomaquina).then (res => {
            console.log(res)
        })
    }
  return (
    <Container maxW="container.lg" p="15">
        <Heading as="h1" spacing="8" p="5">Crear Nueva Maquina</Heading>
        <Stack spacing="4" direction="column">
            <Inputform label="Tipo" handleChange={handleChange} name="tipo" placeholder="Tipo" type="text" value={tipomaquina.tipo}/>
            <Inputform label="Precio" handleChange={handleChange} name="precio" placeholder="Precio" type="number" value={tipomaquina.precio}/>
            <HStack spacing="4">
            <Button colorScheme="cyan" variant="outline" size="md" onClick={submittipomaquina}>Agregar</Button>
            <Button colorScheme="red" variant="outline" size="md" onClick={()=> router.push('./Tipomaq')}>Cancelar</Button>
            </HStack>
        </Stack>
    </Container>
            
  )
}

export default createtipotemaquina