import {sequelize, Sequelize} from '../sequelize'

const OpenJackpotModel = sequelize.define('open_jackpot', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    open_number: {
        field: 'open_number',
        type: Sequelize.STRING
    },
    open_created: {
        field: 'open_created',
        type: Sequelize.STRING
    },
    open_type: {
        field: 'open_type',
        type: Sequelize.STRING
    },
    open_term: {
        field: 'open_term',
        type: Sequelize.STRING
    },
    open_params: {
        field: 'open_params',
        type: Sequelize.TEXT,
    },
    created: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: false,
    updatedAt: false,
    underscored:true
});

OpenJackpotModel.prototype.findTransaction=function (...options) {
    return sequelize.transaction(function (t) {
        // 注意，这时使用的是callback而不是promise.then()
        return OpenJackpotModel.find(...options, { transaction: t}).then(function (user) {
            return OpenJackpotModel.updateAttributes(...options, { transaction: t});
        });
    }).then(function () {
       return true
    }).catch(function (err) {
        // Rolled back
        console.error(err);
    });
}


export default OpenJackpotModel;