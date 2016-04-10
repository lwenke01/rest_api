
'use strict';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
// var Arcade = require(__dirname +'./../models/Arcade');
// var newId;
process.env.MONGOLAB_URI || 'mongodb://localhost/test';
require(__dirname + '/../server');

describe('testing Arcade REST api routes', () => {
  var authToken;
  var arcade_id;

  before((done)=>{
    request('localhost:9000')
    .post('/signup')
    .send({
      name:'Ginger Gold',
      password:'Hero89',
      email:'gingergold@gmail.com'
    })
    .end((err, res)=>{

      if (err) console.log(res.body);
      authToken = res.body.token;
      done();
    });
  });

  after((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });


  describe('arcade routes', ()=>{
    it('should only POST with allowedd access/correct token to /arcades', (done)=>{
      request('localhost:9000')
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
      request('localhost:9000')
      .post('/arcades')
      // .set('token', authToken)
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
      request('localhost:9000')
      .post('/arcades')
      // .set('token', authToken)
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
      request('localhost:9000')
      .get('/arcades')
      // .set('token', authToken)
      .end((err, res)=> {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        expect(res).to.be.json;
        console.log('ARCADE BODY: ' + res.body);
        expect(res.body).to.exist;
        expect(Array.isArray(res.body.data)).to.eql(true);
        done();

      });
    });

    it('GET should receive the /arcades/:id data', (done)=>{
      request('localhost:9000')
      .get('/arcades/' + arcade_id)
      // .set('token', authToken)
      .end((err, res)=> {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        console.log('NEW ID:' + res.body.newId);
        expect(res.body.name).to.eql('test arcade');
        done();
      });
    });

    it('PUT should receive the /arcades/:id data', (done)=>{
      request('localhost:9000')
      .put('/arcades/' + arcade_id)
      // .set('token', authToken)
      .send({name: 'test PUT name'})
      .end((err, res)=> {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        expect(res.body.msg).to.eql('update success');
        done();
      });

    });
    it('DELETE should remove the arcade by the id', (done)=>{
      request('localhost:9000')
      .delete('/arcades/'+ arcade_id)
      // .set('token', authToken)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        expect(res.body.msg).to.eql('arcade removed');
        done();
      });
    });
    it('should make an array of arcade names for /arcade-names', (done)=>{
      request('localhost:9000')
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
  describe('testing Game REST api routes', () => {


  it('POST should post new data to /games', (done)=>{
    request('localhost:9000')
        .post('/games')
        // .set('token', authToken)
        .send({})
        .end((err, res) =>{
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          // console.log('RES body: ' + res[0]);
          // expect(res.body.title).to.eql('hey');
          done();
        });
  });
  it('GET should receive the /games data', (done)=>{
    request('localhost:9000')
        .get('/games')
        .end((err, res) =>{
          expect(err).to.eql(null);
          expect(res).to.be.status(200);
          // console.log(res.body);
          expect(res.body).to.exist;
          done();

        });
  });
  describe('needs an array to get Game id', () =>{
    var newId = '';
    it('GET should receive the /games/:id data', (done)=>{
      request('localhost:9000')
        .get('/games/' + newId)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.be.status(200);
          expect(res.body).to.exist;
          done();
        });
    });

    it('PUT should receive the /games/:id data', (done)=>{
      request('localhost:9000')
        .put('/api/games/' + newId)
        .send({title: 'test PUT title'})
        .end((err, res)=> {
          expect(err).to.eql(null);
          expect(res).to.be.status(200);
          expect(res).to.be.json;
          done();
        });

    });
    it('DELETE should remove the title by the id', (done)=>{
      request('localhost:9000')
            .delete('/games/'+ newId)
            .end((err, res)=>{
              expect(err).to.eql(null);
              expect(res).to.be.status(200);
              expect(res).to.be.json;
              done();
            });
    });
    it('should make an array of game genres for /game-genres', (done)=>{
      request('localhost:9000')
          .get('/game-genres')
          .end((err, res)=>{
            expect(err).to.eql(null);
            expect(res).to.be.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('genreArray');
            done();
          });
    });

  });

  });
});
