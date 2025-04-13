const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'ecom',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '123456',
    {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },
    },
);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
