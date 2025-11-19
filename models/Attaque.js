const mongoose = require('mongoose');

const AttaqueSchema = new mongoose.Schema({
    nom: String,
    types: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type'
        }],
    puissance: Number,
    precision: Number,
    description: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Attaque', AttaqueSchema);