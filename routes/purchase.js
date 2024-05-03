const express = require('express');

const router  = express.Router();

const purchaseController = require('../controller/purchase');
const userAuthorization = require('../middleware/auth');

router.get('/purchase/premiumMembership', userAuthorization.authenticate, purchaseController.purchasePremium);

router.post('/purchase/updatetransactionstatus',userAuthorization.authenticate,purchaseController.updateStatus)





module.exports = router;

