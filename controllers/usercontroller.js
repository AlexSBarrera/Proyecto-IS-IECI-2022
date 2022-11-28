const mongoose = require('mongoose');
const user = require('../models/user');
const service = require('../services');

// CRUD Tipo Usuario


const createUser = (req, res) => {
    const {name, correo, contraseña, admin} = req.body;
    const user = new user({name, correo, contraseña, admin});
    user.save((err, user) => {
        if (err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})
        return res.status(200).send({token: service.createToken(user)})
    })
}


/*function signup(req, res) {
    const user = new User({
        name: req.body.name,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        admin: false
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(200).send({ token: service.createToken(user) })
    })
}*/


function signin(req, res) {
    user.findone({ correo: req.body.correo }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })

        req.user = user
        res.status(200).send({
            message: 'Bienvenido',
            token: service.createToken(user)
        })
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
    deleteUser,
    signin
}