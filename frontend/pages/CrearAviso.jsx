import React from 'react';
import axios from "axios";
import { ChakraProvider, Container, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import {getAvisos} from '..Backend/Controllers/MsmController';
import { set } from 'mongoose';


const Avisos = () => {

    const [avisos, setAvisos] = useState([{
        titulo: '',
        mensaje: '',
        fecha: '',
    }]);

    const getAvisos = async() => {
        const response = await axios.get('${proccess.env.SERVIDOR}/avisos');
        setAvisos(response.data);
        console.log(response.data);
    };

    const contentTable = () => {
        return avisos.map(avisos => {
            return (
                <tr key={avisos.id}>
                    <td>{avisos.titulo}</td>
                    <td>{avisos.mensaje}</td>
                    <td>{avisos.fecha}</td>
                </tr>
            )
        })
    };

    useEffect(() => {
        getAvisos().then(res => {
            setAvisos(res.data)
        })
        console.log(avisos)
    }, []);

    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign= "center" mt="10">Avisos</Heading>
                <Stack spacing={8} mt="10"> 
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Mensaje</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Titulo</td>
                                <td>Mensaje</td>
                                <td>Fecha</td>
                            </tr>
                        </tbody>
                    </table>
                </Stack>
            </Container>
        </>        
    );
};

export default Avisos;


