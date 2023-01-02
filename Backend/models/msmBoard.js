const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsmBoardSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('msmBoard', MsmBoardSchema);