app.factory('qFactory', function($http, $location, $route){
  var factory = {};

  factory.newQuestion = function(){
    $location.url('/new_question');
  }

  factory.submitQ = function(q){
    $http.post('/questions/add_question', q).then(function(output){
      $location.url('/');
    })
  }

  factory.getAll = function(cb){
    $http.get('/questions/get_all').then(function(output){
      cb(output);
    })
  }

  factory.showAnswers = function(id){
    $location.url('/questions/' + id);
  }

  factory.newAnswer = function(id){
    $location.url('/questions/' + id + '/new_answer');
  }

  factory.getOne = function(id, cb){
    $http.get('/questions/get_all').then(function(output){
      var question;
      // console.log(output.data);
      for (item in output.data){
        // console.log(output.data[item]._id);
        if(output.data[item]._id == id){
          question = output.data[item];
        }
      }
      cb(question);
    })
  }

  factory.submitA = function(a){
    $http.post('/questions/add_answer', a).then(function(output){
      $location.url('/');
    })
  }

  factory.like = function(id){
    $http.post('/questions/like', id).then(function(output){
      console.log('factory: ', output);
      $route.reload();
    })
  }
  return factory;
})
