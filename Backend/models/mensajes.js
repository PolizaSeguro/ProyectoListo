const mongoose = require("mongoose");

const mensajeSchema = new mongoose.Schema({

    id: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
        default: '🟢'
    },
    placa: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Mensaje", mensajeSchema);