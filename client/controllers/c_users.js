app.controller('userController', function($scope, userFactory, $location, $rootScope, $routeParams){
  $scope.err=[];
  var user = $scope.curUser;

  userFactory.checkStatus(function(data){
    if(data != null){
      $scope.curUser = data;
      $rootScope.loggedIn = true;
      $location.url('/dash');
    }
  })

  $scope.login = function(){
    $scope.err=[];
    if(!$scope.user || !$scope.user.name){
      $scope.err.push('Please enter your name!');
      $location.url('/');
    } else if ($scope.user.name.length <= 3){
      $scope.err.push('Your name must be longer than 3 characters');
    } else {
      userFactory.login($scope.user);
      $scope.user = {};
    }
  }
})
