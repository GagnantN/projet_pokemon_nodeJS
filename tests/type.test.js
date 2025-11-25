const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Type = require('../models/Type');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('API Type', () => {
  it('POST /api/type - crée un type', async () => {
    const res = await request(app)
      .post('/api/type')
      .send({ nom: 'Feu', faiblesses: [], resistances: [], immunites: [] });

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Feu');
  });

  it('GET /api/type - retourne la liste des types', async () => {
    await Type.create({ nom: 'Feu' });
    await Type.create({ nom: 'Eau' });

    const res = await request(app).get('/api/type');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('GET /api/type/:id - retourne un type', async () => {
    const type = await Type.create({ nom: 'Feu' });
    const res = await request(app).get(`/api/type/${type._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Feu');
  });

  it('PUT /api/type/:id - met à jour un type', async () => {
    const type = await Type.create({ nom: 'Feu' });
    const res = await request(app)
      .put(`/api/type/${type._id}`)
      .send({ nom: 'Feu modifié', faiblesses: [], resistances: [], immunites: [] });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Feu modifié');
  });

  it('DELETE /api/type/:id - supprime un type', async () => {
    const type = await Type.create({ nom: 'Feu' });
    const res = await request(app).delete(`/api/type/${type._id}`);
    expect(res.statusCode).toBe(200);

    const inDb = await Type.findById(type._id);
    expect(inDb).toBeNull();
  });
});
