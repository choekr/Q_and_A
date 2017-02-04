app.controller('qController', function($scope, userFactory, qFactory, $location, $rootScope, $routeParams){
  $scope.err=[];
  $scope.allQuestions;

  if($routeParams.id){

    userFactory.checkStatus(function(data){
      if(data != null){
        $scope.curUser = data;
        $rootScope.loggedIn = true;
      }
      qFactory.getOne($routeParams.id, function(data){
        if(data !=null){
          $scope.thisQuestion = data;
          $scope.answers = data._answers;
        }
      })
    })
  }

  userFactory.checkStatus(function(data){
    if(data != null){
      $scope.curUser = data;
      $rootScope.loggedIn = true;
    }
    qFactory.getAll(function(data){
      if(data !=null){
        $scope.allQuestions = data.data;
      }
    })
  })


  $scope.newQuestion = function(){
    qFactory.newQuestion();
  }

  $scope.backHome = function(){
    $location.url('/');
  }

  $scope.submitQ = function(){
    $scope.err = [];
    if(!$scope.newQ || $scope.newQ.question.length < 10){
      $scope.err.push('Your question must be at least 10 characters long');
    } else {
      console.log($scope.newQ);
      // qFactory.submitQ($scope.newQ);
    }
  }

  $scope.showAnswers = function(id){
    qFactory.showAnswers(id);
  }

  $scope.newAnswer = function(id){
    qFactory.newAnswer(id);
  }

  $scope.submitA = function(){
    $scope.err = [];
    if(!$scope.newA || $scope.newA.answer.length < 5){
      $scope.err.push('Your answer must be at least 5 characters long');
    } else {
      $scope.newA.question = $scope.thisQuestion._id;
      console.log($scope.newA)
      qFactory.submitA($scope.newA);
    }
  }

  $scope.like = function(id){
    var object = {answer_id: id};
    qFactory.like(object);
  }
})
