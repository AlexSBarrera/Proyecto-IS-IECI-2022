import {React, useState} from 'react'
import { Container, Stack, Button, Heading, HStack} from '@chakra-ui/react'
import {createMaquina} from '../data/maquinas'
import Inputform from '../Component/Inputform'
import Textareainput from '../Component/Textareainput'
import {useRouter} from 'next/router'

const createmaquinas = () => {
    const [maquina, setmaquina] = useState({
        numero:'',
        tipo:'',
        serie:'',
        marca:'',
        capacidad: 0,
        observaciones:'',
        usohoras: 0
    })
    const router = useRouter()

    const handleChange = (e) => {
        setmaquina({
            ...maquina,
            [e.target.id]: e.target.value
        })
    }
    const submitmaquina = (e) => {
        e.preventDefault()
        createMaquina(maquina).then (res => {
            console.log(res)
        })
    }
  return (
    <Container maxW="container.lg" p="15">
        <Heading as="h1" spacing="8" p="5">Crear Nueva Maquina</Heading>
        <Stack spacing="4" direction="column">
            <Inputform label="Numero de maquina" handleChange={handleChange} name="numero" placeholder="Numero de maquina" type="text" value={maquina.numero}/>
            <Inputform label="Tipo" handleChange={handleChange} name="tipo" placeholder="Tipo" type="text" value={maquina.tipo}/>
            <Inputform label="Serie" handleChange={handleChange} name="serie" placeholder="Serie" type="text" value={maquina.serie}/>
            <Inputform label="Marca" handleChange={handleChange} name="marca" placeholder="Marca" type="text" value={maquina.marca}/>
            <Inputform label="Capacidad" handleChange={handleChange} name="capacidad" placeholder="Capacidad" type="text" value={maquina.capacidad}/>
            <Textareainput label="Observaciones" handleChange={handleChange} name="observaciones" placeholder="Observaciones" type="text" value={maquina.observaciones}/>
            <Inputform label="Uso de horas" handleChange={handleChange} name="usohoras" placeholder="Uso de horas" type="text" value={maquina.usohoras}/>
            <HStack spacing="4">
            <Button colorScheme="cyan" variant="outline" size="md" onClick={submitmaquina}>Agregar</Button>
            <Button colorScheme="red" variant="outline" size="md" onClick={()=> router.push('./Maquinas')}>Cancelar</Button>
            </HStack>
        </Stack>
    </Container>
            
  )
}

export default createmaquinas