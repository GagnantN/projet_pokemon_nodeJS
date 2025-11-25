const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Dresseur = require('../models/Dresseur');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('API Dresseur', () => {
  it('POST /api/dresseur - crée un dresseur', async () => {
    const res = await request(app)
      .post('/api/dresseur')
      .send({ nom: 'Sacha', age: 10, ville: 'Carmin-sur-Mer' });

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Sacha');
  });

  it('GET /api/dresseur - retourne la liste des dresseurs', async () => {
    await Dresseur.create({ nom: 'Sacha', age: 10 });
    await Dresseur.create({ nom: 'Ondine', age: 12 });

    const res = await request(app).get('/api/dresseur');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('GET /api/dresseur/:id - retourne un dresseur', async () => {
    const dr = await Dresseur.create({ nom: 'Sacha', age: 10 });
    const res = await request(app).get(`/api/dresseur/${dr._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Sacha');
  });

  it('PUT /api/dresseur/:id - met à jour un dresseur', async () => {
    const dr = await Dresseur.create({ nom: 'Sacha', age: 10 });

    const res = await request(app)
      .put(`/api/dresseur/${dr._id}`)
      .send({ nom: 'Sacha K.', age: 11, ville: 'Argenta' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Sacha K.');
    expect(res.body.age).toBe(11);
  });

  it('DELETE /api/dresseur/:id - supprime un dresseur', async () => {
    const dr = await Dresseur.create({ nom: 'Sacha', age: 10 });

    const res = await request(app).delete(`/api/dresseur/${dr._id}`);
    expect(res.statusCode).toBe(200);

    const inDb = await Dresseur.findById(dr._id);
    expect(inDb).toBeNull();
  });
});
