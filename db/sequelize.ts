const Sequelize = require('sequelize');
const config = require('config')
const log = require('../config/log')
let NAME = config.get('dbConfig.NAME')
if (config.get('dev')) {
    NAME = config.get('dbConfig.XCX_NAME')
}
const sequelize = new Sequelize(
    NAME,
    config.get('dbConfig.USER'),
    config.get('dbConfig.PASS'),
    {
        host: config.get('dbConfig.HOST'),
        dialect: 'mysql',
        query: {raw: true},
        operatorsAliases: false,
        pool: {
            max: config.get('dbConfig.LIMIT'),
            min: 0,
            idle: 10000
        },
        logging:log.info
    });

export {
    sequelize,
    Sequelize
}
