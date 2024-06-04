const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const FilesDownloaded = sequelize.define('files-downloaded',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    url:Sequelize.STRING
})

module.exports = FilesDownloaded;

