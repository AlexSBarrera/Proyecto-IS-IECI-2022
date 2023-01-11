import {useState,useEffect} from 'react'
import {Select,Container,Heading,Input,Button, FormControl, FormLabel } from '@chakra-ui/react'
import {gethorariosAll,delHorario} from '../../Data/horario'
import router from 'next/router'

const Delete = () => {

  const [horarios, sethorario] = useState ([{
    dia:'',
    inicio: '',
    final: '',
    maquina:'',
    user:'',
    status:''
  }])

  const [request, setrequest] = useState([{
    id:''
  }])

  const handleChange = (e) => {

		setrequest({
			...request,
			[e.target.name]: e.target.value
		})
    console.log ("id = ",request.id)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
	  await delHorario( request.id, request.user)
		}

    useEffect(() => {gethorariosAll().then(res =>{sethorario(res.data)})
  }, [])

  const horSel =()=>{
    return horarios.map(horario=>{
      return(
        <option key={horario._id} value={horario._id}>{horario.inicio}:00 hrs -{horario.final}:00 hrs {horario.dia} - {horario.status}</option>
      )
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
                        Borrar Horario
                        </Button>
                    </div>
                    }
                </div>
            </header>

      <Container maxW="2xl">
      <Heading as="h2" size="md" textAlign="center" mt="10">Ingrese el Horario a Borrar</Heading>
      <FormControl>
                <FormLabel>Horario</FormLabel>
            <Select  placeholder='Horario' name="id" onChange={handleChange}>
            {horSel()}
          </Select>

        <Button mt={4}  type="submit" onClick = {onSubmit}>Borrar</Button>
      </FormControl>
      <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
      </Container>
      </>

  )

}

export default Delete