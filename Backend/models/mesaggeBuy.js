const mongoose = require("mongoose");

const messageBuySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("MessageBuy", messageBuySchema);