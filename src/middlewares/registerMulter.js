const path = require("path");
const multer = require("multer");

const storage= multer.diskStorage({
    destination: (req,file,cb) =>{
      if (file.fieldname == "avatar"){
        cb(null,path.join(__dirname,"../../public/images/avatar"));
      } else {
        cb(null, path.join(__dirname, "../../public/images/finished-jobs-images"));
      }
    },
    filename: (req,file,cb) => {
      const newFileName= "user-" + Date.now() + path.extname(file.originalname);
      cb(null,newFileName);
    }
  });

  module.exports= storage;