const mongoose = require('mongoose');
const Horario = require('../models/horario');
const Lavadora = mongoose.model('Lavadora');
const User = mongoose.model('user');

// TRABAJO PENDIENTE !!!
// NO UTILIZAR AUN !!!

function sumUser(iduser,uso){
    User.findById(iduser,(err,us) =>{
    if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener la Lavadora" })
        }
    if (!us) {
            console.log(err);//testeo recuerda borrar
            return res.status(404).send({ message: "Lavadora no encontrado" })
        }
        console.log(err);//testeo recuerda borrar
        const  difu  = 12 - us.HorasUso;
        const hou = (uso - difu);
        console.log("difu :",difu);//testeo recuerda borrar

        //suma lo correspondiente a user (recuerda diferenciar las horas por tipo de maquina)
        console.log("hou :",hou);
            if (difu < uso) {
                User.findByIdAndUpdate(iduser,{$inc:{ HorasUso : difu, HorasExtra : hou  }},(err,us) =>{
                    if (err) {
                        return res.status(400).send({ message: "Error al obtener el Usuario" })
                    }
                    if (!us) {
                        return res.status(404).send({ message: "Usuario no encontrado" })
                    }
                    console.log(err);
                    return console.log("0k")//testeo recuerda borrar
                })
            }
                User.findByIdAndUpdate(iduser,{$inc:{ HorasUso : uso} },(err,us) =>{
                    if (err) {
                        return res.status(400).send({ message: "Error al obtener el Usuario" })
                    }
                    if (!us) {
                        return res.status(404).send({ message: "Usuario no encontrado" })
                    }
                    return console.log("0k")//testeo recuerda borrar
                }
                )
            return console.log("0k user")//testeo recuerda borrar
    })
}
//reservar hora
const reserveHorario = (req, res) => {
    console.log("params :",req.params);//testeo recuerda borrar
    console.log("params.id :",req.params.id);//testeo recuerda borrar
    console.log("params.uid :",req.params.uid);//testeo recuerda borrar
    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'lavadora' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        console.log("inicio :",Ho.status);//testeo recuerda borrar
        if(Ho.status == "Libre"){
            console.log("entra");//testeo recuerda borrar
            console.log("ho :",Ho);//testeo recuerda borrar
            console.log("Lav.id :",Ho.lavadora.id);//testeo recuerda borrar
            console.log("final :",Ho.final);//testeo recuerda borrar
            console.log("inicio :",Ho.inicio);//testeo recuerda borrar
            const  idlav  = Ho.lavadora.id;
            const  iduser  = req.params.uid;
            let uso = Ho.final - Ho.inicio
            console.log("Lav.id :",iduser);//testeo recuerda borrar
            console.log("uso :",uso);//testeo recuerda borrar
        // suma horas a lavadora
        Lavadora.findByIdAndUpdate(idlav,{$inc:{ usohoras : uso} },(err,Lav) =>{
            if (err) {
                console.log(err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Lavadora" })
            }
            if (!Lav) {
                console.log(err);//testeo recuerda borrar
                return res.status(404).send({ message: "Lavadora no encontrado" })
            }
                console.log(err);//testeo recuerda borrar
                console.log("0k lav")//testeo recuerda borrar
            })
            Horario.findByIdAndUpdate(ida,{ user : iduser, status : "Reservado"},(err,Lav) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener la Lavadora" })
                }
                if (!Lav) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(404).send({ message: "Lavadora no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k User")//testeo recuerda borrar
            })
            return res.status(200).send(Ho)
        }
        return res.status(403).send({ message: "Horario no disponible" })
    })
}
//cancelar hora
// falta verificacion user 
const cancelHorario = (req, res) => {
    ///
    console.log("params :",req.params);//testeo recuerda borrar
    console.log("params.id :",req.params.id);//testeo recuerda borrar
    console.log("params.uid :",req.params.uid);//testeo recuerda borrar
    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'lavadora' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
            console.log("entra");//testeo recuerda borrar
            console.log("ho :",Ho);//testeo recuerda borrar
            console.log("Lav.id :",Ho.lavadora.id);//testeo recuerda borrar
            console.log("final :",Ho.final);//testeo recuerda borrar
            console.log("inicio :",Ho.inicio);//testeo recuerda borrar
            const  idlav  = Ho.lavadora.id;
            const  iduser  = req.params.uid;
            let uso = Ho.final - Ho.inicio
            console.log("Lav.id :",iduser);//testeo recuerda borrar
            console.log("uso :",uso);//testeo recuerda borrar
        // suma horas a lavadora
        Lavadora.findByIdAndUpdate(idlav,{$inc:{ usohoras : -uso} },(err,Lav) =>{
            if (err) {
                console.log(err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Lavadora" })
            }
            if (!Lav) {
                console.log(err);//testeo recuerda borrar
                return res.status(404).send({ message: "Lavadora no encontrado" })
            }
                console.log(err);//testeo recuerda borrar
                console.log("0k lav")//testeo recuerda borrar
            })
            Horario.findByIdAndUpdate(ida,{ user : null, status : "Libre"}, (err,Lav) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener la Lavadora" })
                }
                if (!Lav) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(404).send({ message: "Lavadora no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k lav")//testeo recuerda borrar
            })
            return res.status(200).send(Ho)
        
    })
}



module.exports = {
    reserveHorario,
    cancelHorario
}

