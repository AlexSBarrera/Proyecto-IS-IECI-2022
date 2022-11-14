const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    HorasUso: {
        type: Number,
        required: true
    },
    HorasExtra: {
        type: Number,
        required: true
    },
    correo :{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('user', UserSchema);