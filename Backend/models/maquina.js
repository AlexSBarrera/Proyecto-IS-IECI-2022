const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maquinaSchema = new Schema({
    number: {
        type: String,
        require: true
    },
    tipo: {
        type: Schema.ObjectId,
        ref: 'Tipomaquina',
        require: true
    },
    serie : {
        type: String
    },
    marca: {
        type: String
    },
    capacidad: {
        type: Number
    },
    observaciones: {
        type: String
    },
    usohoras: {
        type: Number
    }
})

module.exports = mongoose.model('Maquina', maquinaSchema);