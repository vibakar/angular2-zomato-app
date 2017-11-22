var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

 var schema = new mongoose.Schema({
   username: {
     type: String,
     trim: true
   },
   lastname: {
     type: String,
     trim: true,
     default: ''
   },
   email: {
     type: String,
     unique: true,
     trim: true
   },
   password: {
     type: String,
     trim: true
   },
   city: {
     type: String,
     trim: true,
     default: ''
   },
   state: {
     type: String,
     trim: true,
     default: ''
   },
   mobile: {
     type: Number,
     trim: true,
     default: ''
   },
   photo: {
     type: String,
     trim: true,
     default: ''
   },
   restaurants: {
     type: Array,
     default: []
   }
 });

var User = mongoose.model('users',schema);
module.exports = User;
