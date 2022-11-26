const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegHoraSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref : "user",
        required: true
    },
    tipo: {
        type: Schema.ObjectId,
        ref : "user",
        required: true
    },
    Horas: {
        type: Number,
    }
})

RegHoraSchema.index({use: 1,tipo: 1},{unique : true})


module.exports = mongoose.model('RegHora', RegHoraSchema);