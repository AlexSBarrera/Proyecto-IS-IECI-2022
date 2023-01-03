import {React, useState} from 'react'
import { Container, Stack, Button, Heading} from '@chakra-ui/react'
import {updateMaquina, getSpecificMaquina } from '../../data/maquinas'
import Inputform from '../../Component/Inputform'
import Textareainput from '../../Component/Textareainput'
import { useRouter } from 'next/router'

export const getServerSideProps = async (Context) => {
    const response = await getSpecificMaquina(Context.query.maq)
    return {
        props: {
            maq: response.data
        }
    }
}

const editar = ({ maq }) => {
    console.log(maq)
    const [maquina, setmaquina] = useState(maq)
    const router = useRouter()

    const handleChange = (e) => {
        setmaquina({
            ...maquina,
            [e.target.id]: e.target.value
        })
    }
    const submitmaquina = (e) => {
        e.preventDefault()
        updateMaquina(maquina).then (res => {
        console.log(res)
        })
    }
  return (

    <Container maxW="container.lg" p="15">
       <Heading as="h1" spacing="8" p="5">Editar Maquina</Heading>
        <Stack spacing="4" direction="column">
        <Inputform label="Numero de maquina" handleChange={handleChange} name="numero" placeholder="Numero de maquina" type="text" value={maquina.number}/>
            <Inputform label="Tipo" handleChange={handleChange} name="tipo" placeholder="Tipo" type="text" value={maquina.tipo}/>
            <Inputform label="Serie" handleChange={handleChange} name="serie" placeholder="Serie" type="text" value={maquina.serie}/>
            <Inputform label="Marca" handleChange={handleChange} name="marca" placeholder="Marca" type="text" value={maquina.marca}/>
            <Inputform label="Capacidad" handleChange={handleChange} name="capacidad" placeholder="Capacidad" type="text" value={maquina.capacidad}/>
            <Textareainput label="Observaciones" handleChange={handleChange} name="observaciones" placeholder="Observaciones" type="text" value={maquina.observaciones}/>
            <Inputform label="Uso de horas" handleChange={handleChange} name="usohoras" placeholder="Uso de horas" type="text" value={maquina.usohoras}/>
            <Button colorScheme="cyan" variant="outline" size="md" onClick={submitmaquina}>Guardar</Button>
            <Button colorScheme="red" variant="outline" size="md" onClick={()=> router.push('./Maquinas')}>Cancelar</Button>
        </Stack>
    </Container>
            
  )
}

export default editar