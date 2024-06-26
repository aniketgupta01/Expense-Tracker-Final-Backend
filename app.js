const fs = require('fs')
const path = require('path')


const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan')

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags:'a'
    }
)

const sequelize = require('./util/database');

const Expense = require('./model/expense');
const User = require('./model/user');
const Order = require('./model/order');
const ForgotPassword = require('./model/forgotpassword');
const FilesDownloaded = require('./model/filesDownloaded');

const cors = require('cors');


app.use(bodyParser.json({extended:false}));

app.use(cors());
app.use(helmet());
app.use(morgan('combined', {stream:accessLogStream}))

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);


sequelize.sync()
.then((result) => {
    app.listen(process.env.HOST || 6500)
})
.catch(err => console.log(err))
