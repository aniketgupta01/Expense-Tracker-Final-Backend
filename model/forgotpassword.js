const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ForgotPassword = sequelize.define('forgot-password-requests',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true

    },
    isActive:Sequelize.BOOLEAN
})

module.exports = ForgotPassword;