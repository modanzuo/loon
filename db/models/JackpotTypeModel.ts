import {sequelize, Sequelize} from '../sequelize'
const JackpotTypeModel = sequelize.define('jackpot_type', {
    type: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: false,
    updatedAt: false
});


export default JackpotTypeModel;