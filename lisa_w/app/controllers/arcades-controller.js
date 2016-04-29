'use strict';

module.exports = (app) => {

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
      .then((result)=>{
        self.error = ErrorService(null);
        self.arcades = result.data.arcades;
        self.cancelEdit = angular.copy(this.arcades);
      }, function(error){
        console.log(error);
        self.error = ErrorService('Please sign in');
        $location.path('/signup');
      });
    };
    self.createArcade = function(arcade){
      $http.post(arcadeRoute, arcade, {
        headers: {
          token: AuthService.getToken()
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
          token: AuthService.getToken()
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

      }
    }
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
      });
    }
  }]);

app.config(['$routeProvider', function(router){
  router
  .when('/signup', {
    controller: 'ArcadeController',
    controllerAs: 'arcadectrl',
    templateUrl: 'views/signup-in.html'
  })
  .when('/home', {
    controller:'ArcadeController',
    controllerAs: 'arcadectrl',
    templateUrl: 'views/home.html'
  })
  }])
};
