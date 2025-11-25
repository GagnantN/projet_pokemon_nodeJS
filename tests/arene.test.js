const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Arene = require('../models/Arene');
const Type = require('../models/Type');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('API Arène', () => {
  async function createTypeBase() {
    return await Type.create({ nom: 'Feu' });
  }

  it('POST /api/arene - crée une arène', async () => {
    const type = await createTypeBase();
    const res = await request(app)
      .post('/api/arene')
      .send({ nom: 'Arène de Kanto', ville: 'Pewter', type: type._id.toString() });

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Arène de Kanto');
  });

  it('GET /api/arene - retourne la liste des arènes', async () => {
    const type = await createTypeBase();
    await Arene.create({ nom: 'Arène 1', ville: 'Ville1', type: type._id });
    await Arene.create({ nom: 'Arène 2', ville: 'Ville2', type: type._id });

    const res = await request(app).get('/api/arene');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('GET /api/arene/:id - retourne une arène', async () => {
    const type = await createTypeBase();
    const arene = await Arene.create({ nom: 'Arène 1', ville: 'Ville1', type: type._id });

    const res = await request(app).get(`/api/arene/${arene._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Arène 1');
  });

  it('PUT /api/arene/:id - met à jour une arène', async () => {
    const type = await createTypeBase();
    const arene = await Arene.create({ nom: 'Arène 1', ville: 'Ville1', type: type._id });

    const res = await request(app)
      .put(`/api/arene/${arene._id}`)
      .send({ nom: 'Arène modifiée', ville: 'VilleX', type: type._id.toString() });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Arène modifiée');
  });

  it('DELETE /api/arene/:id - supprime une arène', async () => {
    const type = await createTypeBase();
    const arene = await Arene.create({ nom: 'Arène 1', ville: 'Ville1', type: type._id });

    const res = await request(app).delete(`/api/arene/${arene._id}`);
    expect(res.statusCode).toBe(200);

    const inDb = await Arene.findById(arene._id);
    expect(inDb).toBeNull();
  });
});
