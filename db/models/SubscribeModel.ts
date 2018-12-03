import {sequelize, Sequelize} from '../sequelize'

const SubscribeModel = sequelize.define('subscribe', {
    id:{
        field: 'user_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    user_id: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    params: {
        field: 'params',
        type: Sequelize.TEXT,
    },
    created_at: {
        field:'created_at',
        type: Sequelize.STRING
    },
    update_at: {
        field:'update_at',
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: false,
    updatedAt: false,
    underscored:true
});


export default SubscribeModel;