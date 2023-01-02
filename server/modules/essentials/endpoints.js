const config = require("../../config/config.json");
const app = require("./server_start").app;


function endpoints(){

    app.post("/api", (req, res) => {
        console.log(req.body)
        res.json("test")
    });
  
}

module.exports = {endpoints};