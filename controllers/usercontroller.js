const User = require('../models/user');

// CRUD Tipo Usuario

const createUser = (req, res) => {
    const {name, HorasUso, HorasExtra, correo } = req.body;
    const newUser = new User({
        name,
        HorasUso,
        HorasExtra,
        correo
    });
    newUser.save((err, User) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el Usuario" })
        }
        return res.status(201).send(User)
    })
}
const getUser = (req, res) => {
    User.find({}, (err, User) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Usuario" })
        }
        return res.status(200).send(User)
    })
}

const getSpecificUser = (req, res) => {
    const { id } = req.params
    User.findById(id, (err, User) => {
        if (err) {
            return res.status(400).send({ message: "No se ha podido buscar el Usuario" })
        }
        if (!User) {
            return res.status(404).send({ message: "No se encontro el Usuario" })
        }
        return res.status(200).send(User)
    })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, (err, User) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Usuario" })
        }
        if (!User) {
            return res.status(404).send({ message: " Usuario no encontrada" })
        }
        return res.status(200).send(User)
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err, User) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el Usuario" })
        }
        if (!User) {
            return res.status(404).send({ message: "Usuario no encontrado" })
        }
        return res.status(200).send(User)
    })
}


module.exports = {
    createUser,
    getUser,
    getSpecificUser,
    updateUser,
    deleteUser
}