const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pokemon', require('./routes/pokemon'));
app.use('/api/type', require('./routes/type'));
app.use('/api/attaque', require('./routes/attaque'));
app.use('/api/dresseur', require('./routes/dresseur'));
app.use('/api/arene', require('./routes/arene'));
app.use('/api/objet', require('./routes/objet'));

app.get('/', (req, res) => {
    res.send('Bienvenu dans mon API Pokemon.');
})

module.exports = app;
const path = require('path');

// Servir le front-end
app.use(express.static(path.join(__dirname, 'frontEnd')));
