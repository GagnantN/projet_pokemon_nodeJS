const mongoose = require('mongoose');
const Type = require('./models/Type');
const Pokemon = require('./models/Pokemon');
const Attaque = require('./models/Attaque');
const Objet = require('./models/Objet');
const Dresseur = require('./models/Dresseur');
const Arene = require('./models/Arene');

const MONGO_URI = 'mongodb://127.0.0.1:27017/pokedex';

async function main() {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connecté à MongoDB');

    // Suppression des anciennes données
    console.log('Suppression des anciennes données...');
    await Promise.all([
      Type.deleteMany({}),
      Pokemon.deleteMany({}),
      Attaque.deleteMany({}),
      Objet.deleteMany({}),
      Dresseur.deleteMany({}),
      Arene.deleteMany({})
    ]);

    // ---------- TYPES ----------
    console.log('Insertion des types...');
    const typesData = [
      { nom: 'Feu' },
      { nom: 'Eau' },
      { nom: 'Plante' },
      { nom: 'Électrik' },
      { nom: 'Normal' },
      { nom: 'Combat' }
    ];
    const types = await Type.insertMany(typesData);
    console.log(`${types.length} types insérés.`);

    const findType = (nom) => types.find(t => t.nom === nom);

    // ---------- ATTAQUES ----------
    console.log('Insertion des attaques...');
    const attaquesData = [
      { nom: 'Flammèche', puissance: 40, precision: 100, type: findType('Feu')._id },
      { nom: 'Pistolet à O', puissance: 40, precision: 100, type: findType('Eau')._id },
      { nom: 'Fouet Lianes', puissance: 35, precision: 95, type: findType('Plante')._id },
      { nom: 'Éclair', puissance: 40, precision: 100, type: findType('Électrik')._id }
    ];
    const attaques = await Attaque.insertMany(attaquesData);
    console.log(`${attaques.length} attaques insérées.`);

    const findAttaque = (nom) => attaques.find(a => a.nom === nom);

    // ---------- OBJETS ----------
    console.log('Insertion des objets...');
    const objetsData = [
      { nom: 'Potion', effet: 'Soigne 20 PV' },
      { nom: 'Super Potion', effet: 'Soigne 50 PV' },
      { nom: 'Antidote', effet: 'Soigne le poison' }
    ];
    const objets = await Objet.insertMany(objetsData);
    console.log(`${objets.length} objets insérés.`);

    // ---------- POKÉMON ----------
    console.log('Insertion des Pokémon...');
    const pokemonsData = [
      {
        nom: 'Salamèche',
        niveau: 5,
        type: [findType('Feu')._id],
        attaques: [findAttaque('Flammèche')._id]
      },
      {
        nom: 'Carapuce',
        niveau: 5,
        type: [findType('Eau')._id],
        attaques: [findAttaque('Pistolet à O')._id]
      },
      {
        nom: 'Bulbizarre',
        niveau: 5,
        type: [findType('Plante')._id],
        attaques: [findAttaque('Fouet Lianes')._id]
      },
      {
        nom: 'Pikachu',
        niveau: 5,
        type: [findType('Électrik')._id],
        attaques: [findAttaque('Éclair')._id]
      }
    ];
    const pokemons = await Pokemon.insertMany(pokemonsData);
    console.log(`${pokemons.length} Pokémon insérés.`);

    // ---------- DRESSEURS ----------
    console.log('Insertion des dresseurs...');
    const dresseursData = [
      { nom: 'Sacha', age: 10, ville: 'Carmin-sur-Mer', pokemons: [pokemons[0]._id, pokemons[3]._id] },
      { nom: 'Ondine', age: 12, ville: 'Azuria', pokemons: [pokemons[1]._id] },
      { nom: 'Pierre', age: 15, ville: 'Argenta', pokemons: [pokemons[2]._id] }
    ];
    const dresseurs = await Dresseur.insertMany(dresseursData);
    console.log(`${dresseurs.length} dresseurs insérés.`);

    // ---------- ARÈNES ----------
    console.log('Insertion des arènes...');
    const arenesData = [
      { nom: 'Arène de Carmin', ville: 'Carmin-sur-Mer', type: findType('Feu')._id },
      { nom: 'Arène d’Azuria', ville: 'Azuria', type: findType('Eau')._id }
    ];
    const arenes = await Arene.insertMany(arenesData);
    console.log(`${arenes.length} arènes insérées.`);

    console.log('\nJeu de tests inséré avec succès !');

  } catch (err) {
    console.error('Erreur lors du seed :', err);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB.');
    process.exit(0);
  }
}

main();
