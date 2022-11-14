const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HorarioSchema = new Schema({
    inicio: {
        type: Date,
        required: true
    },
    final: {
        type: Date,
        required: true
    },
    lavadora: {
        type: Schema.ObjectId,
        ref: 'Lavadora',
    },
    status: {
        type: Schema.ObjectId,
        ref: 'StatusHora'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
})

module.exports = mongoose.model('Horario', HorarioSchema);