const mongoose = require('mongoose');
const Horario = require('../models/horario');
const Lavadora = mongoose.model('Lavadora');
const User = mongoose.model('user');


//calculo de differencia
function difhor(f2, f1){
    //
    console.log("inicio 1 :",f1);//testeo recuerda borrar
    console.log("final 1 :",f2);//testeo recuerda borrar
    let d1 =f1.getTime();//testeo recuerda borrar
    let d2 =f2.getTime();//testeo recuerda borrar
    console.log("inicio 1 :",d1);//testeo recuerda borrar
    console.log("final 1 :",d2);//testeo recuerda borrar
    //
    let dif = (f2.getTime() - f1.getTime())/ 1000 / 3600 ;
    //
    console.log("dif :",dif);//testeo recuerda borrar
    //
    return Math.round(dif);
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
        //console.log(Ho);//testeo recuerda borrar
        //console.log(err);//testeo recuerda borrar
        const  idlav  = Ho.lavadora.id;
        const  iduser  = Ho.user.id;
        let uso = difhor(Ho.final,Ho.inicio);

        console.log(idlav);//testeo recuerda borrar
        console.log(uso);//testeo recuerda borrar

        // suma horas al usuario
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
            //suma lo correspondiente a
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
                if (difu >= uso) {
                    User.findByIdAndUpdate(iduser,{$inc:{ HorasUso : uso} },(err,us) =>{
                        if (err) {
                            return res.status(400).send({ message: "Error al obtener el Usuario" })
                        }
                        if (!us) {
                            return res.status(404).send({ message: "Usuario no encontrado" })
                        }
                        console.log(err);//testeo recuerda borrar
                        return console.log("0k")//testeo recuerda borrar
                    })
                }
                return console.log("0k user")//testeo recuerda borrar
        })
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

