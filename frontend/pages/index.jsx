import React from 'react'
import { Button, Container, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
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

    <Container maxW="container.sm" p="15">
      <Heading as="h1" spacing="8" p="15">Menú Principal</Heading>
      <Heading as="h2" spacing="8" p="15">Seleccione una opción</Heading>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./Maquinas')}>Maquinas</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./horarios/Reserva')} >Reserva Horarios</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./horarios/Cancel')}>Cancelar Horarios</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./horarios/Create')}>Crear Horarios</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./horarios/Update')}>Actualizar Horarios</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./horarios/Delete')}>Borrar Horarios</Button>
      <Button colorScheme="blue" variant="solid" size="md" onClick={()=> router.push('./Avisos/CrearAviso')}>Avisos</Button>
      
    </Container>
    </div>
      </header>
    </>
  )
}

export default Index