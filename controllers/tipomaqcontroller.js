const TipoMaquina = require('../models/tipomaquina');

// CRUD Tipo Maquina

const createTipoMaquina = (req, res) => {
    const {tipo} = req.body;
    const newTipoMaquina = new TipoMaquina({
            tipo
    });
    newTipoMaquina.save((err, TipoMaquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el tipo de Maquina" })
        }
        return res.status(201).send(TipoMaquina)
    })
}
const getTipoMaquina = (req, res) => {
    TipoMaquina.find({}, (err, TipoMaquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Maquina" })
        }
        return res.status(200).send(TipoMaquina)
    })
}

const getSpecificTipoMaquina = (req, res) => {
    const { id } = req.params
    TipoMaquina.findById(id, (err, TipoMaquina) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar el tipo de Maquina" })
        }
        if (!TipoMaquina) {
            return res.status(404).send({ message: "No se encontro el tipo de Maquina" })
        }
        return res.status(201).send(TipoMaquina)
    })
}

const updateTipoMaquina = (req, res) => {
    const { id } = req.params;
    TipoMaquina.findByIdAndUpdate(id, req.body, (err, TipoMaquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Maquina" })
        }
        if (!TipoMaquina) {
            return res.status(404).send({ message: "Tipo de Maquina no encontrada" })
        }
        return res.status(200).send(TipoMaquina)
    })
}

const deleteTipoMaquina = (req, res) => {
    const { id } = req.params;
    TipoMaquina.findByIdAndDelete(id, (err, TipoMaquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el tipo de Maquina" })
        }
        if (!TipoMaquina) {
            return res.status(404).send({ message: "Tipo de Maquina no encontrado" })
        }
        return res.status(200).send(TipoMaquina)
    })
}


module.exports = {
    createTipoMaquina,
    getTipoMaquina,
    getSpecificTipoMaquina,
    updateTipoMaquina,
    deleteTipoMaquina
}