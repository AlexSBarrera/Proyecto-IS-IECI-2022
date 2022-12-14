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
    Maquina: {
        type: Schema.ObjectId,
        ref: 'Maquina',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        Default : null
    },
    status: {
        type: String,
        required : true,
        default : "Libre"
    }
})

HorarioSchema.index({dia: 1,inicio: 1,Maquina: 1},{unique : true})

module.exports = mongoose.model('Horario', HorarioSchema);