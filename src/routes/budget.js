const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const budgetControllers = require("../controllers/budget-controllers");

//Multer
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

//Usuario carga y envía solicitud de presupuesto
router.get("/request", budgetControllers.request);
router.post("/request", upload.array("imgReferencia", 5), budgetControllers.storeBudgRequest);

//Profesional carga y envía presupuesto del trabajo que pidió el usuario
router.get("/response/:reqId", budgetControllers.response,budgetControllers.storeBudgResponse);
router.post("/response", budgetControllers.storeBudgResponse);

//Profesional edita el formulario enviado


module.exports = router;
