import {React, useState} from 'react'
import { Container, Stack, Button, Heading, HStack} from '@chakra-ui/react'
import {createtipoMaquina} from '../Data/Tipomaq'
import Inputform from '../components/Inputform'
import {useRouter} from 'next/router'

const Createtipotemaquina = () => {
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
                        Barrera Horario
                        </Button>
                    </div>
                    }
                </div>
            </header>
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
    </>
)
}

export default Createtipotemaquina