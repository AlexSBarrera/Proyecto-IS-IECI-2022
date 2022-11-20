const StatusHora = require('../models/statushora');

// CRUD Status

const createStatusHora = (req, res) => {
    const {status} = req.body;
    const newStatusHora = new StatusHora({
            status
    });
    newStatusHora.save((err, StatusHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el tipo de Status" })
        }
        return res.status(201).send(StatusHora)
    })
}
const getStatusHora = (req, res) => {
    StatusHora.find({}, (err, StatusHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Status" })
        }
        return res.status(200).send(StatusHora)
    })
}

const getSpecificStatusHora = (req, res) => {
    const { id } = req.params
    StatusHora.findById(id, (err, StatusHora) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar el tipo de Status" })
        }
        if (!StatusHora) {
            return res.status(404).send({ message: "No se encontro el tipo de Status" })
        }
        return res.status(200).send(StatusHora)
    })
}

const updateStatusHora = (req, res) => {
    const { id } = req.params;
    StatusHora.findByIdAndUpdate(id, req.body, (err, StatusHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Status" })
        }
        if (!StatusHora) {
            return res.status(404).send({ message: "Tipo de Status no encontrada" })
        }
        return res.status(200).send(StatusHora)
    })
}

const deleteStatusHora = (req, res) => {
    const { id } = req.params;
    StatusHora.findByIdAndDelete(id, (err, StatusHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Status" })
        }
        if (!StatusHora) {
            return res.status(404).send({ message: "Tipo de Status no encontrado" })
        }
        return res.status(200).send(StatusHora)
    })
}


module.exports = {
    createStatusHora,
    getStatusHora,
    getSpecificStatusHora,
    updateStatusHora,
    deleteStatusHora
}