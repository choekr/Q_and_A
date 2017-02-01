var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'partials/logreg.html'
  })
  .when('/dash', {
    templateUrl: 'partials/dash.html'
  })
  .when('/new_question', {
    templateUrl: 'partials/newQ.html'
  })
  .when('/questions/:id', {
    templateUrl: 'partials/show.html'
  })
  .when('/questions/:id/new_answer', {
    templateUrl: 'partials/answer.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})
