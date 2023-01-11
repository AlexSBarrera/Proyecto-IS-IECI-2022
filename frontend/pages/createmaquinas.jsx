import {React, useState} from 'react'
import { Container, Stack, Button, Heading, HStack, Select} from '@chakra-ui/react'
import {createMaquina} from '../data/maquinas'
import Inputform from '../components/Inputform'
import Textareainput from '../components/Textareainput'
import {useRouter} from 'next/router'

const Createmaquinas = () => {
    const [maquina, setmaquina] = useState({
        number:'',
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
            <Inputform label="Numero de maquina" handleChange={handleChange} name="number" placeholder="Numero de maquina" type="text" value={maquina.number}/>
            <Inputform label="Tipo" handleChange={handleChange} name="tipo" placeholder="Tipo" type="text" value={maquina.tipo}/>
            <Inputform label="Serie" handleChange={handleChange} name="serie" placeholder="Serie" type="text" value={maquina.serie}/>
            <Inputform label="Marca" handleChange={handleChange} name="marca" placeholder="Marca" type="text" value={maquina.marca}/>
            <Inputform label="Capacidad" handleChange={handleChange} name="capacidad" placeholder="Capacidad" type="number" value={maquina.capacidad}/>
            <Textareainput label="Observaciones" handleChange={handleChange} name="observaciones" placeholder="Observaciones" type="text" value={maquina.observaciones}/>
            <Inputform label="Uso de horas" handleChange={handleChange} name="usohoras" placeholder="Uso de horas" type="text" value={maquina.usohoras}/>
            <HStack spacing="4">
            <Button colorScheme="cyan" variant="outline" size="md" onClick={submitmaquina}>Agregar</Button>
            <Button colorScheme="red" variant="outline" size="md" onClick={()=> router.push('./Maquinas')}>Cancelar</Button>
            <Button colorScheme="blue" variant="outline" size="md" onClick={()=> router.push('./Maquinas')}>Volver</Button>
            </HStack>
        </Stack>
    </Container>
    </>       
  )
}

export default Createmaquinas