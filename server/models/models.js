var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: {type: String, required: true, minlength:3},
  _questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  _answers: [{type: Schema.Types.ObjectId, ref:'Answer'}]
}, {timestamps: true})
mongoose.model('User', UserSchema);

var QSchema = new Schema({
  question: {type: String, required:true, minlength:10},
  description: {type: String, required: false},
  _answers: [{type: Schema.Types.ObjectId, ref:'Answer'}],
  _createdBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})
mongoose.model('Question', QSchema);

var ASchema = new Schema({
  answer: {type: String, required:true, minlength: 5},
  detail: {type: String, required: false},
  likes: {type: Number, required: false},
  _answerBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
  _question: [{type: Schema.Types.ObjectId, ref:'Question'}],
})
mongoose.model('Answer', ASchema)
