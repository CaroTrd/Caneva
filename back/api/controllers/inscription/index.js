const connexion = require('../../connexions/db');
var express = require('express');
const bcrypt =  require ( 'bcrypt' );
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
var inscriptionRoutes = express.Router();
var api_key = `${process.env.REACT_MAILGUN_API_KEY}`;
var domain = `${process.env.REACT_MAILGUN_DOMAIN}`;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

//TOKEN function
/*let token = inscriptionRoutes.use(expressJwt({
  secret:
}).unless({
  path: ['/new-user']
}));*/

inscriptionRoutes.post('/new-user',function (req, res) {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  bcrypt.hash(`${req.body.password}`, 10, function(err, hash) {
    // Store hash in database
    connexion.query(`INSERT INTO user (first_name, last_name, email, password) VALUES ('${firstname}', '${lastname}', '${email}', '${hash}')`, async function (err) {
      if (err) {
        console.log(err.message);
        res.status(500).json({ server: "Nous avons rencontré un problème lors de la sauvegarde" });
      } else {
        try {
          connexion.query(`SELECT user_id FROM user ORDER BY user_id DESC LIMIT 0, 1`, function (err, results) {
            if (err) {
              console.log('impossible de récupérer id register', err)
            } else {
                const accessToken  =  jwt.sign( { id: results[0].user_id } ,`${process.env.TOKEN_PASS}`, {
                expiresIn:  15000
              });
              console.log("id", accessToken, "results", results[0])
              res.status(200).send({ "user": results[0].user_id, "access_token": accessToken, "expires_in": 15000 });
            }
          })
        } catch (err) {
          console.log(err)
        }
        try {
          await mailgun.messages().send({
            from: "Caneva <carolinatirado92@gmail.com>", // Expediteur
            to: `Cher/chère Caneva <carolinatirado92@gmail.com>,`, // Destinataires
            subject: "Nouvelle inscription sur Caneva.", // Sujet
            text: "Bonjour Canva," + " " + firstname + " " + lastname + " " + "vous a rejoint Caneva.",
          });
        } catch (err) {
          console.log(err)
        } try {
          await mailgun.messages().send({
            from: "Caneva <carolinatirado92@gmail.com>", // Expediteur
            to: "Deer" + " " +  firstname + ", " + email, // Destinataires
            subject: "Votre inscription sur Caneva.", // Sujet
            text: "Bonjour" + " " + firstname + " " + lastname + ", " + "Nous avons bien reçu ton inscription. Tu peux à partir de maintenant accéder à ton compte sur www.caneva.com et commencer à créer ton curriculum vitae. L'équipe Caneva",
          });
        } catch (err) {
          console.log(err)
        }
      }
    })
  });
}); 

module.exports = inscriptionRoutes;