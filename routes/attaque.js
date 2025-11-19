const express = require('express');
const router = express.Router();
const Attaque = require('../models/Attaque');

router.post('/', async (req, res) => {
    try {
        const newAttaque = new Attaque(req.body);
        const typeRegistered = await newAttaque.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const attaques = await Attaque.find();
        res.status(200).json(attaques);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedAttaque = await Attaque.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedAttaque = await Attaque.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAttaque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;