const db = require("../../database/models");

module.exports = {
    users: async (req, res) => {
        const usersList = await db.User.findAll({
            attributes: ["id", "name", "lastName", "email"],
        });
        usersList.map((url)=> url.dataValues.detail = `http://localhost:3000/user/detail/${url.id}`)
        res.status(200).json({
            count: usersList.length,
            users: usersList,
            status: 200
        })
    },
    userDetail: async (req, res) => {
        const userId = await db.User.findByPk(req.params.id, {
            attributes: { exclude: ["password", "isProf"]},
        })
        userId.dataValues.avatarUrl = `http://localhost:3000/images/avatar/${userId.dataValues.avatar}`
        res.status(200).json(userId)
    },   
}