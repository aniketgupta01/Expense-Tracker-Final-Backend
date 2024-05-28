const express = require('express');

const router = express.Router();

const passwordController = require('../controller/password');

router.post('/password/forgot-password',passwordController.forgotPassword);



module.exports = router;

