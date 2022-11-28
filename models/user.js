const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    HorasUso: {
        type: Number,
        min: 0,
        default: 0
    },
    HorasExtra: {
        type: Number,
        min: 0,
        default: 0
    },
    correo :{
        type: String,
        require: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    contraseña: {
        type: String,
        required: true,
        select: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})


UserSchema.pre('save', (next) => {
    let user = this;
    if (!user.isModified('contraseña')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.contraseña, salt, null, (err, hash) => {
            if (err) return next(err);
            user.contraseña = hash;
            next();
        });
    });
});

module.exports = mongoose.model('user', UserSchema);