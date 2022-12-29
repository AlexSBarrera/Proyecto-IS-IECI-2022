const mongoose = require('mongoose');
const Horario = require('../models/horario');
const Maquina = mongoose.model('Maquina');
const Tipomaquina= mongoose.model('Tipomaquina');
const User = mongoose.model('user');
const RegHora = mongoose.model('RegHora');

//sum horas

//reservar hora
// falta verificacion user
const reserveHorario = async(req, res) => {

    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }

        if(Ho.status == "Libre"){

            const  idmaq  = Ho.Maquina.id;
            const  iduser  = req.params.uid;
            const  idtipo  = Ho.Maquina.tipo;
            let uso = Ho.final - Ho.inicio


        // suma horas a Maquina
        Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : uso} },(err,maq) =>{
            if (err) {

                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {

                return res.status(404).send({ message: "Maquina no encontrado" })
            }

            })
            Horario.findByIdAndUpdate(ida,{ user : iduser, status : "Reservado"},(err,Ho) =>{
                if (err) {

                    return res.status(400).send({ message: "Error al obtener la Maquina" })
                }
                if (!Ho) {

                    return res.status(404).send({ message: "Maquina no encontrado" })
                }

            })
            console.log("user: ",iduser, "tipo:", idtipo);
            // suma horas a Registro
            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : uso}}, (err,Reg) =>{
                if (err) {

                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {
                    console.log(Reg);

                    const newRegHora = new RegHora({
                        user : iduser,
                        tipo : idtipo,
                        Horas : uso
                    });

                    newRegHora.save((err) => {
                        if (err) {

                            console.log("reg E1 ",err);
                         //   return res.status(400).send({ message: "Error al crear el Registro de Horas" })
                        }

                    })
                }

            })

            return res.status(200).send(Ho)
        }
        return res.status(403).send({ message: "Horario no disponible" })
    })
}


//cancelar hora
// falta verificacion user
const cancelHorario = async (req, res) => {


    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {

            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }

        const  idmaq  = Ho.Maquina.id;
        const  iduser  = req.params.uid;
        const  idtipo  = Ho.Maquina.tipo;
        let uso = Ho.final - Ho.inicio

        let val= RegHora.findOne({user : iduser , tipo : idtipo },(err, Reg) => {
            if (err) {

                return res.status(400).send({ message: "Error al obtener el Registro" })
            }
            if (!Reg) {
                return res.status(404).send({ message: "Registro no encontrado" })
            }

            return Reg
        })

        if(Ho.status == "Reservado" && val != null ){

        // suma horas a Maquina
        Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : -uso} },(err,maq) =>{
            if (err) {

                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {

                return res.status(404).send({ message: "Maquina no encontrado" })
            }

            })
        Horario.findByIdAndUpdate(ida,{ user : null, status : "Libre"},(err,Ho) =>{
            if (err) {

                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!Ho) {

                return res.status(404).send({ message: "Maquina no encontrado" })
            }
            })


            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : -uso}}, (err,Reg) =>{
                if (err) {

                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {
                    return res.status(404).send({ message: "Registro no encontrado" })
                }

            })
            return res.status(200).send(Ho)
        }
        return res.status(404).send({ message: "Sin Horario" })
    })
}


const deshaHorario = async (req, res) => {
    ///
    //test start

    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).exec((err, Ho) => {
        if (err) {

            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }


        const  idmaq  = Ho.Maquina.id;
        const  iduser  = Ho.user;
        const  idtipo  = Ho.Maquina.tipo;
        let uso = Ho.final - Ho.inicio

        let val= RegHora.findOne({user : iduser , tipo : idtipo },(err, Reg) => {
            if (err) {
                return res.status(400).send({ message: "Error al obtener el Registro" })
            }
            if (!Reg) {
                return res.status(404).send({ message: "Registro no encontrado" })
                }

            return Reg
        })

        if(Ho.status != "Deshabilitado"  ){


        if (!val){
                // suma horas a Maquina
            Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : -uso} },(err,maq) =>{
            if (err) {

                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {

                return res.status(404).send({ message: "Maquina no encontrado" })
            }
            })


            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : -uso}}, (err,Reg) =>{
                if (err) {

                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {
                    console.log("reg E2 ",err);//test borrar

                    return res.status(404).send({ message: "Registro no encontrado" })
                }

            })
            }

        Horario.findByIdAndUpdate(ida,{status : "Deshabilitado"},(err,Ho) =>{
            if (err) {
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!Ho) {
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
            })
            return res.status(200).send(Ho)
        }
        return res.status(404).send({ message: "Sin Horario" })
    })
}

module.exports = {
    reserveHorario,
    cancelHorario,
    deshaHorario
}

