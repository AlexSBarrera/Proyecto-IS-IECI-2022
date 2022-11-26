const RegHora = require('../models/reghora');

// CRUD RegHora

const createRegHora = (req, res) => {
    const {user} = req.body;
    const newRegHora = new RegHora({
            user
    });
    newRegHora.save((err, RegHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el Registro de Horas" })
        }
        return res.status(201).send(RegHora)
    })
}
const getRegHora = (req, res) => {
    RegHora.find({}, (err, RegHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Registro de Horas" })
        }
        return res.status(200).send(RegHora)
    })
}

const getSpecificRegHora = (req, res) => {
    const { id } = req.params
    RegHora.findById(id, (err, RegHora) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar el Registro de Horas" })
        }
        if (!RegHora) {
            return res.status(404).send({ message: "No se encontro el Registro de Horas" })
        }
        return res.status(200).send(RegHora)
    })
}

const updateRegHora = (req, res) => {
    const { id } = req.params;
    RegHora.findByIdAndUpdate(id, req.body, (err, RegHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Registro de Horas" })
        }
        if (!RegHora) {
            return res.status(404).send({ message: "No se encontro el Registro de Horas" })
        }
        return res.status(200).send(RegHora)
    })
}

const deleteRegHora = (req, res) => {
    const { id } = req.params;
    RegHora.findByIdAndDelete(id, (err, RegHora) => {
        if (err) {
            return res.status(400).send({ message: "Error al borrar el Registro de Horas" })
        }
        if (!RegHora) {
            return res.status(404).send({ message: "Registro de Horas no encontrado" })
        }
        return res.status(200).send(RegHora)
    })
}


module.exports = {
    createRegHora,
    getRegHora,
    getSpecificRegHora,
    updateRegHora,
    deleteRegHora
}