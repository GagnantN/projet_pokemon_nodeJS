const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Attaque = require('../models/Attaque');
const Type = require('../models/Type');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('API Attaque', () => {
  async function createTypeBase() {
    return await Type.create({ nom: 'Feu' });
  }

  it('POST /api/attaque - crée une attaque', async () => {
    const type = await createTypeBase();
    const res = await request(app)
      .post('/api/attaque')
      .send({
        nom: 'Flamme',
        puissance: 50,
        precision: 100,
        type: type._id.toString()
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Flamme');
  });

  it('GET /api/attaque - retourne la liste des attaques', async () => {
    const type = await createTypeBase();
    await Attaque.create({ nom: 'Flamme', puissance: 50, precision: 100, type: type._id });
    const res = await request(app).get('/api/attaque');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /api/attaque/:id - retourne une attaque', async () => {
    const type = await createTypeBase();
    const atk = await Attaque.create({ nom: 'Flamme', puissance: 50, precision: 100, type: type._id });
    const res = await request(app).get(`/api/attaque/${atk._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Flamme');
  });

  it('PUT /api/attaque/:id - met à jour une attaque', async () => {
    const type = await createTypeBase();
    const atk = await Attaque.create({ nom: 'Flamme', puissance: 50, precision: 100, type: type._id });

    const res = await request(app)
      .put(`/api/attaque/${atk._id}`)
      .send({ nom: 'Flamme améliorée', puissance: 80, precision: 95, type: type._id.toString() });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Flamme améliorée');
    expect(res.body.puissance).toBe(80);
  });

  it('DELETE /api/attaque/:id - supprime une attaque', async () => {
    const type = await createTypeBase();
    const atk = await Attaque.create({ nom: 'Flamme', puissance: 50, precision: 100, type: type._id });

    const res = await request(app).delete(`/api/attaque/${atk._id}`);
    expect(res.statusCode).toBe(200);

    const inDb = await Attaque.findById(atk._id);
    expect(inDb).toBeNull();
  });
});
