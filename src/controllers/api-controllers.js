const db = require("../database/models");

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
    budgets: async (req, res) => {
        const countAlbanil = await db.budgReq.count({
            where: { rubroNombre : "Albañil" }
        });
        const countElectricista = await db.budgReq.count({
            where: { rubroNombre : "Electricista" }
        });
        const countGasista = await db.budgReq.count({
            where: { rubroNombre : "Gasista" }
        });
        const countPintor = await db.budgReq.count({
            where: { rubroNombre : "Pintor" }
        });
        const countPlomero = await db.budgReq.count({
            where: { rubroNombre : "Plomero" }
        });
        const budgReqList = await db.budgReq.findAll({
            attributes: ["id", "tituloSolicitud", "detalleSolicitud" ,"userId"],
            include: [
                {
                    association: "req_imgs",
                    attributes: ["img"]
                }, "rubros", {
                    association: "budget_response",
                    attributes: ["id", "precioFinal", "userId"]
                }
            ]
        });
        budgReqList.map((url)=> url.dataValues.detail = `http://localhost:3000/budget/detail/${url.id}`)
        res.status(200).json({
            count: budgReqList.length,
            countByCategory: {
                "Albañil": countAlbanil,
                "Electricista": countElectricista,
                "Gasista": countGasista,
                "Pintor": countPintor,
                "Plomero": countPlomero
            },
            budgets: budgReqList,
            status: 200
        })
    },
    budgetDetail: async (req, res) => {
        const budgetId = await db.budgReq.findByPk(req.params.id, {
            attributes: ["id", "tituloSolicitud", "detalleSolicitud" ,"userId"],
            include: [
                {
                    association: "req_imgs",
                    attributes: ["img"]
                }, "rubros", {
                    association: "budget_response",
                    attributes: ["id", "precioFinal", "userId"]
                }
            ]
        })
        budgetId.dataValues.imgUrl = `http://localhost:3000/images/budgetRequest/${budgetId.dataValues.req_imgs[0].img}`
        res.status(200).json(budgetId)
    }
}