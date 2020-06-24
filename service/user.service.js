const db = require('../dataBase').getInstance();
const {modelNameEnum: {USER}} = require('../constants');

module.exports = {
    create: (telegramId, name, city) => {
        const UserModel = db.getModels(USER);
        return UserModel.create({telegramId, name, city});
    },
    getOne: (telegramId) => {
        const UserModel = db.getModels(USER);
        return UserModel.findOne({where: {telegramId}});
    },
    update: (user, telegramId) => {
        const UserModel = db.getModels(USER);
        return UserModel.update(user, {where: {telegramId}})
    },
    getAll: () => {
        const UserModel = db.getModels(USER);
        return UserModel.findAll({
            where: {
                city: {
                    [Op.ne]: null
                }
            }
        });
    },
    getByParams: (params) => {
        const UserModel = db.getModels(USER);
        return UserModel.findOne({where: params});
    }

};

//TODO: nest: true, raw: true
