const axios = require("axios");

const BLTURL = `${process.env.BLTURL}`;
const BLTKey = `${process.env.BLTKEY}`;


//Axios instance to be used across multiple requests
const bltAxios = axios.create({
    baseURL: BLTURL,
    headers: {
       "Authorization": BLTKey
    }
});

//Retrieve an api for all players from the balldontlie api
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

//Render a view of all players retrieve from the balldontlie api
exports.renderPlayers = (req, res, next) => {
    const { players } = res.locals.data;
    if(!players){
        res.status(500).send("players are undefined")
    }
    console.log(players)
    res.render("external-api", { pageTitle: "Basketball Players", path: "/players", players: players });
};

//Retrieve the list of teams from the balldontlie api
 exports.getTeams = async (req, res, next) =>{
    const response = await bltAxios.get("/teams");
    res.status(200).json(response.data)
 }

 //Retrieve the list of games from the balldontlie api
 exports.getGames = async (req, res, next) =>{
    const response = await bltAxios.get("/games");
    res.status(200).json(response.data)
 }

 //Retrieve stats of games from the balldontlie api
 exports.getStats = async (req, res, next) =>{
    const response = await bltAxios.get("/stats");
    res.status(200).json(response.data)
 }


