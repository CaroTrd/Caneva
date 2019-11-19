const connexion = require("../../connexions/db");
var express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const dotenv = require('dotenv').config();
var loginRoutes = express.Router();

/*let token = loginRoutes.use(expressJwt({
  secret: ''
}).unless({
  path: ['/login']
}));*/

/*SELECT * FROM curriculum_vitae AS cuv
  JOIN user AS usr ON usr.user_id=cuv.user_id 
  JOIN languages AS lan ON lan.language_id=cuv.language_id
  JOIN language_level AS lle ON lle.language_level_id=lan.language_level_id
  JOIN skills AS ski ON ski.skill_id = cuv.skill_id
  JOIN skill_level AS sle ON sle.skill_level_id=ski.skill_level_id
  JOIN education AS edc ON edc.education_id = cuv.education_id
  JOIN education_level AS edl ON edl.education_level_id=edc.education_level_id
  JOIN work_experience AS wke ON wke.work_experience_id = cuv.work_experience_id
  JOIN work_references AS wkr ON wkr.work_references_id = cuv.work_references_id 
  WHERE usr.email*/

loginRoutes.post("/login", (req, res) => {
  const login = req.body.email;
  const password = req.body.password;
  let sql = `SELECT * FROM user WHERE email = ${connexion.escape(login)}`;
  connexion.query(sql, (err, results) => {
    if (JSON.stringify(results).indexOf("1") > 0) {
      const newSql = `SELECT * FROM user WHERE email = ${connexion.escape(login)}`;
      connexion.query(newSql, (err, results) => {
        if (bcrypt.compareSync(password, results[0].password)) {
          console.log("results", results[0]);
          const accessToken = jwt.sign(
            { id: results[0].user_id },
            `${process.env.TOKEN_PASS}`,
            {
              expiresIn: 3000
            }
          );
          console.log("logintok", accessToken, "id login", results[0].user_id);
          res.status(200).json({ id: results[0], isValide: true });
        } else {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).json({ isValide: false });
          console.log("Erreur du mot de passe", err);
        }
      });
    } else {
      res.status(200).json({
        auth: false
      });
      console.log("Erreur du pseudo ou du mail");
    }
  });
});

module.exports = loginRoutes;