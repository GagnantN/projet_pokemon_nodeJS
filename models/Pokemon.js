const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    nom: String,
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    attaques: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attaque'
    }],
    taille: Number,
    poids: Number,
    description: {
        type: String,
        default: ''
    },
    sexe: String,
    evolutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }]
});

module.exports = mongoose.model('Pokemon', PokemonSchema);