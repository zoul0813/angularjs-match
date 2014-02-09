var app = angular.module('match', ['ngRoute', 'ui.bootstrap']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/match/views/index.html',
    controller: 'matchController',
  })
  .otherwise({ 
    redirectTo: '/',
  });
}]);

app.run(function($rootScope) {
  $rootScope.$safeApply = function($scope, fn) {
    fn = fn || function() {};
    if($scope.$$phase) {
      //don't worry, the value gets set and AngularJS picks up on it...
      fn();
    }
    else {
      //this will fire to tell angularjs to notice that a change has happened
      //if it is outside of it's own behaviour...
      $scope.$apply(fn);
    }
  };
})

jQuery(function($) {
  angular.bootstrap(document, ['match']);
});