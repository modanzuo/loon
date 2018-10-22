"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const CommentModel = sequelize_1.sequelize.define('comment', {
    id: {
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    content: {
        type: sequelize_1.Sequelize.TEXT
    },
    ip: {
        type: sequelize_1.Sequelize.STRING
    },
    ua: {
        type: sequelize_1.Sequelize.STRING
    },
    state: {
        type: sequelize_1.Sequelize.INTEGER(1),
    },
    created: {
        type: sequelize_1.Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = CommentModel;
