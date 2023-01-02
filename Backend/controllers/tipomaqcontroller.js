const { prependListener, prependOnceListener } = require('../models/tipomaquina');
const TipoMaquina = require('../models/tipomaquina');

// CRUD Tipo Maquina

const createTipoMaquina = (req, res) => {
    try{
        const {tipo,precio} = req.body;
        const newTipoMaquina = new TipoMaquina({
                tipo, precio
        });
        if(!tipo) {
            res.status(403)
            res.send('No se ha especificado el tipo de maquina')
        }
        if(!precio || precio < 0) {
            res.status(403)
            res.send('No se ha especificado el precio de maquina o es negativo')
        }

        newTipoMaquina.save((err, TipoMaquina) => {
            if (err) {
                return res.status(400).send({ message: "Error al crear el tipo de Maquina" })
            }
            return res.status(201).send(TipoMaquina)
        })
    } catch (err) {
        res.status(500)
        res.send(err)
    }
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