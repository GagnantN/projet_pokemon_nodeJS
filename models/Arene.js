const mongoose = require('mongoose');

const AreneSchema = new mongoose.Schema({
    nom: String,
    type: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Type'
    }],
    dresseur: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dresseur'
    }]
});

module.exports = mongoose.model('Arene', AreneSchema);