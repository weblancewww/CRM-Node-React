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
        is_b2b INT(10) NOT NULL,
        b2b_company TEXT NOT NULL,
        phone TEXT NOT NULL,
        phone_private TEXT NOT NULL,
        email_private TEXT NOT NULL,
        buss_state TEXT NOT NULL,
        buss_country TEXT NOT NULL,
        positions TEXT NOT NULL,
        photo TEXT DEFAULT NULL,
        PRIMARY KEY (user_id)
    );`, 
    function (err, result) {
      if (err) throw err;
    });
    this.con.query(`
      CREATE TABLE IF NOT EXISTS roles (
        roles_id int NOT NULL AUTO_INCREMENT,
        roles_name TEXT NOT NULL,
        roles_value TEXT NOT NULL,
        PRIMARY KEY (roles_id)
    );`, 
    function (err, result) {
      if (err) throw err;
    });
    this.con.query(`
      CREATE TABLE IF NOT EXISTS notify (
        notify_id int NOT NULL AUTO_INCREMENT,
        notify_name TEXT NOT NULL,
        notify_title TEXT NOT NULL,
        notify_text TEXT NOT NULL,
        notify_type VARCHAR(255) NOT NULL,
        notify_date_from VARCHAR(255) NOT NULL,
        notify_date_to VARCHAR(255) NOT NULL,
        notify_action_url TEXT NOT NULL,
        notify_roles INT(100) NOT NULL,
        notify_users INT(100) NOT NULL,
        PRIMARY KEY (notify_id)
    );`, 
    function (err, result) {
      if (err) throw err;
    });
   }

   verifyUser(data, callback){
    this.con.query("SELECT * FROM users WHERE email='" + data.email +"';", 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
  
  userInfo(data, callback){
    this.con.query("SELECT * FROM users LEFT JOIN roles ON roles.roles_id = users.positions WHERE user_id='" + data.user_id +"';", 
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

  custom(sql, callback){
    console.log(sql)
    this.con.query(sql, 
    function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  update(sql, db,where_row,where_data, callback){

    this.rows = "";
    this.i = 1;
    for (var key in sql) {
      if (sql.hasOwnProperty(key)) {
        if(this.i < Object.keys(sql).length) {
          this.rows += key+" = " + "'"+sql[key]+"', ";
        } else {
          this.rows += key+" = " + "'"+sql[key]+"' ";
        }
      }
      this.i++;
  }
  console.log("UPDATE "+db+" SET "+this.rows+" WHERE "+where_row+" = '"+where_data+"'")
  this.con.query("UPDATE "+db+" SET "+this.rows+" WHERE "+where_row+" = '"+where_data+"'", function (err, result) {
    if (err) throw err;
    return callback(true);
  });
  }

  showAllWorkers(pg,limit,callback) {
    var db = this.con;
    db.query(`SELECT roles.roles_name as role_name, users.* FROM users LEFT JOIN roles ON roles.roles_value = users.positions LIMIT ${limit} OFFSET ${parseInt(pg - 1)*parseInt(limit)};`,
     function (err, result) {
      db.query(`SELECT COUNT(*)/${limit} as pages FROM users`,
      function (err, pages) {
        console.log(Math.ceil(pages[0].pages))
        return callback({data: result,pages:Math.ceil(pages[0].pages)})
      });

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

  insert(sql, db, callback){

    this.rows = "";
    this.values = "";
    this.i = 1;
    for (var key in sql) {
      if (sql.hasOwnProperty(key)) {
        if(this.i < Object.keys(sql).length) {
          this.rows += key+", ";
          this.values += "'"+sql[key]+"', ";
        } else {
          this.rows += key+" ";
          this.values += "'"+sql[key]+"' ";
        }
      }
      this.i++;
  }
  this.con.query("INSERT INTO `"+db+"` ("+this.rows+") VALUES("+this.values+")", function (err, result) {
    if (err) throw err;
    return callback(result.insertId);
    
  });
  }

}