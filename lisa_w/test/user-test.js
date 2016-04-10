'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

process.env.MONGOLAB_URI || 'mongodb://localhost/test1';
require(__dirname + '/../server');

describe('testing auth REST api routes', () => {
  var authToken, mary_id;
  before((done)=>{
    request('localhost:9000')
    .post('/signup')
    .send({
      name:'Ginger Gold',
      password:'Hero89',
      email:'gingergold@gmail.com'
    })
    .end((err, res)=>{
      if (err) console.log(err);
      authToken = res.body.token;
      console.log('TOKEN: ' + res.body.token);
      done();
    });
  });
  after((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('test user routes', ()=>{
    it('should authenticate new user at users', (done)=>{
      request('localhost:9000')
      .get('/users')
      .end((err, res)=>{
        expect(err.status).to.eql(404);
        expect(res.body.msg).to.eql('cannot authenticate password for account');
        done();
      });
    });
    it('should add a new user', (done)=>{
      request('localhost:9000')
      .post('/signup')
      .send({
        username: 'Mary Day',
        password:'Sunny88',
        email: 'sunnyday88@hotmail.com'
      })
      .end((err, res)=>{
        mary_id = res.body._id;
        expect(err).to.eql(null);
        done();
      });
    });
    it('should get 2nd user to create an array', (done)=>{
      request('localhost:9000')
      .post('/signup')
      .send({
        username: 'Frank Foley',
        password: 'Franky09',
        email: 'franklinlikescats@gmail.com'
      })
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
    });
    it('should GET all the users', (done)=>{
      request('localhost:9000')
      .get('/users')
      // .set('token', authToken)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(Array.isArray(res.body.data)).to.eql(true);
        done();
      });
    });
    it('should get user by ID',(done)=>{
      request('localhost:6000')
      .get('/users/' + mary_id)
      // .set('token', authToken)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res.body.username).to.eql('Mary Day');
        done();
      });
    });
    it('should update a user by id', (done)=>{
      request('localhost:9000')
      .put('/users/' + mary_id)
      // .set('token', authToken)
      .send({name: 'Jane Wayne'})
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res.body.username).to.eql('Jane Wayne');
        done();
      });
    });
  });

});
