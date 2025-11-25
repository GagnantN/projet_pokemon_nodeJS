const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Pokemon = require('../models/Pokemon');
const Type = require('../models/Type');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('API Pokemon', () => {
  async function createTypesDeBase() {
    const typeFeu = await Type.create({ nom: 'Feu' });
    const typeEau = await Type.create({ nom: 'Eau' });
    return { typeFeu, typeEau };
  }

  it('POST /api/pokemon - crée un Pokémon', async () => {
    const { typeFeu } = await createTypesDeBase();

    const res = await request(app)
      .post('/api/pokemon')
      .send({
        nom: 'Salamèche',
        niveau: 5,
        types: [typeFeu._id.toString()],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nom).toBe('Salamèche');
    expect(res.body.types.length).toBe(1);
  });

  it('GET /api/pokemon - retourne la liste des Pokémon', async () => {
    const { typeFeu, typeEau } = await createTypesDeBase();

    await Pokemon.create({ nom: 'Salamèche', niveau: 5, types: [typeFeu._id] });
    await Pokemon.create({ nom: 'Carapuce', niveau: 5, types: [typeEau._id] });

    const res = await request(app).get('/api/pokemon');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('GET /api/pokemon/:id - retourne un Pokémon', async () => {
    const { typeFeu } = await createTypesDeBase();
    const poke = await Pokemon.create({ nom: 'Salamèche', niveau: 5, types: [typeFeu._id] });

    const res = await request(app).get(`/api/pokemon/${poke._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Salamèche');
  });

  it('PUT /api/pokemon/:id - met à jour un Pokémon', async () => {
    const { typeFeu, typeEau } = await createTypesDeBase();
    const poke = await Pokemon.create({ nom: 'Salamèche', niveau: 5, types: [typeFeu._id] });

    const res = await request(app)
      .put(`/api/pokemon/${poke._id}`)
      .send({ nom: 'Salamèche modifié', niveau: 10, types: [typeEau._id.toString()] });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Salamèche modifié');
    expect(res.body.niveau).toBe(10);
    expect(res.body.types.length).toBe(1);
  });

  it('DELETE /api/pokemon/:id - supprime un Pokémon', async () => {
    const { typeFeu } = await createTypesDeBase();
    const poke = await Pokemon.create({ nom: 'Salamèche', niveau: 5, types: [typeFeu._id] });

    const res = await request(app).delete(`/api/pokemon/${poke._id}`);
    expect(res.statusCode).toBe(200);

    const inDb = await Pokemon.findById(poke._id);
    expect(inDb).toBeNull();
  });
});
