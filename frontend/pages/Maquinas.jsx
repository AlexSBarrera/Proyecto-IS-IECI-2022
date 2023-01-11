import {React, useEffect, useState} from 'react'
import { Container, Heading, Table, Thead, Tr, Td, Tbody, Button, Stack, HStack   } from '@chakra-ui/react'
import {getMaquina} from '../data/maquinas'
import {useRouter} from 'next/router'


const Maquinas = () => {
  const [maquina, setmaquina] = useState([{
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
      <Tr key={maquina._id}>
        <Td>{maquina.number}</Td>
        <Td>{maquina.tipo}</Td>
        <Td>{maquina.serie}</Td>
        <Td>{maquina.marca}</Td>
        <Td>{maquina.capacidad}</Td>
        <Td>{maquina.observaciones}</Td>
        <Td>{maquina.usohoras}</Td>
        <Td>
        <HStack spacing="4">
          <Button colorScheme="cyan" variant="outline" size="md" onClick={()=>router.push(`../Maquinas/${maquina.id}`)}>Editar</Button>
          <Button colorScheme="red" variant="outline" size="md" >Eliminar</Button>
        </HStack>
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
            </Tr>
          </Thead>
          <Tbody>
            {contentTable()}
          </Tbody>
        </Table>
        <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('./')}>Volver</Button>
        <Button colorScheme="blue" variant="link" size="md"  onClick={()=> router.push('../Tipomaq')}>Tipo de Maquina</Button>
      </Stack>
    </Container>
  </>
  )
}


export default Maquinas
