const db = require("../../database/models");
module.exports = {
  budgets: async (req, res) => {
    const countAlbanil = await db.budgReq.count({
      where: { rubroNombre: "Albañil" },
    });
    const countElectricista = await db.budgReq.count({
      where: { rubroNombre: "Electricista" },
    });
    const countGasista = await db.budgReq.count({
      where: { rubroNombre: "Gasista" },
    });
    const countPintor = await db.budgReq.count({
      where: { rubroNombre: "Pintor" },
    });
    const countPlomero = await db.budgReq.count({
      where: { rubroNombre: "Plomero" },
    });
    const budgReqList = await db.budgReq.findAll({
      attributes: ["id", "tituloSolicitud", "detalleSolicitud", "userId"],
      include: [
        {
          association: "req_imgs",
          attributes: ["img"],
        },
        "rubros",
        {
          association: "budget_response",
          attributes: ["id", "precioFinal", "userId"],
        },
      ],
    });
    budgReqList.map(
      (url) =>
        (url.dataValues.detail = `http://localhost:3001/budget/detail/${url.id}`)
    );
    res.status(200).json({
      count: budgReqList.length,
      countByCategory: {
        Albañil: countAlbanil,
        Electricista: countElectricista,
        Gasista: countGasista,
        Pintor: countPintor,
        Plomero: countPlomero,
      },
      budgets: budgReqList,
      status: 200,
    });
  },
  rubros: async (req,res) => {
    const rubros = await db.Rubro.findAll()
    const count= rubros.length
    // console.log(rubrosCount);
    res.status(200).json({
      count
    })

  },
  budgetDetail: async (req, res) => {
    const budgetId = await db.budgReq.findByPk(req.params.id, {
      attributes: ["id", "tituloSolicitud", "detalleSolicitud", "userId"],
      include: [
        {
          association: "req_imgs",
          attributes: ["img"],
        },
        "rubros",
        {
          association: "budget_response",
          attributes: ["id", "precioFinal", "userId"],
        },
      ],
    });
    budgetId.dataValues.imgUrl = `http://localhost:3001/images/budgetRequest/${budgetId.dataValues.req_imgs[0].img}`;
    res.status(200).json(budgetId);
  },
};
