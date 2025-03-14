const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    imagem: {
        type: String,
        required: true,
    },
    altura: {
        type: Number,
        required: true,
    },
    diametro: {
        type: Number,
        required: true,
    },
    indisponibilidade: {
        type: [String], //array de datas
        default: [],
    },
});

module.exports = mongoose.model(`Produto`, produtoSchema);