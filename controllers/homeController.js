
//Display the home page
exports.getHome = (req, res, next) => {
  res.render("index", { pageTitle: "Home", path: req.path });
};

//Display the about page
exports.getAbout = (req, res, next) => {
  res.render("about", { pageTitle: "About", path: req.path });
};
