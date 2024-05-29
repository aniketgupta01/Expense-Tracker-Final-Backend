const express = require('express');

const router = express.Router();

const passwordController = require('../controller/password.js');

router.post('/password/forgot-password',passwordController.forgotPassword);

router.get('/password/reset-password/:id',passwordController.resetPassword);

router.get('/password/updatePassword/:id',passwordController.updatePassword);



module.exports = router;

