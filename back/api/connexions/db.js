const mysql      = require('mysql');
const dotenv = require('dotenv').config();
const connexion = mysql.createConnection({
  host     : `localhost`,
  port     : `8889`,
  user     : `root`, //completer avec vos infos
  password : `${process.env.DB_PASS}`, //completer avec vos infos
  database : `curriculum_vitae` //completer avec vos infos
});

module.exports  =  connexion;