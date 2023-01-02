const horario = require('../models/horario');
const Maquina = require('../models/maquina');

// CRUD Maquinas

const createMaquina = (req, res) => {
    try {
        const { number, tipo,serie,marca,capacidad,observaciones,usohoras } = req.body;
        const newMaquina = new Maquina({
            number,
            tipo,
            serie,
            marca,
            capacidad,
            observaciones,
            usohoras
        });
        if(!number) {
            res.status(403)
            res.send('No se ha especificado el numero de maquina')
        }
        if(!tipo) {
            res.status(403)
            res.send('No se ha especificado el tipo de maquina')
        }
        if(!serie) {
            res.status(403)
            res.send('No se ha especificado la serie de maquina')
        }
        if(!marca) {
            res.status(403)
            res.send('No se ha especificado la marca de maquina')
        }
        if(!capacidad || capacidad < 0) {
            res.status(403)
            res.send('No se ha especificado la capacidad de maquina o es negativa')
        }
        if(usohoras < 0) {
            res.status(403)
            res.send('El uso de horas no puede ser negativo')
        }

        newMaquina.save((err, Maquina) => {
            if (err) {
                console.log(err);//testeo recuerda borrar
                return res.status(400).send({ message: "Error al crear la Maquina" })
            }
            return res.status(201).send(Maquina)
        })
    } catch (err) {
        res.status(500)
        res.send(err)
    }
}    


const getMaquina = (req, res) => {
    Maquina.find({}, (err, Maquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Maquina" })
        }
        return res.status(200).send(Maquina)
    })
}

const getSpecificMaquina = (req, res) => {
    const { id } = req.params;
    Maquina.findById(id).populate({ path: 'tipo' }).exec((err, Maquina) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar la maquina" })
        }
        if (!Maquina) {
            return res.status(404).send({ message: "Maquina no encontrada" })
        }
        return res.status(200).send(Maquina)
    })
}

const updateMaquina = (req, res) => {
    const { id } = req.params;
    Maquina.findByIdAndUpdate(id, req.body, (err, Maquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Maquina" })
        }
        if (!Maquina) {
            return res.status(404).send({ message: "Maquina no encontrada" })
        }
        return res.status(200).send(Maquina)
    })
}

const deleteMaquina = (req, res) => {
    const { id } = req.params;
    Maquina.findByIdAndDelete(id, (err, Maquina) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener la Maquina" })
        }
        if (!Maquina) {
            return res.status(404).send({ message: "Maquina no encontrado" })
        }
        return res.status(200).send(Maquina)
    })
}



module.exports = {
    createMaquina,
    getMaquina,
    getSpecificMaquina,
    updateMaquina,
    deleteMaquina,
}