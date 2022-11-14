const Horario = require('../models/horario');

// CRUD Horario

const createHorario = (req, res) => {
    const { inicio, final, lavadora,status,user } = req.body;
    const newHorario = new Horario({
        inicio,
        final,
        lavadora,
        status,
        user
    });
    newHorario.save((err, Horario) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el Horario" })
        }
        return res.status(201).send(Horario)
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
//


module.exports = {
    createHorario,
    getHorario,
    getSpecificHorario,
    updateHorario,
    deleteHorario
}