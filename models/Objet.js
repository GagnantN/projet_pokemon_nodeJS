const mongoose = require('mongoose');

const ObjetSchema = new mongoose.Schema({
    nom: String,
    categories: String,
    description: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Objet', ObjetSchema);