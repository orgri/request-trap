const chai = require('chai');
const chaiHttp = require('chai-http');
const { setupDB } = require('./fixtures/db');
const app = require('../app');
const Requests = require('../models/requests');
const expect = chai.expect;

chai.use(chaiHttp);
before(setupDB);

describe('Requests', () => {
  it('GET index page: "/"', async () => {
    const res = await chai.request(app)
      .get('/');

    expect(res).have.status(200);
    expect(res).be.html;
  });

  it('GET 404 page', async () => {
    const res = await chai.request(app)
      .get('/test/wrongroute');

    expect(res).have.status(404);
    expect(res).be.html;
  });

  it('save request (POST): "/{id}"', async () => {
    const res = await chai.request(app)
      .post('/testid')
      .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
      .send({ 'user': 'testuser' });
    
    expect(res).have.status(201);
    const request = await Requests.findById(res.body._id);
    expect(request).be.a('object');
  });

  it('save request (PUT): "/{id}"', async () => {
    const res = await chai.request(app)
      .put('/testid')
      .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
      .send({ 'user': 'testuser' });
    
    expect(res).have.status(201);
    const request = await Requests.findById(res.body._id);
    expect(request).be.a('object');
  });

  it('save request (GET): "/{id}"', async () => {
    const res = await chai.request(app)
      .get('/testid')
      .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
      .send({ 'user': 'testuser' });
    
    expect(res).have.status(201);
    const request = await Requests.findById(res.body._id);
    expect(request).be.a('object');
  });

  it('GET requests for existing id: "/{id}/requests"', async () => {
    const res = await chai.request(app)
      .get('/testid/requests');

    expect(res).have.status(200);
    expect(res).be.html;
  });

  it('GET requests for absent id: "/wrongid/requests"', async () => {
    const res = await chai.request(app)
      .get('/wrongid/requests');

    expect(res).have.status(200);
    expect(res).be.html;
  });
});
