"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const UserModel = sequelize_1.sequelize.define('user', {
    user_id: {
        field: 'user_id',
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    openid: {
        field: 'openid',
        type: sequelize_1.Sequelize.STRING
    },
    nickname: {
        field: 'nickname',
        type: sequelize_1.Sequelize.STRING
    },
    headimg: {
        field: 'headimg',
        type: sequelize_1.Sequelize.STRING
    },
    params: {
        field: 'params',
        type: sequelize_1.Sequelize.TEXT,
    },
    created_at: {
        field: 'created_at',
        type: sequelize_1.Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
});
exports.default = UserModel;
