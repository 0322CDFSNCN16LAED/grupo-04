function userLoggedMiddleware (req,res,next) {
    res.locals.isLogged = req.session && req.session.userLogged;
    res.locals.userLogged = (req.session && req.session.userLogged) ? req.session.userLogged : undefined,
    next();
}

module.exports = userLoggedMiddleware;