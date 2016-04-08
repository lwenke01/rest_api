'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../server');

describe('testing auth REST api routes', () => {
  var authToken, mary_id, frank_id;
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
  });
  after((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('test user routes', ()=>{
    it('should authenticate new user at users', (done)=>{
      request('localhost:6000')
      .get('/users')
      .end((err, res)=>{
        expect(err.status).to.eql(401);
        expect(res.body.msg).to.eql('cannot authenticate password for account');
        done();
      });
    });
    it('should add a new user', (done)=>{
      request('localhost:6000')
      .post('/signup')
      .send({
        username: 'Mary Day',
        password:'Sunny88',
        email: 'sunnyday88@hotmail.com'
      })
      .end((err, res)=>{
        mary_id = res.body._id;
        expect
      })
      done();
    });
  });

});
