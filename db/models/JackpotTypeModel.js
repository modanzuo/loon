"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const JackpotTypeModel = sequelize_1.sequelize.define('jackpot_type', {
    type: {
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = JackpotTypeModel;
