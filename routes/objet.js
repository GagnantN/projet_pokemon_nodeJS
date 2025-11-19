const express = require('express');
const router = express.Router();
const Objet = require('../models/Objet');

router.post('/', async (req, res) => {
    try {
        const newObjet = new Objet(req.body);
        const typeRegistered = await newObjet.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const objets = await Objet.find();
        res.status(200).json(objets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedObjet = await Objet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedObjet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedObjet = await Objet.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedObjet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;