var user = require('./../controllers/users_c.js');
var question = require('./../controllers/questions_c.js')

module.exports = function(app){
  app.post('/login', user.login);

  app.get('/checkstatus', user.checkStatus);

  app.get('/logout', user.logout);

  app.post('/questions/add_question', question.newQuestion);

  app.get('/questions/get_all', question.getAll);

  app.post('/questions/add_answer', question.newAnswer);

  app.post('/questions/like', question.like);
}
