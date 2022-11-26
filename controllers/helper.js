const mongoose = require('mongoose');
const Horario = require('../models/horario');
const Lavadora = mongoose.model('Lavadora');
const User = mongoose.model('user');

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
const reserveHorario = (req, res) => {
    const { id } = req.params;
    Horario.findById(id).populate({ path: 'lavadora' }).populate({path: 'status'}).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            console.log(err);
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        const  idlav  = Ho.lavadora.id;
        const  iduser  = Ho.user.id;
        let uso = Ho.final - Ho.Inicio
        console.log(idlav);//testeo recuerda borrar
        console.log(uso);//testeo recuerda borrar

        sumUser(iduser,uso);

        // suma horas a lavadora
        Lavadora.findByIdAndUpdate(idlav,{$inc:{ usohoras : uso} },(err,Lav) =>{
            if (err) {
                console.log(err);
                return res.status(400).send({ message: "Error al obtener la Lavadora" })
            }
            if (!Lav) {
                console.log(err);
                return res.status(404).send({ message: "Lavadora no encontrado" })
            }
            console.log(err);
                return console.log("0k lav")//testeo recuerda borrar
        })
        return res.status(200).send(Ho)
    })
}



module.exports = {
    reserveHorario
}

