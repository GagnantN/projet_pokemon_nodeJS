const express = require('express');
const router = express.Router();
const Dresseur = require('../models/Dresseur');

router.post('/', async (req, res) => {
    try {
        const newDresseur = new Dresseur(req.body);
        const typeRegistered = await newDresseur.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const dresseurs = await Dresseur.find();
        res.status(200).json(dresseurs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedDresseur = await Dresseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedDresseur = await Dresseur.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedDresseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;