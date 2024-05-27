const path = require('path');

const express = require('express');

const expenseController = require('../controller/expense');
const userAuthorization = require('../middleware/auth');

const router = express.Router();

router.post('/expense/add-expense',userAuthorization.authenticate,expenseController.addExpense);

router.get('/expense/get-expenses', userAuthorization.authenticate, expenseController.getExpenses);

router.get('/expense/delete-expense/:id',userAuthorization.authenticate,expenseController.deleteExpense);






module.exports = router;