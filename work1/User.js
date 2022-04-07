const { Sequelize, DataTypes, Model } = require('sequelize')
//const sequelize = new Sequelize('mysql::memory:');
const sequelize = require('./database')

class User extends  Model {}

User.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'user'
    }
    );

module.exports = User;