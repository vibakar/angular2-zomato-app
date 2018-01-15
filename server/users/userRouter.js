const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

router.post('/signup', userController.signup);
router.get('/getRestaurants/:email', userController.getRestaurants);
router.put('/addRestaurant', userController.addRestaurant);
router.delete('/deleteRestaurant/:id', userController.deleteRestaurant);
router.delete('/deleteAllRestaurants/', userController.deleteAllRestaurants);
router.post('/checkUser', userController.checkUserExixts);
router.get('/getUserInfo/:email', userController.getUserInfo);
router.put('/resetPassword', userController.resetPassword);
router.put('/updateUserDetails', userController.updateUserDetails);
router.post('/login', passport.authenticate('local', {
       failureFlash: 'Invalid Username and Password',
       successFlash: "Welcome to foodie App"
     }),userController.login);
router.get('/logout', userController.logout);
router.post('/upload', userController.upload);

module.exports = router;
