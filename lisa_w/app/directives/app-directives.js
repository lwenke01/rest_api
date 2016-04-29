'use strict';

module.exports = function(app){

  app.directive('customNav', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/tabs.html',
      controller: function(){
        this.tab = 1;
        this.isSet = function(check){
          return this.tab === check;
        };
        this.setTab = function(active){
          this.tab = active;
        };
      },
      controllerAs: 'tabCtrl'
    };
  });
  app.directive('customArcades', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/arcade-template.html',
    };
  });

  app.directive('customGames', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/game-template.html',
    };
  });

};
