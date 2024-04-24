const path = require('path');

const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/user/signup',userController.addUser);

router.post('/user/login',userController.loginUser);

module.exports = router;