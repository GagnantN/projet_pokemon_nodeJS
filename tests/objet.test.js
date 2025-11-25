const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Objet = require('../models/Objet');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('API Objet', () => {
  it('POST /api/objet - crée un objet', async () => {
    const res = await request(app).post('/api/objet').send({
      nom: 'Potion',
      categories: 'Soin',
      description: 'Restaure 20 PV'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Potion');
  });

  it('GET /api/objet - retourne la liste des objets', async () => {
    await Objet.create({ nom: 'Potion', categories: 'Soin', description: 'Restaure 20 PV' });
    const res = await request(app).get('/api/objet');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /api/objet/:id - retourne un objet', async () => {
    const obj = await Objet.create({ nom: 'Potion', categories: 'Soin', description: 'Restaure 20 PV' });
    const res = await request(app).get(`/api/objet/${obj._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Potion');
  });

  it('PUT /api/objet/:id - met à jour un objet', async () => {
    const obj = await Objet.create({ nom: 'Potion', categories: 'Soin', description: 'Restaure 20 PV' });
    const res = await request(app)
      .put(`/api/objet/${obj._id}`)
      .send({ nom: 'Super Potion', categories: 'Soin', description: 'Restaure 50 PV' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Super Potion');
  });

  it('DELETE /api/objet/:id - supprime un objet', async () => {
    const obj = await Objet.create({ nom: 'Potion', categories: 'Soin', description: 'Restaure 20 PV' });
    const res = await request(app).delete(`/api/objet/${obj._id}`);
    expect(res.statusCode).toBe(200);
    const inDb = await Objet.findById(obj._id);
    expect(inDb).toBeNull();
  });
});
