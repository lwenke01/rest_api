'use strict';

const angular = require('angular');
require('angular-route')
const app = angular.module('ArcadeApp', ['ngRoute']);

require('./services/auth-service')(app);
require('./services/error-service')(app);
require('./directives/app-directives')(app);

app.config(['$routeProvider', function(router){
  router
  .when('/signup', {
    controller: 'AuthController',
    controllerAs: 'arcadectrl',
    templateUrl: 'views/signup-in.html'
  })
  .when('/', {
    controller: 'AuthController',
    controllerAs: 'arcadectrl',
    templateUrl: 'views/signup-in.html'
  })
  .when('/home', {
    controller:'AuthController',
    controllerAs: 'arcadectrl',
    templateUrl: 'views/home.html'
  });
}]);

app.controller('AuthController', ['AuthService','$location', 'ErrorService',
function(AuthService, $location, ErrorService) {
  const self = this;
  self.signUp = function(user){
    AuthService.createUser(user, function(err, res){
      if (err) return self.error = ErrorService('problem creating user');
      self.error = ErrorService(null);
      $location.path('/home');
    });
  }
  self.signOut = function(){
    AuthService.signOut(()=>{
      $location.path('/signup');
    });
  }
  self.signIn = function(user){
    AuthService.signIn(user, (err,res)=>{
      if (err) return self.error = ErrorService('problem signing in');
      self.error = ErrorService(null);
      $location.path('/home');
    })
  }
}]);

app.controller('ArcadeController', ['AuthService','$http','$location', 'ErrorService',
function(AuthService, $http, $location, ErrorService) {
  console.log('marker 1');
  const arcadeRoute = 'http://localhost:3000/arcades';
  const self = this;
  self.dance = 'Add New Arcade';
  self.arcades = ['arcade'];
  self.error = ErrorService();
  console.log(self.error);
  self.newArcade = {};
  self.editorOn = false;

  self.getArcades = function(){
    $http.get(arcadeRoute, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function (result) {
      self.error = ErrorService(null);
      self.arcades = result.data.arcades;
    }, (error)=>{
      console.log(error);
      self.error = ErrorService('Please sign in');
      $location.path('/signup');
    });
  };
  self.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      console.log(res.data);
      self.arcades.push(res.data);
      self.newArcade = null;
    });
  };
  self.removeArcade = function(arcade) {
    $http.delete(arcadeRoute + '/' + arcade._id, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      self.arcades = self.arcades.filter((a)=> a._id !=arcade._id);
    });
  };

  self.updateArcade = function(arcade){
    $http.put(arcadeRoute + '/' + arcadeEdit._id, arcade, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then((res)=>{
      arcade.editing = false;
    }, (err) => console.log(err))

  };
  self.toggleForm = function(arcade){
    if(!arcade.editing) {
      arcade.backupName = arcade.name;
      arcade.editing = true;
    }else {
      arcade.name = arcade.backupName;
      arcade.editing = false;
    // });
  };
}]);

app.controller('GameController', ['$scope','$http', function($scope, $http){
  console.log('marker 1');
  const gameRoute = 'http://localhost:3000/games';
  $scope.dances = 'Add New Game';
  this.games = ['game'];
  this.newGame = {};
  this.editorOn = false;

  this.getGames = function(){
    $http.get(gameRoute)
    .then((result)=>{
      this.games = result.data.games;
      this.cancelEdit = angular.copy(this.games);
    }, function(error){
      console.log(error);
    });
  };
  this.createGame = function(game){
    $http.post(gameRoute, game)
    .then((res)=>{
      console.log(res.data);
      this.games.push(res.data);
    });
  };
  this.removeGame = function(game) {
    $http.delete(gameRoute + '/' + game._id)
    .then((res)=>{
      this.games = this.games.filter((g)=> g._id !=game._id);
    });
  };

  this.showEdit = function(){
    this.editorOn = true;
    this.cancelEdit = angular.copy(this.games);
  };

  this.hideEdit = function(){
    this.editorOn = false;
    this.games = this.cancelEdit;
  };


  this.updateGame = function(gameEdit){
    $http.put(gameRoute + '/' + gameEdit._id, gameEdit)
    .then((res)=>{
      this.games = this.games.map((g) =>{
        if(g._id === gameEdit._id){
          return gameEdit;
        } else {
          return g;
        }
      });
    });
  };
  this.cancelUpdate = function(){
    this.games = this.cancelEdit;
  };
}]);
};
