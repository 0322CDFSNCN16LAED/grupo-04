const db = require("../models/Users.js");

function guestMiddleware (req,res,next) {
    if(req.session.userLogged){        
       if(db.getOneProfByField("email", req.session.userLogged.email)){
        return res.redirect("/user/prof/detail")
      }else{
        return res.redirect("/user/detail")
      }
    } 
    next()
    
}
module.exports = guestMiddleware;