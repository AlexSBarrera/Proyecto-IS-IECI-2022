const horario = require('../models/horario');
const Lavadora = require('../models/Lavadora');

// CRUD Lavadoras

const createLavadora = (req, res) => {
    const { number, tipo, usohoras } = req.body;
    const newLavadora = new Lavadora({
        number,
        tipo,
        usohoras
    });
    newLavadora.save((err, Lavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear la lavadora" })
        }
        return res.status(201).send(Lavadora)
    })
}
const getLavadora = (req, res) => {
    Lavadora.find({}, (err, Lavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Lavadora" })
        }
        return res.status(200).send(Lavadora)
    })
}

const getSpecificLavadora = (req, res) => {
    const { id } = req.params;
    Lavadora.findById(id).populate({ path: 'tipo' }).exec((err, Lavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Lavadora" })
        }
        if (!Lavadora) {
            return res.status(404).send({ message: "Lavadora no encontrada" })
        }
        return res.status(200).send(Lavadora)
    })
}

const updateLavadora = (req, res) => {
    const { id } = req.params;
    Lavadora.findByIdAndUpdate(id, req.body, (err, Lavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Lavadora" })
        }
        if (!Lavadora) {
            return res.status(404).send({ message: "Lavadora no encontrada" })
        }
        return res.status(200).send(Lavadora)
    })
}

const deleteLavadora = (req, res) => {
    const { id } = req.params;
    Lavadora.findByIdAndDelete(id, (err, Lavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Lavadora" })
        }
        if (!Lavadora) {
            return res.status(404).send({ message: "Lavadora no encontrado" })
        }
        return res.status(200).send(Lavadora)
    })
}



module.exports = {
    createLavadora,
    getLavadora,
    getSpecificLavadora,
    updateLavadora,
    deleteLavadora,
}