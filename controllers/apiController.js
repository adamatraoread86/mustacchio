const MustacheStyle = require("../models/MustacheStyle");
const jwt = require("jsonwebtoken");

exports.getStyles = async (req, res, next) => {

        try {
          //Find all styles in  mongoDB database and populate the values
            const styles = await MustacheStyle.find().populate("title");
          //Array method that will return a new array based on this new set up
            const stylesWithImageUrls = styles.map(style => ({
                id: style._id,
                title: style.title,
                description: style.description,
                imageUrl: `${process.env.IMAGE_URL_DOMAIN}${style.imageURL}`
            }))
            console.log("styles are: ", stylesWithImageUrls)
            if(!stylesWithImageUrls) {
                return res.status(500).json({
                     message: "No styles found!",
                     stylesWithImageUrls: null
                 });
             }
            res.status(200).json({ 
                message: "SUCCESS!",
                stylesWithImageUrls: stylesWithImageUrls})
        } catch(err) {
            console.log(err)
        };
}

//Create a token that includes a secret, the token will expire in 24 hours
exports.getToken = (req, res, next) => {
      const token = jwt.sign(
        {},
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      return res
        .status(200)
        .json({ message: "Token Generated!!!", token: token});    
}

//Verify that the user has a valid token before they could retrieve the api
exports.verifyToken = (req, res, next) => {

    const token = req.query.token;
    let decodedToken
    try {      
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error"});
    }   

    if (!decodedToken) {
      return res.status(401).json({ message: "A valid token is required"});
    }

    next()
}