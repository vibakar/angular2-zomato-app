var mongoose = require('mongoose');

mongoose.connect('mongodb://vibakar:vibakar@ds153652.mlab.com:53652/zomato');

mongoose.connection.once('open',function(){
  console.log('connected to mongodb');
});

mongoose.connection.on('error',function(){
  console.log('mongodb connection failed');
});

module.exports = mongoose;
