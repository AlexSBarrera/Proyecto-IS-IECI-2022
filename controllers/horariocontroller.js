const mongoose = require('mongoose');
const horario = require('../models/horario');
const { count } = require('../models/horario');
const Horario = require('../models/horario');

// CRUD Horario

const createHorario = async (req, res) => {
    const { dia, inicio, lavadora, status, user } = req.body;
    const final = parseInt(req.body.inicio) + 1
    console.log("ini:",req.body.inicio);//testeo recuerda borrar
    console.log("fin:",final);//testeo recuerda borrar
    const newHorario = new Horario({
        dia,
        inicio,
        final : final,
        lavadora,
        status,
        user
    });
    console.log("dia:",req.body.dia);//testeo recuerda borrar
    console.log("ini:",req.body.inicio);//testeo recuerda borrar
    console.log("req:",req.body);//testeo recuerda borrar


    await newHorario.save((err, Horario) => {
        if (err) {
            console.log("err:",err);//testeo recuerda borrar
            return res.status(400).send({ message: "Error al crear el Horario" });
        }
        return res.status(201).send(Horario);
    })
}
const getHorario = (req, res) => {
    Horario.find({}, (err, Horario) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        return res.status(200).send(Horario)
    })
}

const getSpecificHorario = (req, res) => {
    const { id } = req.params;
    Horario.findById(id).populate({ path: 'lavadora' }).populate({path: 'status'}).populate({path: 'user'}).exec((err, Horario) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Horario) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        let v = valCreate(Horario);
        console.log("v if create:",v)
        return res.status(200).send(Horario)
    })
}

const updateHorario = (req, res) => {
    const { id } = req.params;
    Horario.findByIdAndUpdate(id, req.body, (err, Horario) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Horario) {
            return res.status(404).send({ message: "Horario no encontrada" })
        }
        return res.status(200).send(Horario)
    })
}

const deleteHorario = (req, res) => {
    const { id } = req.params;
    Horario.findByIdAndDelete(id, (err, Horario) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Horario" })
        }
        if (!Horario) {
            return res.status(404).send({ message: "Horario no encontrado" })
        }
        return res.status(200).send(Horario)
    })
}



module.exports = {
    createHorario,
    getHorario,
    getSpecificHorario,
    updateHorario,
    deleteHorario,
}