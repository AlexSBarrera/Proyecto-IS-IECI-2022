const User = require('../models/user');
const nodemailer = require('nodemailer');
const msmBoard = require('../models/MsmBoard');
const user = require('../models/user');
const { findById } = require('../models/user');

const getAvisos = async(req, res) => {
    msmBoard.find((err, msmBoard) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los avisos" })
        }
        return res.status(200).send(msmBoard);
    })
}

const deleteAviso = (req, res) => {
    const { id } = req.params;
    msmBoard.findByIdAndDelete(id, (err, msmBoard) => {
        if (err) {
            return res.status(400).send({ message: "No se pudo eliminar el aviso" })
        }
        if (!msmBoard) {
            return res.status(404).send({ message: "aviso no encontrado" })
        }
        return res.status(200).send(msmBoard);
    })
}

const crearAviso = (req, res) => {
    const { titulo, mensaje, fecha } = req.body;
    const newAviso = new msmBoard({
        titulo,
        mensaje,
        fecha: Date.now()
    })
    newAviso.save((err, msmBoard) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear el Aviso" })
        }
        return res.status(201).send(msmBoard);
        return (titulo, mensaje)
    })
}

const updateAviso = (req, res) => {
    const { id } = req.params;
    const { titulo, mensaje, fecha } = req.body;
    const updateAviso = {
        titulo,
        mensaje,
        fecha: Date.now()
    }
    msmBoard.findByIdAndUpdate(id, updateAviso, (err, msmBoard) => {
        if (err) {
            return res.status(400).send({ message: "No se pudo actualizar el aviso" })
        }
        if (!msmBoard) {
            return res.status(404).send({ message: "aviso no encontrado" })
        }
        return res.status(200).send(msmBoard);
    })
}

const postEmail = async(req, res) => {
    const { titulo, mensaje } = req.body;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://mongoieci:admin123@mongoieci.bfeqsg1.mongodb.net/test";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let correos = [];
    client.connect(err => {
        const collection = client.db("test").collection("users");
        users = collection.find({}, { email: 1 }).toArray((err, users) => {
            correos = users.map(user => user.correo);
            client.close();
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: "grupo14ingenierias@gmail.com",
                    pass: "mqnkstmymrnhgswl"
                }
                });
                const mailOptions = {
                    from: 'elody.schimmel@ethereal.email',
                    to: correos.join(","),
                    subject: titulo,
                    text: mensaje,
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
        });
    });
    client.close();
}

module.exports = {
    getAvisos,
    crearAviso,
    postEmail,
    deleteAviso,
    updateAviso
}