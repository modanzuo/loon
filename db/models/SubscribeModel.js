"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const SubscribeModel = sequelize_1.sequelize.define('subscribe', {
    id: {
        field: 'user_id',
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    user_id: {
        field: 'user_id',
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    params: {
        field: 'params',
        type: sequelize_1.Sequelize.TEXT,
    },
    created_at: {
        field: 'created_at',
        type: sequelize_1.Sequelize.STRING
    },
    update_at: {
        field: 'update_at',
        type: sequelize_1.Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
});
exports.default = SubscribeModel;
