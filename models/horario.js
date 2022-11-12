const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HorarioSchema = new Schema({
    intervalo: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    tipo: {
        type: Schema.ObjectId,
        ref: 'Lavadora',
        required: true
    },
    status: {
        type: Schema.ObjectId,
        ref: 'StatusHora'
    }
})

module.exports = mongoose.model('Horario', HorarioSchema);