const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsmBoardSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    Message: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

