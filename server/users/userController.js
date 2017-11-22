var User = require('./userEntity');
var session = require('express-session');
var path = require('path');
var multer = require('multer');
var userEmail  = '';
var userPic = '';
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '../angular2-zomato-app/src/assets/images')
  },
  filename: function(req, file, callback) {
    userPic = file.originalname;
    userController.updateFoto();
    callback(null, userPic);
  }
});

var upload = multer({
        storage: storage
      }).single('userFile');

var userController = {
    signup: function(req,res) {
      req.session.email = req.body.email;
      userEmail = req.body.email;
      var userDetails = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      userDetails.save().then((doc)=>{
        res.send(doc);
      },(err)=>{
        res.send(err)
      });
    },

    login: function(req,res) {
      req.session.email = req.body.email;
      userEmail = req.body.email;
      res.send({responseText:'authenticated',userEmail: req.body.email});
    },

    logout: function(req,res) {
      req.session.destroy();
      if(!req.session){
        res.send({responseText: "sessionDestroyed"})
      }else{
        res.send({responseText: "failed"})
      }

    },

    getRestaurants: function(req,res) {
      User.find({"email":req.session.email}).then((docs) => {
          res.send(docs[0].restaurants);
      }, (err) => {
          res.send(err);
      });
    },

    addRestaurant: function(req, res) {
      User.findOneAndUpdate({"email":req.session.email},{$push:{restaurants:req.body}},{safe:true})
           .then((docs)=>{
             res.send(docs)
           },(err)=>{
             res.send(err)
           });
    },

    deleteRestaurant: function(req, res) {
      User.update({"email":req.session.email},
                  {$pull:{restaurants:{"restaurantId":req.params.id}}},{safe: true,multi: true})
                  .then((docs)=>res.send(docs),
                        (err)=>res.send(err))
    },

    deleteAllRestaurants: function(req, res) {
      User.update({"email":req.session.email},
                  {$set:{restaurants:[]}})
                  .then((docs)=>res.send(docs),
                        (err)=>res.send(err))
    },

    getUsername: function(req, res) {
      User.find({"email":req.session.email})
          .then((docs) =>res.send(docs),
                (err) =>res.send(err));
    },

    checkUserExixts: function(req, res) {
      User.find({"email": req.body.email})
          .then((docs)=>{
              res.send(docs)
          },
          (err)=>res.send(err))
    },

    resetPassword: function(req, res) {
      User.update({"email":req.body.email || req.session.email},
                  {$set:{password:req.body.password}})
                  .then((docs)=>res.send(docs),
                        (err)=>res.send(err))
    },

    updateUserDetails: function(req, res) {
      User.update({"email": req.body.email},
                  {$set:{username:req.body.firstName,
                         lastname: req.body.lastName,
                         city: req.body.city,
                         state: req.body.state,
                         mobile: req.body.mobile
                        }
                      })
                  .then((docs)=>res.send(docs),
                        (err)=>res.send(err))
    },

    updateFoto: function(){
        User.update({"email": userEmail},
                  {$set:{photo: userPic}})
                  .then((docs)=>{console.log('foto updated')},
                        (err)=>{console.log("failed to update foto")})
    },

    upload: function(req, res) {
      upload(req, res, function(err) {
        if(err){
          console.log(err);
          res.redirect('/profile');
        }
        res.redirect('/profile');
      })
    }

}

module.exports = userController;
