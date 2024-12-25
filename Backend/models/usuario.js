const mongoose = require("mongoose");
// agregar realtime for presence time in the chat

const UsuarioSchema = new mongoose.Schema({

    subname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    timeOnline: {
        type: Number,
        default: 0
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = mongoose.model('Usuario', UsuarioSchema );