var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/zomato');

mongoose.connection.once('open',function(){
  console.log('connected to mongodb');
});

mongoose.connection.on('error',function(){
  console.log('mongodb connection failed');
});

module.exports = mongoose;
