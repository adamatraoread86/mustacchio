const axios = require("axios");

const BLTURL = `${process.env.BLTURL}`;
const BLTKey = `${process.env.BLTKey}`;

const bltAxios = axios.create({
    baseURL: BLTURL,
    headers: {
       "Authorization": BLTKey
    }
});


exports.getPlayers = async (req, res, next) => {
    try {
        const response = await bltAxios.get("/players");
        res.locals.data = {};
        res.locals.data.players = response.data.data
       console.log("response is: ", response.data);   
        next(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch player data" });
    }
};

exports.renderPlayers = (req, res, next) => {
    const { players } = res.locals.data;
    if(!players){
        res.status(500).send("players are undefined")
    }
    console.log(players)
    res.render("external-api", { pageTitle: "Basketball Players", path: "/players", players: players });
};
 exports.getTeams = async (req, res, next) =>{
    const response = await bltAxios.get("/teams");
    res.status(200).json(response.data)
 }

 exports.getGames = async (req, res, next) =>{
    const response = await bltAxios.get("/games");
    res.status(200).json(response.data)
 }

 exports.getStats = async (req, res, next) =>{
    const response = await bltAxios.get("/stats");
    res.status(200).json(response.data)
 }


