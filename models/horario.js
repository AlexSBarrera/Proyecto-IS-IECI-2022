const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HorarioSchema = new Schema({

    dia : {
    type: Date,
        required: true
    },
    inicio:{
        type: Number,
        required: true
    },
    final:{
        type: Number,
        required: true
    },
    lavadora: {
        type: Schema.ObjectId,
        ref: 'Lavadora',
        required: true
    },
    status: {
        type: String,
        required : true,
        default : "Libre"
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
})

HorarioSchema.index({dia: 1,inicio: 1,lavadora: 1},{unique : true})

module.exports = mongoose.model('Horario', HorarioSchema);