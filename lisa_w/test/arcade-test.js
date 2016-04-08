'use strict';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
// var Arcade = require(__dirname +'./../models/Arcade');
// var newId;
process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../server');

describe('testing Arcade REST api routes', () => {
  var authToken, arcade_id;

  before((done)=>{
    request('localhost:6000')
    .post('/signup')
    .send({
      name:'Ginger Gold',
      password:'Hero89',
      email:'gingergold@gmail.com'
    })
    .end((err, res)=>{
      if (err) console.log(err);
      authToken = res.body.token;
      done();
    });

  after((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('arcade routes', ()=>{
    it('should only POST with allowedd access/correct token to /arcades', (done)=>{
      request('localhost:6000')
      .post('/arcades')
      .send({
        name: 'Ginger Games',
        address: '908 87th ave e'
      })
      .end((err, res)=>{
        expect(err.status).to.eql(401);
        expect(res.body.msg).to.eql('cannot authenticate password for account');
        done();
      });
    });
  it('should create a new arcade via POST in /Arcades', (done)=>{
    request('localhost:6000')
    .post('/arcades')
    .set('token', authToken)
    .send({
      name: 'test arcade',
      address: 'test address'
    })
    .end((err, res) =>{
      arcade_id = res.body._id;
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log('POST DATA: ' + res.body.data);
      expect(res.body.name).to.eql('test arcade');
      expect(res.body.data).to.have.property('_id');
      done();
    });
  });
  it('should create a 2nd arcade via POST in /Arcades', (done)=>{
    request('localhost:6000')
    .post('/arcades')
    .set('token', authToken)
    .send({
      name: 'test arcade1',
      address: 'test address1'
    })
    .end((err, res) =>{
      arcade_id = res.body._id;
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log('POST DATA: ' + res.body.data);
      expect(res.body.name).to.eql('test arcade1');
      expect(res.body.data).to.have.property('_id');
      done();
    });
  });
  it('GET should receive the /arcades data in an array', (done)=>{
    request('localhost:6000')
    .get('/arcades')
    .set('token', authToken)
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      expect(res.body).to.exist;
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();

    });
  });

  it('GET should receive the /arcades/:id data', (done)=>{
    request('localhost:6000')
    .get('/arcades/' + arcade_id)
    .set('token', authToken)
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log('NEW ID:' + res.body.newId);
      expect(res.body.name).to.eql('test arcade');
      done();
    });
  });

  it('PUT should receive the /arcades/:id data', (done)=>{
    request('localhost:6000')
    .put('/arcades/' + arcade_id)
    .set('token', authToken)
    .send({name: 'test PUT name'})
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      expect(res.body.msg).to.eql('update success');
      done();
    });

  });
  it('DELETE should remove the arcade by the id', (done)=>{
    request('localhost:6000')
        .delete('/arcades/'+ arcade_id)
        .set('token', authToken)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.be.status(200);
          expect(res.body.msg).to.eql('arcade removed');
          done();
        });
  });
  it('should make an array of arcade names for /arcade-names', (done)=>{
    request('localhost:6000')
      .get('/arcade-names')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('nameArray');
        done();
      });
  });
});
