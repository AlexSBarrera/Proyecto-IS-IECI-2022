import { useState, useEffect } from 'react';
import {Select,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react';
import router from 'next/router';
import Avisos from '../../Data/Avisos';
import axios from 'axios';
import {getAvisos} from '../../Data/Avisos';


const CrearAviso = () => {
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [fecha, setFecha] = useState(Date.now());
    const [titulo, setTitulo] = useState([
        {
            titulo: '',
            mensaje: '',
        }
    ]);

    const handleSubmit = (e) => {
        setTitulo({
            ...titulo,
            [e.target.name]: e.target.value
        })
        console.log("titulo = ", titulo.titulo);
        console.log("mensaje = ", titulo.mensaje);   
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        await Avisos(titulo.titulo, titulo.mensaje)
    }

    return (
        <>
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
            <style>
                {`
                    body {
                        background: #008080;
                    }
                `}
            </style>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Titulo"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Mensaje"
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
        </>

    )
}

export default CrearAviso;
