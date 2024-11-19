const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seed');
const data = require('../db/data');

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe('GET /api', function () {
  test('200: should respond with an okay message', function () {
    return request(app) // returning a promise (so jest waits for the response)
      .get('/api')
      .expect(200) // asserting with supertest that the status is 200
      .then(({ body }) => {
        expect(body.msg).toBe('all okay!'); // jest assertion
      }); // the promise resolves with the response (kinda)
  });
});

describe('GET /api/snacks/:id', () => {
  test('200: responds with an individual snack', () => {
    return request(app)
      .get('/api/snacks/1')
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.snack).toMatchObject({
          snack_id: 1,
          snack_name: 'Snack A',
          snack_description: 'Snack description A',
          price_in_pence: 100,
          category_id: 2,
        });
      });
  });
});

// get all snacks
// delete snack by id
// patch snack price
// post new snack
