const express = require('express');

const router = express.Router();

const premiumController = require('../controller/premium');
const userAuthorization = require('../middleware/auth');

router.get('/premium/showLeaderboard', userAuthorization.authenticate,premiumController.getLeaderboard);





module.exports = router;
