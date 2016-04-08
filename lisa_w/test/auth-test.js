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
    it('should authenticate new user at users')
  it('should add a new user', (done)=>{
    request('localhost:6000')
    .post('signup')
    .send({
      username: 'Mary Day',
      password:
    })

  })
});
  })
