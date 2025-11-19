const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

router.post('/', async (req, res) => {
    try {
        const newPokemon = new Pokemon(req.body);
        const pokemonRegistered = await newPokemon.save();
        res.status(200).json(pokemonRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pokemons = await Pokemon.findById(req.params.id);
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;