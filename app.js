const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');

const sequelize = require('./util/database');

const cors = require('cors');


app.use(bodyParser.json({extended:false}));

app.use(cors());

app.use(userRoutes);

sequelize.sync()
.then((result) => {
    app.listen(6500)
})
.catch(err => console.log(err))
