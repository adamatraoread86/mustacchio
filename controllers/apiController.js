const MustacheStyle = require("../models/MustacheStyle");
const jwt = require("jsonwebtoken");

exports.getStyles = async (req, res, next) => {

        try {
            const styles = await MustacheStyle.find().populate("title");
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

exports.getToken = (req, res, next) => {
      const token = jwt.sign(
        {},
        process.env.token_secret,
        { expiresIn: "24h" }
      );
      return res
        .status(200)
        .json({ message: "Token Generated!!!", token: token});    
}

exports.verifyToken = (req, res, next) => {

    const token = req.query.token;
    let decodedToken
    try {      
      decodedToken = jwt.verify(token, process.env.token_secret);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error"});
    }   

    if (!decodedToken) {
      return res.status(401).json({ message: "A valid token is required"});
    }

    next()
}