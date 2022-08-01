const db = require("../models/prof.js");

function guestMiddleware (req,res,next) {
    if(req.session.userLogged){        
       if(req.session.userLogged.isProf){
        return res.redirect("/user/prof/detail")
      }else{
        return res.redirect("/user/detail")
      }
    } 
    next()
    
}
module.exports = guestMiddleware;