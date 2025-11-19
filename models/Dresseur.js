const mongoose = require('mongoose');

const DresseurSchema = new mongoose.Schema({
    nom: String,
    pokemons_actifs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pokemon'
    }],
    pokemons_captures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }],
    objets: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 'Objet'
    }]
});

module.exports = mongoose.model('Dresseur', DresseurSchema);