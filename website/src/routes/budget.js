const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const budgetControllers = require("../controllers/budget-controllers");

const storage = multer.diskStorage({
    //Configura qué carpeta del servidor va a almacenar las imagenes del presupuesto
    destination: function(req,file,cb){
        const folder = path.join(__dirname,"../../public/images/budgetRequest")
        cb(null,folder);
    },
    //Configura el nombre de los archivos que se guardan
    filename: function(req,file,cb){
        const imgName= "imgref-" + Date.now() + path.extname(file.originalname);
        cb(null,imgName);
    }
})
const upload = multer({storage});

const budgetMiddlewares = require("../middlewares/budgetValidations");
const budgetReqValidations = budgetMiddlewares.budgReqValidations;
const budgetResValidations = budgetMiddlewares.budgResValidations;

//Usuario carga y envía solicitud de presupuesto
router.get("/request", budgetControllers.request);
router.post("/request", upload.array("imgReferencia", 5),budgetReqValidations, budgetControllers.storeBudgRequest);

//Profesional carga y envía presupuesto del trabajo que pidió el usuario
router.get("/response/:reqId", budgetControllers.response);
router.post("/response/:reqId",budgetResValidations,budgetControllers.storeBudgResponse)

//Usuario visualiza la solicitud enviada y el presupuesto recibido
router.get("/detail/:resId", budgetControllers.viewDetail);

module.exports = router;
    