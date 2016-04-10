'use strict';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
// var Game = require(__dirname +'./../models/Game');
// var newId;
process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../server');


// describe('testing Game REST api routes', () => {
//   beforeEach((done)=>{
//     var newGame = new Game({
//       name: 'Test Name',
//       address: 'Test Address'
//     });
//     newGame.save((err)=>{
//       done();
//     });
//   });
//   afterEach((done)=>{
//     mongoose.connection.db.dropDatabase(()=>{
//       done();
//     });
//   });
// });
//
// it('POST should post new data to /games', (done)=>{
//   request('localhost:6000')
//       .post('/api/games')
//       .send({})
//       .end((err, res) =>{
//         expect(err).to.eql(null);
//         expect(res).to.have.status(200);
//         // console.log('RES body: ' + res[0]);
//         // expect(res.body.title).to.eql('hey');
//         done();
//       });
// });
// it('GET should receive the /games data', (done)=>{
//   request('localhost:6000')
//       .get('/api/games')
//       .end((err, res) =>{
//         expect(err).to.eql(null);
//         expect(res).to.be.status(200);
//         console.log(res.body);
//         expect(res.body).to.exist;
//         done();
//
//       });
// });
// describe('needs an array to get Game id', () =>{
//   beforeEach((done)=>{
//     var testGame = new Game({title:'test game'});
//     testGame.save((err, data)=>{
//       newId = data.body;
//       this.testGame = data;
//       done();
//     });
//   });
//   it('should be able to make a note in a beforeEach block', ()=>{
//     expect(this.testGame.title).to.eql('test game');
//     expect(this.testGame).to.have.property('_id');
//   });
//   it('GET should receive the /games/:id data', (done)=>{
//     request('localhost:6000')
//       .get('/api/games/' + newId)
//       .end(function(err, res) {
//         expect(err).to.eql(null);
//         expect(res).to.be.status(200);
//         expect(res.body).to.exist;
//         done();
//       });
//   });
//
//   it('PUT should receive the /games/:id data', (done)=>{
//     request('localhost:6000')
//       .put('/api/games/' + newId)
//       .send({title: 'test PUT title'})
//       .end((err, res)=> {
//         expect(err).to.eql(null);
//         expect(res).to.be.status(200);
//         expect(res).to.be.json;
//         done();
//       });
//
//   });
//   it('DELETE should remove the title by the id', (done)=>{
//     request('localhost:6000')
//           .delete('/api/games/'+ newId)
//           .end((err, res)=>{
//             expect(err).to.eql(null);
//             expect(res).to.be.status(200);
//             expect(res).to.be.json;
//             done();
//           });
//   });
//   it('should make an array of game genres for /game-genres', (done)=>{
//     request('localhost:6000')
//         .get('/api/game-genres')
//         .end((err, res)=>{
//           expect(err).to.eql(null);
//           expect(res).to.be.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('genreArray');
//           done();
//         });
//   });
//
// });
