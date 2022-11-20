const Tipolavadora = require('../models/tipolavadora');

// CRUD Tipo Lavadora

const createTipolavadora = (req, res) => {
    const {tipo} = req.body;
    const newTipolavadora = new Tipolavadora({
            tipo
    });
    newTipolavadora.save((err, Tipolavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el tipo de lavadora" })
        }
        return res.status(201).send(Tipolavadora)
    })
}
const getTipolavadora = (req, res) => {
    Tipolavadora.find({}, (err, Tipolavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de lavadora" })
        }
        return res.status(200).send(Tipolavadora)
    })
}

const getSpecificTipolavadora = (req, res) => {
    const { id } = req.params
    Tipolavadora.findById(id, (err, Tipolavadora) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar el tipo de lavadora" })
        }
        if (!Tipolavadora) {
            return res.status(404).send({ message: "No se encontro el tipo de lavadora" })
        }
        return res.status(201).send(Tipolavadora)
    })
}

const updateTipolavadora = (req, res) => {
    const { id } = req.params;
    Tipolavadora.findByIdAndUpdate(id, req.body, (err, Tipolavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de lavadora" })
        }
        if (!Tipolavadora) {
            return res.status(404).send({ message: "Tipo de lavadora no encontrada" })
        }
        return res.status(200).send(Tipolavadora)
    })
}

const deleteTipolavadora = (req, res) => {
    const { id } = req.params;
    Tipolavadora.findByIdAndDelete(id, (err, Tipolavadora) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de lavadora" })
        }
        if (!Tipolavadora) {
            return res.status(404).send({ message: "Tipo de lavadora no encontrado" })
        }
        return res.status(200).send(Tipolavadora)
    })
}


module.exports = {
    createTipolavadora,
    getTipolavadora,
    getSpecificTipolavadora,
    updateTipolavadora,
    deleteTipolavadora
}