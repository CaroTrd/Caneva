const connexion = require("../../connexions/db");
var express = require("express");
var deleteAccountRoutes = express.Router();

deleteAccountRoutes.post("/account", function(req, res) {
  let id = req.body.user_id;
  console.log(req.body.user_id);
  connexion.query(
    `DELETE curriculum_vitae, user, languages, skills, education, work_experience, work_references
    FROM curriculum_vitae
    LEFT JOIN user ON (curriculum_vitae.user_id = user.user_id)
    LEFT JOIN languages ON (curriculum_vitae.language_id = languages.language_id)
    LEFT JOIN skills ON (curriculum_vitae.skill_id = skills.skill_id)
    LEFT JOIN education ON (curriculum_vitae.education_id = education.education_id)
    LEFT JOIN work_experience ON (curriculum_vitae.work_experience_id = work_experience.work_experience_id)
    LEFT JOIN work_references ON (curriculum_vitae.work_references_id = work_references.work_references_id)
    WHERE curriculum_vitae.user_id = ${id}`,
    async function(err, results) {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          server: "Nous avons rencontré un problème. Veuillez réssayer plus tard s'il vous plaît"
        });
      } else {
        incrementId(id);
      }
    }
  );
});

incrementId = id => {
  connexion.query(`ALTER TABLE user AUTO_INCREMENT=${id}`, async function(
    err,
    results
  ) {
    if (err) {
      console.log("Impossible d'auto_increment' l'id", err);
    } else {
      console.log(`L'id a bien été remis à ${id}`);
    }
  });
};

module.exports = deleteAccountRoutes;
