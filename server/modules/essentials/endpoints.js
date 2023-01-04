const config = require("../../config/config.json");
const app = require("./server_start").app;
const mysql = require("./mysql");
var db =  new mysql();
const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")

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
    app.use(cookieParser())

    app.post("/api", (req, res) => {
        console.log(req.body)
        res.json("test")
    });
    app.post("/api/auth/session", (req, res) =>{
        res.json({session: session.logged})
    })
    app.post("/api/auth/login", (req, res) => {
        db.verifyUser(req.body, (data)=>{
            if(!data){
                session.logged = false;
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
                    session.user_id = data.user_id;
                    res.cookie('user_id', data.user_id)
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
    app.post("/api/auth/logout", (req, res) =>{
        session.logged = false;
        res.cookie('user_id', null)
        res.json('wylogowno')
    })

    app.post("/api/user/info", (req, res) =>{
        if(!session.logged){
            return
        }
        db.userInfo({user_id:session.user_id},(data) =>{
            console.log(data)
            data.map(x => data = x)
            res.json(data)
        })
    })

    app.post("/api/auth/changePassword", (req, res) =>{
        if(!session.logged){
            return
        }

        db.getPass({user_id:session.user_id},(data) =>{
            
            data.map(x => data = x)
            
            session.continue = true
            
            console.log(req.body.old_pass,data.password,'test')
            bcrypt.compare(req.body.old_pass, data.password, function(err, result) {
                console.log(req.body.old_pass,data.password,result,'test2')
                if (!result) {
                    
                    console.log(req.body.old_pass)
                    res.json({
                        type: "error",
                        message: "Podano niepoprawne aktualne hasło!",
                        data: {}
                        
                    })
                    session.continue = false
                } 
                
                });
        })

        if(session.continue == false) return;
        
        bcrypt.hash(req.body.new_pass, 10, function(err, hash) {
            console.log('test3')
            session.hashPass = hash;
            
            });
        db.changePass({user_id:session.user_id,password:session.hashPass},(data) =>{
            console.log(data)
            console.log('test4')
            // res.json(data)
        })

        
    })

}

module.exports = {endpoints};