const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const sequelize = require('./util/database');

const Expense = require('./model/expense');
const User = require('./model/user');

const cors = require('cors');


app.use(bodyParser.json({extended:false}));

app.use(cors());

app.use(userRoutes);
app.use(expenseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync()
.then((result) => {
    app.listen(6500)
})
.catch(err => console.log(err))
