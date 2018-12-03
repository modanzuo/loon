"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../sequelize");
const OpenJackpotModel = sequelize_1.sequelize.define('open_jackpot', {
    id: {
        field: 'id',
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
    },
    open_number: {
        field: 'open_number',
        type: sequelize_1.Sequelize.STRING
    },
    open_created: {
        field: 'open_created',
        type: sequelize_1.Sequelize.STRING
    },
    open_type: {
        field: 'open_type',
        type: sequelize_1.Sequelize.STRING
    },
    open_term: {
        field: 'open_term',
        type: sequelize_1.Sequelize.STRING
    },
    open_params: {
        field: 'open_params',
        type: sequelize_1.Sequelize.TEXT,
    },
    created: {
        type: sequelize_1.Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    underscored: true
});
OpenJackpotModel.prototype.findTransaction = function (...options) {
    return sequelize_1.sequelize.transaction(function (t) {
        // 注意，这时使用的是callback而不是promise.then()
        return OpenJackpotModel.find(...options, { transaction: t }).then(function (user) {
            return OpenJackpotModel.updateAttributes(...options, { transaction: t });
        });
    }).then(function () {
        return true;
    }).catch(function (err) {
        // Rolled back
        console.error(err);
    });
};
exports.default = OpenJackpotModel;
