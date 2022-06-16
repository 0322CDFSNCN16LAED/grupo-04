const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const registerControllers = require("../controllers/register-controllers");

const storage= multer.diskStorage({
  destination: (req,file,cb) =>{
    if (file.fieldname == "profile-img"){
      cb(null,path.join(__dirname,"../../public/images/profile-images"));
    } else {
      cb(null, path.join(__dirname, "../../public/images/finished-jobs-images"));
    }
  },
  filename: (req,file,cb) => {
    const newFileName= "user-" + Date.now() + path.extname(file.originalname);
    cb(null,newFileName);
  }
});

const upload = multer({storage})

router.get("/", registerControllers.register);

//*create and store user*//
router.get("/user", registerControllers.createUser);
router.post("/user", upload.single("profile-img"),registerControllers.storeUser);

//* create and store prof *//
router.get("/prof", registerControllers.createProf);
router.post("/prof",
  upload.fields([
    { name: "profile-img", maxCount: 1 },
    { name: "finished-jobs", maxCount: 5 }
  ]),
  registerControllers.storeProf);

module.exports = router;
