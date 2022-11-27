const mongoose = require('mongoose');
const Horario = require('../models/horario');
const reghora = require('../models/reghora');
const Maquina = mongoose.model('Maquina');
const User = mongoose.model('user');
const RegHora = mongoose.model('RegHora');

// TRABAJO PENDIENTE !!!
// NO UTILIZAR AUN !!!


// FUNCION OBSOLETA!! SOLO REFERENCIA!!
function sumUser(iduser,uso){
    User.findById(iduser,(err,us) =>{
    if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener la Maquina" })
        }
    if (!us) {
            console.log(err);//testeo recuerda borrar
            return res.status(404).send({ message: "Maquina no encontrado" })
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
// FUNCION OBSOLETA!! SOLO REFERENCIA!!

//sum horas

//reservar hora
// falta verificacion user
const reserveHorario = async(req, res) => {
    console.log("params :",req.params);//testeo recuerda borrar
    console.log("params.id :",req.params.id);//testeo recuerda borrar
    console.log("params.uid :",req.params.uid);//testeo recuerda borrar
    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        console.log("inicio :",Ho.status);//testeo recuerda borrar
        if(Ho.status == "Libre"){

            //test start
            console.log("entra");//testeo recuerda borrar
            console.log("ho :",Ho);//testeo recuerda borrar
            console.log("maq.id :",Ho.Maquina.id);//testeo recuerda borrar
            console.log("idtipo :",Ho.Maquina.tipo);//testeo recuerda borrar
            console.log("final :",Ho.final);//testeo recuerda borrar
            console.log("inicio :",Ho.inicio);//testeo recuerda borrar
            //test end

            const  idmaq  = Ho.Maquina.id;
            const  iduser  = req.params.uid;
            const  idtipo  = Ho.Maquina.tipo;
            let uso = Ho.final - Ho.inicio

            //test start
            console.log("maq.id :",iduser);//testeo recuerda borrar
            console.log("idtipo :",idtipo);//testeo recuerda borrar
            console.log("uso :",uso);//testeo recuerda borrar
            //test end

        // suma horas a Maquina
        Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : uso} },(err,maq) =>{
            if (err) {
                console.log(err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {
                console.log(err);//testeo recuerda borrar
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
                console.log(err);//testeo recuerda borrar
                console.log("0k maq")//testeo recuerda borrar
            })
            Horario.findByIdAndUpdate(ida,{ user : iduser, status : "Reservado"},(err,Ho) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener la Maquina" })
                }
                if (!Ho) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(404).send({ message: "Maquina no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k User")//testeo recuerda borrar
            })
            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : uso}}, (err,Reg) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {

                    const newRegHora = new RegHora({
                        user : iduser,
                        tipo : idtipo,
                        Horas : uso
                    });
                    console.log("RegHora :",newRegHora);//testeo recuerda borrar
                    newRegHora.save((err) => {
                        if (err) {

                            console.log("reg E1 ",err);
                            return res.status(400).send({ message: "Error al crear el Registro de Horas" })
                        }
                        console.log("RegHora created:",newRegHora);//testeo recuerda borrar
                    })
                    console.log(err);//testeo recuerda borrar
                   //return res.status(404).send({ message: "Registro no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k Reg")//testeo recuerda borrar
            })
            console.log("Enviado")//testeo recuerda borrar
            return res.status(200).send(Ho)
        }
        return res.status(403).send({ message: "Horario no disponible" })
    })
}


//cancelar hora
// falta verificacion user
const cancelHorario = async (req, res) => {
    ///
    //test start
    console.log("params :",req.params);//testeo recuerda borrar
    console.log("params.id :",req.params.id);//testeo recuerda borrar
    console.log("params.uid :",req.params.uid);//testeo recuerda borrar
    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).populate({path: 'user'}).exec((err, Ho) => {
        if (err) {
            console.log(err);//testeo recuerda borrar
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
                console.log("Reg E1 ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener el Registro" })
            }
            if (!Reg) {
                console.log("Reg E2 ",err);//testeo recuerda borrar
                return res.status(404).send({ message: "Registro no encontrado" })
            }
            console.log("Reg : ", Reg);//testeo recuerda borrar
            return Reg
        })

        if(Ho.status == "Reservado" && val != null ){

        //test start
            console.log("entra");//testeo recuerda borrar
            console.log("ho :",Ho);//testeo recuerda borrar
            console.log("maq.id :",Ho.Maquina.id);//testeo recuerda borrar
            console.log("idtipo :",Ho.Maquina.tipo);//testeo recuerda borrar
            console.log("final :",Ho.final);//testeo recuerda borrar
            console.log("inicio :",Ho.inicio);//testeo recuerda borrar
            console.log("maq.id :",iduser);//testeo recuerda borrar
            console.log("uso :",uso);//testeo recuerda borrar
            console.log("idtipo :",idtipo);//testeo recuerda borrar
        //test end

        // suma horas a Maquina
        Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : -uso} },(err,maq) =>{
            if (err) {
                console.log("la E ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
                console.log("la E ",err);//testeo recuerda borrar
                console.log("0k maq")//testeo recuerda borrar
            })
        Horario.findByIdAndUpdate(ida,{ user : null, status : "Libre"},(err,Ho) =>{
            if (err) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!Ho) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
            console.log(err);//testeo recuerda borrar
            console.log("0k User")//testeo recuerda borrar
            })


            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : -uso}}, (err,Reg) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {//
                    console.log(err);//testeo recuerda borrar
                   // return res.status(404).send({ message: "Registro no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k Reg")//testeo recuerda borrar
            })
            console.log("Enviado")//testeo recuerda borrar
            return res.status(200).send(Ho)
        }
        return res.status(404).send({ message: "Sin Horario" })
    })
}


const deshaHorario = async (req, res) => {
    ///
    //test start
    console.log("params :",req.params);//testeo recuerda borrar
    console.log("params.id :",req.params.id);//testeo recuerda borrar
    const ida  = req.params.id;
    Horario.findById(ida).populate({ path: 'Maquina' }).exec((err, Ho) => {
        if (err) {
            console.log(err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Ho) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        console.log("Ho : ", Ho);//testeo recuerda borrar

        const  idmaq  = Ho.Maquina.id;
        const  iduser  = Ho.user;
        const  idtipo  = Ho.Maquina.tipo;
        let uso = Ho.final - Ho.inicio

        let val= RegHora.findOne({user : iduser , tipo : idtipo },(err, Reg) => {
            if (err) {
                console.log("Reg E1 ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener el Registro" })
            }
            if (!Reg) {
                console.log("Sin Registro",err);//testeo recuerda borrar
                }
            console.log("Reg : ", Reg);//testeo recuerda borrar
            return Reg
        })

        if(Ho.status != "Deshabilitado"  ){

        //test start
            console.log("entra");//testeo recuerda borrar
            console.log("ho :",Ho);//testeo recuerda borrar
            console.log("maq.id :",Ho.Maquina.id);//testeo recuerda borrar
            console.log("idtipo :",Ho.Maquina.tipo);//testeo recuerda borrar
            console.log("final :",Ho.final);//testeo recuerda borrar
            console.log("inicio :",Ho.inicio);//testeo recuerda borrar
            console.log("user.id :",iduser);//testeo recuerda borrar
            console.log("uso :",uso);//testeo recuerda borrar
            console.log("idtipo :",idtipo);//testeo recuerda borrar
        //test end
        if (!val){
                // suma horas a Maquina
            Maquina.findByIdAndUpdate(idmaq,{$inc:{ usohoras : -uso} },(err,maq) =>{
            if (err) {
                console.log("la E ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!maq) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
                console.log("0k maq")//testeo recuerda borrar
            })


            RegHora.findOneAndUpdate({user : iduser , tipo : idtipo },{ $inc:{ Horas : -uso}}, (err,Reg) =>{
                if (err) {
                    console.log(err);//testeo recuerda borrar
                    return res.status(400).send({ message: "Error al obtener el Registro" })
                }
                if (!Reg) {//
                    console.log(err);//testeo recuerda borrar
                   // return res.status(404).send({ message: "Registro no encontrado" })
                }
                console.log(err);//testeo recuerda borrar
                console.log("0k Reg")//testeo recuerda borrar
            })
            }

        Horario.findByIdAndUpdate(ida,{status : "Deshabilitado"},(err,Ho) =>{
            if (err) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al obtener la Maquina" })
            }
            if (!Ho) {
                console.log("ho E ",err);//testeo recuerda borrar
                return res.status(404).send({ message: "Maquina no encontrado" })
            }
            console.log("0k User")//testeo recuerda borrar
            })


            console.log("Enviado")//testeo recuerda borrar
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

