const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    nom: String,
    faiblesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    resistances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    immunites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }]
});

module.exports = mongoose.model('Type', TypeSchema);