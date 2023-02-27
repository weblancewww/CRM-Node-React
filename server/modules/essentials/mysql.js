const res = require('express/lib/response');
var mysql = require('mysql2');
const config = require("../../config/config.json").DATABASE

module.exports = class MySQL {
  host = config.HOST;
  user = config.USER;
  password = config.PASSWORD;
  database = config.DATABASE;


  constructor(deleting, hashkey) {
    this.con = mysql.createPool({
       connectionLimit : 5,
       host: this.host,
       user: this.user,
       password: this.password,
       database: this.database
     });
     this.con.getConnection((err,connection)=> {
       if(err)
       throw err;
       console.log('Database connected successfully');
       connection.release();
     });
     this.defaultDatabases();
   }

   
   defaultDatabases(){
    this.con.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id int NOT NULL AUTO_INCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        positions TEXT NOT NULL,
        photo TEXT DEFAULT NULL,
        PRIMARY KEY (user_id)
    );`, 
    function (err, result) {
      if (err) throw err;
    });
   }

   verifyUser(data, callback){
    this.con.query("SELECT user_id, email, password FROM users WHERE email='" + data.email +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
  
  userInfo(data, callback){
    this.con.query("SELECT user_id, email, first_name, last_name, positions, photo FROM users WHERE user_id='" + data.user_id +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  getPass(data, callback){
    this.con.query("SELECT password FROM users WHERE user_id='" + data.user_id +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  changePass(data, callback){
    this.con.query("UPDATE users SET password = '" + data.password + "' WHERE user_id='" + data.user_id +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  showAllWorkers(pg,limit,callback) {
    console.log(`SELECT * FROM users LIMIT ${limit} OFFSET ${parseInt(pg - 1)*parseInt(limit)};`)
    this.con.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${parseInt(pg - 1)*parseInt(limit)};`,
     function (err, result) {
      if (err) throw err;
      return callback(result)
    });
  }
  
  workersDelete(id,callback) {
    this.con.query("DELETE FROM users WHERE user_id='" + id +"';",
     function (err, result) {
      if (err) throw err;
      return callback(result)
    });
  }

  workersAdd(data,callback) {
    this.con.query("INSERT INTO users (first_name, last_name, email, password, positions) VALUES ('" + data.first_name + "', '" + data.last_name + "', '"+ data.email + "', '"+ data.password + "', '"+ data.positions + "');",
     function (err, result) {
      if (err) throw err;
      return callback(result)
    });
  }
  checkMail(email,callback) {
    this.con.query("SELECT email FROM users WHERE email='"+email+"';",
     function (err, result) {
      if (err) throw err;
      return callback(result)
    });
  }

}