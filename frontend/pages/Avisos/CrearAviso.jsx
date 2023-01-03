import { useState, useEffect } from 'react';
import {Select,Container,Heading,HStack,Input,Stack,Table,Th,Tr,Td, Thead, Tbody, Button, FormControl, FormLabel } from '@chakra-ui/react';
import Router from 'next/router';
import Avisos from '../../Data/Avisos';
import axios from 'axios';


const crearAviso = () => {
    const [titulo, setTitulo] = useState([
        {
            titulo: '',
            mensaje: '',
            fecha: '',
        }
    ]);
    const [Avisos, setAvisos] = useState([
        {
            titulo: '',
            mensaje: '',
            fecha: '',
        }
    ]);
    const getAvisos = async() => {
        const response = await axios.get(`${process.env.SERVIDOR}/Msmboard/getAviso`);
        getAvisos(response.data);
    };
    const tableAvisos = () => {
        return Avisos.map(Avisos => {
            return (
                <Tr key={Avisos._id}>
                    <Td>{Avisos.titulo}</Td>
                    <Td>{Avisos.mensaje}</Td>
                    <Td>{Avisos.fecha}</Td>
                </Tr>
            )
        })
    };
    const handleChange = (e) => {
        setTitulo({
            ...titulo,
            [e.target.name]: e.target.value
        })
        console.log("titulo = ", titulo.titulo);
        console.log("mensaje = ", titulo.mensaje);
        console.log("fecha = ", titulo.fecha);
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        await Avisos(titulo.titulo, titulo.mensaje, titulo.fecha)
    }
    useEffect(() => {
        getAvisos().then(res => {
            setAvisos(res.data)
        })
    }, [])

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
                    <Button variant="contained" color="primary" style={{backgroundColor: '#4caf50', padding: '8px 13px', borderRadius: '5px', color: '#fff'}}>
                    Anuncios 
                    </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: '#4caf50', padding: '8px 13px', borderRadius: '5px', color: '#fff'}}>
                    Maquinas
                    </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: '#4caf50', padding: '8px 13px', borderRadius: '5px', color: '#fff'}}>
                    Horarios
                    </Button>
                </div>
            </header>
            <Container>
                <Heading>Avisos</Heading>
                <Stack>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Titulo</Th>
                                <Th>Mensaje</Th>
                                <Th>Fecha</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tableAvisos()}
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        </>

    )
}

export default crearAviso;
