const express = require('express');
const router = express.Router();
const Arene = require('../models/Arene');

router.post('/', async (req, res) => {
    try {
        const newArene = new Arene(req.body);
        const typeRegistered = await newArene.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const arenes = await Arene.find();
        res.status(200).json(arenes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedArene = await Arene.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedArene = await Arene.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedArene);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;