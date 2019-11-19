const connexion = require("../../connexions/db");
var express = require("express");
var curriculumRoutes = express.Router();
const mysql = require("mysql");

//All information of curriculum vitae

curriculumRoutes.post("/all-curriculum-vitae-information", (req, res, next) => {
  console.log("email", req.body.email);
  const formData = req.body.email;
  connexion.query(
    `SELECT usr.user_id, usr.first_name, usr.last_name, usr.birthdate, usr.nationality,usr.linkedin, usr.driving_license,usr.email, usr.phone, usr.address, usr.zip_code, usr.municipality, usr.city, usr.country, usr.profil, usr.pictures, lan.language_id, lan.language_name, lan.language_level_id, lle.language_level_id, lle.language_level_name, ski.skill_id, ski.skill_name, ski.skill_level_id, sle.skill_level_id, sle.skill_level_name, edc.education_id, edc.education_level_id, edc.title_name, edc.year_start, edc.year_end, edc.university, edc.city, edc.country, edc.description, edl.education_level_id, edl.education_level_name, wke.work_experience_id,wke.title_name_wke, wke.year_start_wke, wke.year_end_wke, wke.company_name, wke.city_wke, wke.country_wke, wke.description_wke, wkr.work_references_id,wkr.reference_person, wkr.company_name_ref, wkr.email_ref, wkr.phone_ref FROM user_information AS uif
    JOIN user AS usr ON usr.user_id=uif.user_id 
    JOIN languages AS lan ON lan.language_id=uif.language_id
    JOIN language_level AS lle ON lle.language_level_id=lan.language_level_id
    JOIN skills AS ski ON ski.skill_id = uif.skill_id
    JOIN skill_level AS sle ON sle.skill_level_id=ski.skill_level_id
    JOIN education AS edc ON edc.education_id = uif.education_id
    JOIN education_level AS edl ON edl.education_level_id=edc.education_level_id
    JOIN work_experience AS wke ON wke.work_experience_id = uif.work_experience_id
    JOIN work_references AS wkr ON wkr.work_references_id = uif.work_references_id 
    WHERE usr.email="${formData}"`,
    (err, results) => {
      if (err) {
        "all tables", err;
        res.status(500).send("error to create order");
      } else {
        console.log("cv", results);
        res.json(results);
      }
    }
  );
});


// user informations

curriculumRoutes.put("/update-user", (req, res, next) => {
  const formData = req.body;
  console.log(formData, "update");
  connexion.query(
    `UPDATE user SET first_name='${formData.first_name}',last_name='${formData.last_name}',birthdate='${formData.birthdateId}',nationality='${formData.nationalityContact}',linkedin='${formData.linkedIn}',driving_license='${formData.drivingLicenseContact}',email='${formData.e_mail}',phone='${formData.phoneId}',city='${formData.cityContact}',country='${formData.countryContact}',profile='${formData.profileId}' WHERE user_id=${formData.user_id}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//skills

curriculumRoutes.get("/skill-level", (req, res, next) => {
  connexion.query(`SELECT * FROM skill_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-skills", (req, res, next) => {
  const formData = req.body.skill;
  console.log(req.body, "skills");
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(
      `(${item.nameSkill}, ${item.skillLevelId}, '${req.body.user_id}'),`
    );
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO skills (skill_name, skill_level_id, user_id) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//languages

curriculumRoutes.get("/language-level", (req, res, next) => {
  connexion.query(`SELECT * FROM language_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-languages", (req, res, next) => {
  const formData = req.body.language;
  console.log(req.body, "lang")
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(
      `(${item.nameLanguage}, ${item.languageLevelId}, '${req.body.user_id}'),`
    );
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO languages (language_name, language_level_id, user_id) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//education

curriculumRoutes.get("/education-level", (req, res, next) => {
  connexion.query(`SELECT * FROM education_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-education", (req, res, next) => {
  const formData = req.body.education;
  console.log(req.body, "education")
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.educationLevelId}, ${item.nameTitle}, '${item.yearStart}', '${item.yearEnd}', 
        '${item.universityEducation}', '${item.cityEducation}', '${item.countryEducation}', '${item.descriptionEducation}', '${req.body.user_id}'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO education (education_level_id, title_name, year_start, year_end, university, city, country, description, user_id) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//work experience

curriculumRoutes.get("/work-experience", (req, res, next) => {
  connexion.query(`SELECT * FROM work_experience`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-work-experience", (req, res, next) => {
  const formData = req.body.work;
  console.log(req.body, "exp")
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.titleNameWke},'${item.yearStartWke}', '${item.yearEndWke}', 
        '${item.companyName}', '${item.cityWke}', '${item.countryWke}','${item.descriptionWke}', '${req.body.user_id}'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO work_experience (title_name_wke, year_start_wke, year_end_wke, company_name, city_wke, country_wke, description_wke, user_id) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//Work references

curriculumRoutes.get("/work-references", (req, res, next) => {
  connexion.query(`SELECT * FROM work_references`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-work-references", (req, res, next) => {
  const formData = req.body;
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.reference_person},'${item.company_name_ref}', '${item.email_ref}', 
        '${item.phone_ref}'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO work_references (reference_person, company_name_ref, email_ref, phone_ref) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

/*curriculumRoutes.post('/add-curriculum-vitae', (req, res, next) => {
  connexion.query(`INSERT INTO work_references (user_id, language_id, skill_id, education_id, work_experience_id, work_references_id) VALUES ('${}', '${}', '${}','${}', '${}', '${}')`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  })
});*/

module.exports = curriculumRoutes;
