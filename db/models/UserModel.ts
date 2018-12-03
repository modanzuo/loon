import {sequelize, Sequelize} from '../sequelize'

const UserModel = sequelize.define('user', {
    user_id: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    openid: {
        field: 'openid',
        type: Sequelize.STRING
    },
    nickname: {
        field: 'nickname',
        type: Sequelize.STRING
    },
    headimg: {
        field: 'headimg',
        type: Sequelize.STRING
    },
    params: {
        field: 'params',
        type: Sequelize.TEXT,
    },
    created_at: {
        field:'created_at',
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: false,
    updatedAt: false,
    underscored:true
});


export default UserModel;