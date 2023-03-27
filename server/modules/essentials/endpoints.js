const config = require("../../config/config.json");
const app = require("./server_start").app;
const io = require("./server_start").io;
const mysql = require("./mysql");
var db =  new mysql();
const bcrypt = require("bcrypt")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const http = require('http');
const rand = require("random-key")
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'assets/uimgs/' });
const path = require("path")


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
        const getPassSingle = function (db,id){
            return new Promise((resolve, reject) =>{
                db.getPass({user_id:id}, function(data){
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

const changePassSingle = function (db,id,pass){
    return new Promise((resolve, reject) =>{
        db.changePass({user_id:id,password:pass},(data) =>{
            resolve(data)
        })
    })
}

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}
var someData = {
    alerts: [
        {
            message: "Uwazaj, drabina!",
            role: 10,
            type: "success",
            text: "O tam na dol"
        }
    ]
}

var updateData = {
    alerts: [
        {
            message: "Helo, World",
            role: 10,
            type: "success",
            text: "O tam na dol"
        }
    ]
}

function endpoints(){

    io.on('connection', (socket) => {
        console.log('New client connected');
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        const formattedDate = now.toISOString().slice(0, 16);
        // Handle socket events
        socket.on('update_notify', (msg) => {
          console.log('message: ' + msg);
          db.custom(`SELECT * FROM notify WHERE notify_date_from <= '${formattedDate}' AND notify_date_to >= '${formattedDate}'`,function(result){
            io.emit('alerts', result);
         })
        });

        db.custom(`SELECT * FROM notify WHERE notify_date_from <= '${formattedDate}' AND notify_date_to >= '${formattedDate}'`,function(result){
            console.log(result)
            io.emit('alerts', result);
         })
        
      
        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });


    app.use(cookieParser())

    app.post("/api", (req, res) => {
        console.log(req.body)
    });

    app.post("/api/auth/session", (req, res) =>{
        if(session[parseCookies(req)["user_"+config.login_key_secret+"_loggin"]]){
            db.custom(`SELECT * FROM users LEFT JOIN roles ON roles.roles_id = users.positions WHERE user_id = ${session[parseCookies(req)["user_"+config.login_key_secret+"_loggin"]].user_id}`, function(perms){
                res.json({session: true,user:{perms: perms[0].roles_value, user_name: perms[0].first_name,photo: perms[0].photo}})
            })
            
            
        } else {
            res.json({session: false})
        }
    })
    


    const login_page = "/login";
    const login_page_endpoint = "/login/access";

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


            var keyDefined = rand.generate(25);
            res.cookie('user_'+config.login_key_secret+'_loggin', keyDefined)
            res.cookie('login_key', config.login_key_secret)
            session[keyDefined] = {
                user_name: data.email,
                user_perm: data.positions,
                user_id: data.user_id
            }
            // db.custom("UPDATE users SET users_last_login = CURRENT_TIMESTAMP WHERE users_id = "+data[0].users_id, function(){});
            // res.cookie('user_id', data[0].users_id)
                    
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


    app.post("/data/images/:filename", (req, res) =>{
        const fileName = req.params.filename;
        const imagePath = path.join(__dirname, '..','..', 'uploads', 'images', fileName);
        console.log(imagePath)
        res.sendFile(imagePath, (err) => {
            if (err) {
            res.json({})
            }
        });
    })



    app.post('/api/data/users/avatar_new', upload.single('avatar'), (req, res) => {
        const file = req.file; // file passed from client
        r = (Math.random() + 1).toString(36).substring(2);
        fs.rename(file.path, path.join(__dirname, '..','..', 'uploads', 'images', r+"_"+file.originalname), function (err) {
            db.update({photo:r+"_"+file.originalname},"users","user_id",req.body.user_id, ()=>{})
            if (err) throw err;
            res.sendFile(path.join(__dirname, '..','..', 'uploads', 'images', r+"_"+file.originalname), (err) => {
                if (err) {
                  res.json({})
                }
            });
        });
      });
    app.post("/api/auth/logout", (req, res) =>{
        delete session[parseCookies(req)["user_"+config.login_key_secret+"_loggin"]];
        res.cookie('user_id', null)
        res.json('wylogowno')
    })

    app.post("/api/user/info", (req, res) =>{
        console.log(req.body.keydef)
        db.userInfo({user_id:session[req.body.keydef].user_id},(data) =>{
            data.map(x => data = x)
            res.json(data)
        })
    })


    app.post("/api/user/info/roles", (req, res) =>{
        db.custom("SELECT * FROM roles", function(data){
            res.json(data)
        })
    })
    app.post("/api/user/info/single", (req, res) =>{
        db.userInfo({user_id:session[req.body.keydef].user_id},(data) =>{
            data.map(x => data = x)
            res.json(data)
        })
    })
    app.post("/api/user/info/single/id", (req, res) =>{
        db.userInfo({user_id:req.body.id},(data) =>{
            data.map(x => data = x)
            res.json(data)
        })
    })
    app.post("/api/notify/get/single", (req, res) =>{
        db.custom(`SELECT * FROM notify WHERE notify_id = '${req.body.id}'`, function(data){
            res.json(data)
        })
    })
    app.post("/api/data/update/notify", (req, res) =>{
        db.update(req.body.data,"notify","notify_id",req.body.id,function(data){
            res.json(data)
        })
    })
    app.post("/api/data/delete/notify", (req, res) =>{
        db.custom(`DELETE FROM notify WHERE notify_id = ${req.body.id}`,function(data){
            res.json(data)
        })
    })
    app.post("/api/data/save/notify", (req, res) =>{
        db.insert(req.body.data,"notify", function(data){
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


    app.post("/api/auth/changePasswordSingle", async (req, res) =>{
        if(!session.logged){
            return
        }
        var data = await getPassSingle(db,req.body.id);
        data.map(x => data = x)

        bcrypt.compare(req.body.old_pass, data.password, async function(err, result) {
            if (!result) {
                res.json({
                    type: "error",
                    message: "Podano niepoprawne aktualne hasło!",
                    data: {}
                        
                })
            } else {
                var hashss = await hashPass(req.body.new_pass)
                cp = await changePassSingle(db,req.body.id, hashss)
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
            }
        });    
    })

    app.post("/api/WorkersList/Solo", (req, res) => {


        db.showAllWorkers(req.body.page,req.body.limit,function(data){
           res.json(data)
        })
       });
    app.post("/api/data/update/user", (req, res) => {
        db.update(req.body.data,"users","user_id",req.body.id,function(data){
            res.json(data)
        })
    });

    app.post("/api/WorkersList", (req, res) => {


        db.showAllWorkers(req.body.page,req.body.limit,function(data){
           res.json(data)
        })
       });

       app.post("/api/notifyList", (req, res) => {
        db.custom(`SELECT * FROM notify LIMIT ${req.body.limit} OFFSET ${parseInt(req.body.page - 1)*parseInt(req.body.limit)}`,function(result){
           db.custom(`SELECT COUNT(*)/${req.body.limit} as pages FROM notify`,function(pages){
            res.json({data: result,pages:Math.ceil(pages[0].pages)})
         })
        })
       });

       

       app.post("/api/WorkersList/delete", (req, res) => {
        db.workersDelete(req.body.id,function(data){ 
            res.json({
                type: "error",
                message: "Pomyślnie usunięto użytkownika!",
                data: {}
                
            })
        })
       });

       app.post("/api/WorkersList/add", async (req, res) => {
        console.log(req.body)
        const existingEmail = await checkMail(db, req.body.data.email)
        if(existingEmail.length){
            return res.json({
                type: "error",
                message: "Podany email już istnieje!",
                data: {}
                
            })
        }
        req.body.data.password = await hashPass(req.body.data.password)

        const  wA = await workersAdd(req.body.data, db)
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