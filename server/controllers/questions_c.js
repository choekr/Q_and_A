var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');

module.exports = (function(){
  return{
    newQuestion: function(req,res){
      var question = new Question(req.body);
      User.findOne({name: req.session.user.name}, function(err,data){
        if(err){
          console.log(err);
          res.json(err);
        } else {
          data._questions.push(question._id);
          req.session.user._questions.push(question._id);
          req.session.save();
          data.save();
        }        
      })
      question._createdBy.push(req.session.user._id);
      question.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('successfully added question in db');
        }
      });
      // console.log(req.session.user);
      // console.log(question);
      res.json(true);
    }, 

    getAll: function(req,res){
      Question.find({}).populate({path:'_createdBy'}).populate({path:'_answers', populate:{path:'_answerBy'}}).exec(function(err,data){
        if(err){
          console.log(err);
        } else {
          res.json(data);
        }
      })
    },

    newAnswer: function(req,res){
      var answer = new Answer(req.body);
      answer._question.push(req.body.question);
      answer._answerBy.push(req.session.user._id);
      answer.likes = 0;
      User.findOne({name: req.session.user.name}, function(err,data){
        if(err){
          console.log(err);
          res.json(err);
        } else {
          data._answers.push(answer._id);
          req.session.user._answers.push(answer._id);
          req.session.save();
          data.save();
        }
      })
      Question.findOne({_id:req.body.question}, function(err,data){
        if(err){
          console.log(err);
          res.json(err);
        } else {
          data._answers.push(answer._id);
          data.save();
        }
      })
      answer.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('successfully submitted answer in db')
        }
      })
      res.json(true);
    },

    like: function(req,res){
      Answer.findOne({_id:req.body.answer_id}, function(err,data){
        if(err){
          console.log(err);
          res.json(err);
        } else {

          data.likes += 1;
          // console.log(data);
          data.save();
          res.json(data);
        }
      })
    }
  }
})();
