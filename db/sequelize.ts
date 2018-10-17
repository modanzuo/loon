const Sequelize = require('sequelize');
const dbConfig = require('../config/db')
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    pool: {
        max: dbConfig.LIMIT,
        min: 0,
        idle: 10000
    }
});

export {
    sequelize,
    Sequelize
}
