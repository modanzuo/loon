import {sequelize, Sequelize} from '../sequelize'
const CommentModel = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // field: 'first_name'
    },
    name: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    ip: {
        type: Sequelize.STRING
    },
    ua: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.INTEGER(1),
    },
    created: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: false,
    updatedAt: false
});


export default CommentModel;