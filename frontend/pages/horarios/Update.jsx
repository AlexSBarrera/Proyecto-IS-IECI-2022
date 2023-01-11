import {useState,useEffect} from 'react'
import {Select,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react'
import {updHorario,gethorariosAll} from '../../Data/horario'
import {getMaquina} from '../../Data/maquinas'
import {getusers} from '../../Data/usuario'
import router from 'next/router'

const Update = () => {

  const [users, setusers] = useState ([{
    name:'',
    HorasUso: 0,
    HorasExtra: 0,
    correo:'',
    rol:''
  }])

  const [horarios, sethorario] = useState ([{
    dia:'',
    inicio: '',
    final: '',
    maquina:'',
    user:'',
    status:''
  }])

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
    _id:'',
    dia:'',
    inicio: 0,
    Maquina: '',
    status: '',
    user:''

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
	  await updHorario(request)
		}

    const horSel =()=>{
      return horarios.map(horario=>{
        return(
          <option key={horario._id} value={horario._id}>{horario.inicio}:00 hrs -{horario.final}:00 hrs {horario.dia} - {horario.status}</option>
        )
      })
    }
  
    const userSel =()=>{
      return users.map(users=>{
        return(
          <option key={users._id} value={users._id}>{users.name}</option>
        )
      })
    }

    const maqSel =()=>{
      return maquinas.map(maquina=>{
        return(
          <option key={maquina._id} value={maquina._id}>n°{maquina.number} - {maquina.marca} </option>
        )
      })
    }
    
    useEffect(() => {gethorariosAll().then(res =>{sethorario(res.data)})
  }, [])

  useEffect(() => {getusers().then(res =>{setusers(res.data)})
  }, [])

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
      <Heading as="h2" size="md" textAlign="center" mt="10">Ingrese el Horario a Actualizar</Heading>
      <FormControl>
      <FormLabel>Horario</FormLabel>
            <Select  placeholder='Horario' name="id" onChange={handleChange}>
            {horSel()}
          </Select>
          <FormLabel>Dia</FormLabel>
        <Input placeholder="Dia" name="dia" type= "date" onChange={handleChange}/>
          <FormLabel>Maquina</FormLabel>
            <Select  placeholder='Maquina' name="Maquina" onChange={handleChange}>
              {maqSel()}
            </Select>
          <FormLabel>Status</FormLabel>
        <Input placeholder="Status" name="status" type= "text" onChange={handleChange}/>
        <FormLabel>Usuario</FormLabel>
            <Select placeholder='Usuario' name="user" onChange={handleChange}>
            {userSel()}
          </Select>
        <Button mt={4}  type="submit" onClick = {onSubmit}>Actualizar</Button>
      </FormControl>
      <Button colorScheme="green" variant="link" size="md"  onClick={()=> router.push('../../')}>Volver</Button>
      </Container>
      </>
  )
}

export default Update