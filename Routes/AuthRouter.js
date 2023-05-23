const express = require('express');
const router = express.Router();

const SignUpMW = require('../MiddlewWares/SignUpMW');
const SignController = require('../Controllers/SignController');

// Sign Up
router.post('/signup', SignUpMW, SignController.signup);

// Sign In
router.post('/signin', SignController.signin);


module.exports = router