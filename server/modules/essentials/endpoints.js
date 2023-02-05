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

        const getPass = function (db){
            return new Promise((resolve, reject) =>{
                db.getPass({user_id:session.user_id}, function(data){
                    resolve(data)
                })
            })
        }


const checkMail = (db, email) => {
    return new Promise((resolve, reject) =>{
        db.checkMail(email, function(data){
            resolve(data)
        })
    })
}
const hashPass = function (pass){
    return new Promise((resolve, reject) =>{
        bcrypt.hash(pass, 10, function(err, hash) {
            resolve(hash)
            });
    })
}
const workersAdd = function (values,db){
    return new Promise((resolve, reject) =>{
        db.workersAdd(values,function(data){
            resolve(data)
        })
    })
}
const changePass = function (db){
    return new Promise((resolve, reject) =>{
        db.changePass({user_id:session.user_id,password:session.hashPass},(data) =>{
            resolve(data)
        })
    })
}
function endpoints(){
    app.use(cookieParser())

    app.post("/api", (req, res) => {
        console.log(req.body)
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
            data.map(x => data = x)
            res.json(data)
        })
    })
    
    app.post("/api/auth/changePassword", async (req, res) =>{
        if(!session.logged){
            return
        }
        var data = await getPass(db);
        data.map(x => data = x)
            
        session.continue = true

        bcrypt.compare(req.body.old_pass, data.password, function(err, result) {
            if (!result) {
                res.json({
                    type: "error",
                    message: "Podano niepoprawne aktualne hasło!",
                    data: {}
                        
                })
                session.continue = false
            } 
        });

        if(session.continue == false) return;
        
        session.hashPass = await hashPass(req.body.new_pass)
        
        const cp = await changePass(db)
        if(cp.affectedRows == 1){
            return res.json({
                type: "success",
                message: "Pomyślnie zmieniono hasło!",
                data: {}
            })
        } else {
            return res.json({
                type: "error",
                message: "Błąd dodawania do bazy danych!",
                data: {}
            })
        }

    })

    app.post("/api/WorkersList", (req, res) => {


        db.showAllWorkers(function(data){
           res.json(data)
        })
       });

       app.post("/api/WorkersList/delete", (req, res) => {

        if(req.body.user_id == session.user_id){
            res.json({
                type: "error",
                message: "Nie można usunąć samego siebie!",
                data: {}
                
            })
            return
        }

        db.workersDelete(req.body.user_id,function(data){
            res.json({
                type: "error",
                message: "Pomyślnie usunięto użytkownika!",
                data: {}
                
            })
        })
       });

       app.post("/api/WorkersList/add", async (req, res) => {
        const existingEmail = await checkMail(db, req.body.email)
        if(existingEmail.length){
            return res.json({
                type: "error",
                message: "Podany email już istnieje!",
                data: {}
                
            })
        }
        req.body.password = await hashPass(req.body.password)

        const  wA = await workersAdd(req.body, db)
        if(wA.affectedRows == 1){
            return res.json({
                type: "success",
                message: "Pomyślnie dodano użytkownika!",
                data: {}
            })
        } else {
            return res.json({
                type: "error",
                message: "Błąd dodawania do bazy danych!",
                data: {}
            })
        }
       });

}

module.exports = {endpoints};