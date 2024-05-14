const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

const sequelize = require('./util/database');

const Expense = require('./model/expense');
const User = require('./model/user');
const Order = require('./model/order');

const cors = require('cors');


app.use(bodyParser.json({extended:false}));

app.use(cors());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User)


sequelize.sync()
.then((result) => {
    app.listen(6500)
})
.catch(err => console.log(err))
