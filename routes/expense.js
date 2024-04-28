const path = require('path');

const express = require('express');

const expenseController = require('../controller/expense');

const router = express.Router();

router.post('/expense/add-expense',expenseController.addExpense);

router.get('/expense/get-expenses',expenseController.getExpenses);

router.get('/expense/delete-expense/:id',expenseController.deleteExpense);






module.exports = router;