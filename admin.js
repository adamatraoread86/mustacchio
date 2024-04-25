module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn || !req.session.user ||!req.session.user.admin){
        return res.redirect("/unauthorized")
    }
    next();
}