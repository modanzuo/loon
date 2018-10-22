"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
exports.Sequelize = Sequelize;
const dbConfig = require('../config/db');
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    pool: {
        max: dbConfig.LIMIT,
        min: 0,
        idle: 10000
    }
});
exports.sequelize = sequelize;
