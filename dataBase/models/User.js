const {modelNameEnum:{USER}} = require('../../constants');

module.exports = (sequelize, DataTypes) => sequelize.define(USER, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    telegramId:{
        type: DataTypes.INTEGER,
    },
    city: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false
});
