
//Display an unauthorize page to users who do not have access to a given page
exports.getUnauthorized = (req, res, next) => {
    res.render("unauthorized", {
      pageTitle: "unauthorized",
      path: "/unauthorized"
    })
  }