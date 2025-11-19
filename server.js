const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pokemon', require('./routes/pokemon'));
app.use('/api/type', require('./routes/type'));
app.use('/api/attaque', require('./routes/attaque'));
app.use('/api/dresseur', require('./routes/dresseur'));
app.use('/api/arene', require('./routes/arene'));
app.use('/api/objet', require('./routes/objet'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});