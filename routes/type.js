const express = require('express');
const router = express.Router();
const Type = require('../models/Type');

router.post('/', async (req, res) => {
    try {
        const newType = new Type(req.body);
        const typeRegistered = await newType.save();
        res.status(200).json(typeRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedType = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedType = await Type.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;