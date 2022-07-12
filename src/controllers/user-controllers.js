
module.exports = {
  userDetail: (req, res) => {    
    res.render("userDetail",{
        user: req.session.userLogged,       
    });
  },
  profDetail: (req, res) => {    
    res.render("profDetail",{
        user: req.session.userLogged,
    });
  },
  profileUser: (req, res) => {    
    res.render("profileUser");
  },
  editUserProfile: (req,res) => {    
  },
  profileProf: (req, res) => {
    res.render("profileProfessional");
  },
  editProfProfile: (req,res) => {    
},
}