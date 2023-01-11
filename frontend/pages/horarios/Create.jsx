import {useState,useEffect} from 'react'
import {Select,Container,Heading,Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {postHorario} from '../../Data/horario'
import {getMaquina} from '../../Data/maquinas'
import router from 'next/router'

const Create = () => {

  const [maquinas, setmaquina] = useState([{
    number:'',
    tipo:'',
    serie:'',
    marca:'',
    capacidad:'',
    observaciones:'',
    usohoras:''
}])



  const [request, setrequest] = useState([{
    dia:'',
    inicio: 0,
    Maquina: ''
  }])

  const handleChange = (e) => {

		setrequest({
			...request,
			[e.target.name]: e.target.value

		})
    console.log(request);
	}

	const onSubmit = async (e) => {
		e.preventDefault()
	  await postHorario(request)
		}

    const maqSel =()=>{
      return maquinas.map(maquina=>{
        return(
          <option key={maquina._id} value={maquina._id}>n°{maquina.number} - {maquina.marca} </option>
        )
      })
    }

    useEffect(() => {getMaquina().then(res =>{setmaquina(res.data)})
  }, [])


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
      <Heading as="h2" size="md" textAlign="center" mt="10">Ingrese el Horario a Crear</Heading>
      <FormControl>
          <FormLabel>Dia</FormLabel>
        <Input placeholder="Dia" name="dia" type= "date"   onChange={handleChange}/>
          <FormLabel>Inicio</FormLabel>
        <Input placeholder="Inicio" name="inicio" type= "text"  onChange={handleChange}/>
        <FormLabel>Maquina</FormLabel>
            <Select  placeholder='Maquina' name="Maquina" onChange={handleChange}>
            {maqSel()}
          </Select>
        <Button mt={4}  type="submit" onClick = {onSubmit}>Crear</Button>
      </FormControl>
      <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
      </Container>
      </>

  )

}

export default Create