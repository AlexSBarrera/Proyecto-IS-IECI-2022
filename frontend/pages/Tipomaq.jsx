import {React, useEffect, useState} from 'react'
import { Container, Heading, Table, Thead, Tr, Td, Tbody, Button, Stack} from '@chakra-ui/react'
import {gettipoMaquina} from '../Data/Tipomaq'
import {useRouter} from 'next/router'


const Tipomaq = () => {
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
            <Tr key={tipomaquina._id}>
            <Td>{tipomaquina.tipo}</Td>
            <Td>{tipomaquina.precio}</Td>
            <Td>
            <Button colorScheme="cyan" variant="outline" size="md" onClick={()=>router.push(`./Tipomaq/${tipomaquina._id}`)}>Editar</Button>
            <Button colorScheme="red" variant="outline" size="md" onClick="a">Eliminar</Button>
            </Td>
            </Tr>
        )
    }, [])
    };
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

    <Container maxW="container.xl" p="10">
    <Heading as="h1"spacing="8" p="5">
    Maquinas
    </Heading>
    <Button colorScheme="cyan" mt="10" mb="10" onClick={()=>router.push('./createtipomaquinas')}>Agregar Maquina</Button>
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

export default Tipomaq