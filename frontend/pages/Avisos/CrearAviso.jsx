import {useState} from 'react'
import {Container,Heading,Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {postAviso} from '../../Data/Avisos'
import router from 'next/router'
import Inputform from '../../components/Inputform'

const CrearAviso = () => {

    const [mensaje, setmensaje] = useState([{
        titulo:'',
        mensaje: '',
        dia: ''
    }])

    const handleChange = (e) => {
    setmensaje({
        ...mensaje,
        [e.target.name]: e.target.value
    })
	}

	const onSubmit = (e) => {
        e.preventDefault()
        postAviso(mensaje).then (res => {
            console.log(res);
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
                    </div>
                    }
                </div>
            </header>

    <Container maxW="2xl">
    <Heading as="h2" size="md" textAlign="center" mt="10">Crear aviso</Heading>
    <FormControl>
        <FormLabel>Titulo</FormLabel>
            <Input type= "text" isRequired="true" onChange={handleChange}/>
        <FormLabel>Mensaje</FormLabel>
            <Input value={mensaje.mensaje} size='lg' type= "text" isRequired="true" onChange={handleChange}/>
        <FormLabel>Dia</FormLabel>    
            <Input value={mensaje.dia} placeholder="Dia" name="dia" type= "date" isRequired="true"  onChange={handleChange}/>
        <Button mt={4}  type="submit" onClick = {onSubmit}>Postear</Button>
    </FormControl>
    <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
    </Container>
    </>
)}

export default CrearAviso   