const config = require("../../config/config.json");
const app = require("./server_start").app;
const mysql = require("./mysql");
var db =  new mysql();
const bcrypt = require("bcrypt")
const session = require("express-session")

/*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("admin", salt, function(err, hash) {
        console.log(hash)
    });
    })
    bcrypt.compare("hasłlo", "$2b$10$p8WTsANFEdrrHvyxKebd9u22A/Yz5Uo9POgN0Pw2TEIgQcfCFzL1C", function(err, result) {
        if (result) {
            //porownanie
        }
        });*/
function endpoints(){
    const login_page = "/auth/sign-in";
    const login_page_endpoint = "/api/auth/login";
    /*app.use((req, res, next) => {
        console.log(session.logged)
        if(session.logged){
            console.log(1)
            if(req.url == login_page){
                res.redirect("/");
            }
        } else {
            if(req.url != login_page && req.url != login_page_endpoint) {
                console.log(3)
            res.redirect(login_page);
            } else {
                next();
            }
        }
        
      })*/

    app.post("/api", (req, res) => {
        console.log(req.body)
        res.json("test")
    });

    app.post("/api/auth/login", (req, res) => {
        db.verifyUser(req.body, (data)=>{
            if(!data){
                res.json({
                    type: "error",
                    message: "Nieprawidłowy login lub hasło!",
                    data: {}
                })
                return;
            }
            data.map(x => data = x)
            bcrypt.compare(req.body.password, data.password, function(err, result) {
                if (result) {
                    session.logged = true;
                    res.json({
                        type: "success",
                        message: "Pomyślnie zalogowano!",
                        data: {}
                    })
                } else {
                    session.logged = false;
                    res.json({
                        type: "error",
                        message: "Nieprawidłowy login lub hasło!",
                        data: {}
                    })
                }
                });
        })
    });
  
}

module.exports = {endpoints};