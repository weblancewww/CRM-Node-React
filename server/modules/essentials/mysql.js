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
     //this.defaultDatabases();
   }

   verifyUser(data, callback){
    this.con.query("SELECT user_id, email, password FROM users WHERE email='" + data.email +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
}