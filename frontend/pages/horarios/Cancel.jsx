import {useState} from 'react'
import {Select,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {sendCancel} from '../../Data/horario'
import router from 'next/router'

const Cancel = () => {

  const [request, setrequest] = useState([{
    id:'',
    user: '',
  }])

  const handleChange = (e) => {

		setrequest({
			...request,
			[e.target.name]: e.target.value
		})
    console.log ("id = ",request.id)
    console.log ("user = ",request.user)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
	  await sendCancel( request.id, request.user)
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
                    </div>
                    }
                </div>
            </header>

      <Container maxW="2xl">
      <Heading as="h2" size="md" textAlign="center" mt="10">Ingrese el Horario a Cancelar</Heading>
      <FormControl>
        <FormLabel>Horario</FormLabel>
        <Input placeholder="Horario" name="id" type= "text" onChange={handleChange}/>
          <FormLabel>Usuario</FormLabel>
        <Input placeholder="Usuario" name="user" type= "text" onChange={handleChange}/>
        <Button mt={4}  type="submit" onClick = {onSubmit}>Cancelar</Button>
      </FormControl>
      <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
      </Container>
      </>

  )

}

export default Cancel