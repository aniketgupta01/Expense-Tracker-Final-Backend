const path = require('path');

const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/user/signup',userController.addUser);

module.exports = router;