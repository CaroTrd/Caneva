import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeIdUser } from "../../actions/logout.actions";
import { Field, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";

import Contact from "./contact";
import Profile from "./profile";
import Skills from "./skills";
import Langages from "./langage";
import Education from "./education";
import Experience from "./work_experience";

import "./index.css";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDataCV: [],
      titleEducation: "",
      titleSkill: "",
      titleLanguage: "",
      titleWke: "",
      cssTitle: "",
      sizeTitle: "",
      title: "",
      last_name: "",
      first_name: "",
      profile_picture: "",
      profile_id: 0,
      profileId: "",
      contact_id: 0,
      education_db: [],
      education_id: 0,
      educationLevel: [],
      skill_db: [],
      skill_id: 0,
      skillLevel: [],
      language_db: [],
      language_id: 0,
      languageLevel: [],
      experience_db: [],
      experience_id: 0,
      layout: [
        { i: "name", x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
        { i: "titre", x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12 },
        { i: "contact", x: 0, y: 3, w: 6, h: 9 },
        { i: "profil", x: 0, y: 4, w: 6, h: 5 },
        { i: "skills", x: 6, y: 5, w: 6, h: 5 },
        { i: "experience", x: 6, y: 6, w: 6, h: 4 },
        { i: "education", x: 6, y: 7, w: 6, h: 4 }
      ]
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/language-level")
        .then(response => response.json())
        .then(data => this.setState({ languageLevel: data }));
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationLevel: data }));
      fetch("/api/curriculum/skill-level")
        .then(response => response.json())
        .then(data => this.setState({ skillLevel: data }));
      fetch("/api/curriculum/all-curriculum-vitae-information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.props.usr.email
        })
      })
        .then(res => res.json())
        .then(data =>
          this.setState({
            allDataCV: data
          })
        );
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeData = e => {
    if (
      [
        "year_start",
        "year_end",
        "education_level_id",
        "title_name",
        "university",
        "city",
        "country",
        "description",
        "skill_name",
        "skill_level_id",
        "language_name",
        "language_level_id",
        "title_name_wke",
        "year_start_wke",
        "year_end_wke",
        "company_name",
        "city_wke",
        "country_wke",
        "description_wke"
      ].includes(e.target.className)
    ) {
      let allDataCV = [...this.state.allDataCV];
      allDataCV[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ allDataCV }, () => console.log(this.state.allDataCV));
    } else if (["nameSkill", "skillLevelId"].includes(e.target.className)) {
      let skill_db = [...this.state.skill_db];
      skill_db[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ skill_db }, () => console.log(this.state.skill_db));
    } else if (
      ["nameLanguage", "languageLevelId"].includes(e.target.className)
    ) {
      let language_db = [...this.state.language_db];
      language_db[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ language_db }, () => console.log(this.state.language_db));
    } else if (
      [
        "titleNameWke",
        "yearStartWke",
        "yearEndWke",
        "companyName",
        "cityWke",
        "countryWke",
        "descriptionWke"
      ].includes(e.target.className)
    ) {
      let experience_db = [...this.state.experience_db];
      experience_db[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ experience_db }, () =>
        console.log(this.state.experience_db)
      );
    } else if (
      [
        "yearStart",
        "yearEnd",
        "educationLevelId",
        "nameTitle",
        "universityEducation",
        "cityEducation",
        "countryEducation",
        "descriptionEducation"
      ].includes(e.target.className)
    ) {
      let education_db = [...this.state.education_db];
      education_db[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ education_db }, () =>
        console.log(this.state.education_db)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleProfileId(ev) {
    let joined = this.state.profile_id.concat(ev);
    this.setState({ profile_id: joined });
    console.log(ev, joined, this.state.profile_id);
  }
  handleContactId(ev) {
    let joined = this.state.contact_id.concat(ev);
    this.setState({ contact_id: joined });
    console.log(ev, joined, this.state.contact_id);
  }
  handleSkillId(ev) {
    let joined = this.state.skill_id.concat(ev);
    this.setState({ skill_id: joined });
    console.log(ev, joined, this.state.skill_id);
  }
  addNewSkill() {
    this.setState(prevState => ({
      skill_db: [...prevState.skill_db, { nameSkill: "", skillLevelId: "" }]
    }));
  }
  deleteSkillDb(index) {
    this.state.skill_db.splice(index, 1);
    this.setState({ skill_db: this.state.skill_db });
  }
  handleLanguageId(ev) {
    let joined = this.state.language_id.concat(ev);
    this.setState({ language_id: joined });
    console.log(ev, joined, this.state.language_id);
  }
  addNewLanguage() {
    this.setState(prevState => ({
      language_db: [
        ...prevState.language_db,
        { nameLanguage: "", languageLevelId: "" }
      ]
    }));
  }
  deleteLanguageDb(index) {
    this.state.language_db.splice(index, 1);
    this.setState({ language_db: this.state.language_db });
  }
  handleEducationId(ev) {
    let joined = this.state.education_id.concat(ev);
    this.setState({ education_id: joined });
    console.log(ev, joined, this.state.education_id);
  }
  addNewEducation() {
    this.setState(prevState => ({
      education_db: [
        ...prevState.education_db,
        {
          yearStart: "",
          yearEnd: "",
          educationLevelId: "",
          nameTitle: "",
          universityEducation: "",
          cityEducation: "",
          countryEducation: "",
          descriptionEducation: ""
        }
      ]
    }));
  }
  deleteEducationDb(index) {
    this.state.education_db.splice(index, 1);
    this.setState({ education_db: this.state.education_db });
  }
  handleExperienceId(ev) {
    let joined = this.state.experience_id.concat(ev);
    this.setState({ experience_id: joined });
    console.log(ev, joined, this.state.experience_id);
  }
  addNewExperience() {
    this.setState(prevState => ({
      experience_db: [
        ...prevState.experience_db,
        {
          title_name_wke: "",
          year_start_wke: "",
          year_end_wke: "",
          company_name: "",
          city_wke: "",
          country_wke: "",
          description_wke: ""
        }
      ]
    }));
  }

  deleteExperienceDb(index) {
    this.state.experience_db.splice(index, 1);
    this.setState({ experience_db: this.state.experience_db });
  }

  allFetch() {
    console.log("fetch")
    this.fetchContact();
    this.fetchSkillAdd();
    this.fetchLanguageAdd();
    this.fetchExperiencesAdd();
    this.fetchEducationAdd();
  }
  fetchContact = () => {
    fetch("/api/curriculum/update-user", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        last_name: this.state.last_name,
        first_name: this.state.last_name,
        birthdateId: this.state.birthdateId,
        nationalityContact: this.state.nationalityContact,
        linkedIn: this.state.linkedIn,
        drivingLicenseContact: this.state.drivingLicenseContact,
        e_mail: this.state.e_mail,
        phoneId: this.state.phoneId,
        cityContact: this.state.cityContact,
        countryContact: this.state.countryContact,
        profileId: this.state.profileId,
        user_id: this.props.usr.user_id
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm("La ou les information(s) ont bien été enregistrée(s)")
        ) {
          this.props.history.push("/");
        }
      } else if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  fetchSkillAdd = () => {
    fetch("/api/curriculum/add-skills", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        skill: this.state.skill_db,
        user_id: this.props.usr.user_id
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm("La ou les compétence(s) ont bien été enregistrée(s)")
        ) {
          this.props.history.push("/");
        }
      } else if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  fetchLanguageAdd = () => {
    fetch("/api/curriculum/add-languages", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        language: this.state.language_db,
        user_id: this.props.usr.user_id
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm("Le ou les language(s) ont bien été enregistré(s)")
        ) {
          this.props.history.push("/");
        }
      } else if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  fetchExperiencesAdd = () => {
    fetch("/api/curriculum/add-work-experience", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        work: this.state.experience_db,
        user_id: this.props.usr.user_id
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm("La ou les expérience(s) ont bien été enregistrée(s)")
        ) {
          this.props.history.push("/");
        }
      } else if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  fetchEducationAdd = () => {
    fetch("/api/curriculum/add-education", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        education: this.state.education_db,
        user_id: this.props.usr.user_id
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm("La ou les formation(s) ont bien été enregistrée(s)")
        ) {
          this.props.history.push("/");
        }
      } else if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  fetchSkillUpdate = () => {
    fetch("/api/edit-student", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        students: this.state.students
      })
    }).then(res => {
      if (res.status === 200) {
        if (
          window.confirm(
            "La ou les modification(s) ont bien été enregistrée(s)"
          )
        ) {
          this.props.history.push("/");
        }
      }
      if (res.status === 500) {
        if (
          window.confirm(
            "Nous avons rencontré un problème lors de la sauvegarde."
          )
        ) {
          this.props.history.push("/");
        }
      }
    });
  }
  /*fetchSkillDelete() {
    fetch("/api/delete-student", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ id: this.state.student_id })
    }).then(res => {
      if (res.status === 200) {
        if (window.confirm('Le ou les étudiant(s) ont bien été supprimé(s)')){ this.props.history.push("/") }
      }
      if (res.status === 500) {
        if (window.confirm('Nous avons rencontré un problème lors de la suppression.')){ this.props.history.push("/") }
      }
    });
  }*/
  render() {
    console.log(this.state, this.state.phoneId);
    let {
      allDataCV,
      education_db,
      skill_db,
      language_db,
      experience_db
    } = this.state;
    let profileShow = "";
    if (allDataCV !== undefined) {
      profileShow = allDataCV.map((elem, index) => {
        let skillId = `skill_name-${elem.skill_id}`,
          skillLevelId = `skill_level_id-${elem.skill_id}`,
          languageId = `language_name-${elem.language_id}`,
          languageLevelId = `language_level_id-${elem.language_id}`,
          titleId = `title_name_wke-${elem.work_experience_id}`,
          yearStartId = `year_start_wke-${elem.work_experience_id}`,
          yearEndId = `year_end_wke-${elem.work_experience_id}`,
          companyId = `company_name-${elem.work_experience_id}`,
          cityWkeId = `city_wke-${elem.work_experience_id}`,
          countryWkeId = `country_wke-${elem.work_experience_id}`,
          descriptionId = `description_wke-${elem.work_experience_id}`,
          titleNameId = `title_name-${elem.education_id}`,
          educationLevelId = `education_level_id-${elem.education_id}`,
          yearStartEducationId = `year_start-${elem.education_id}`,
          yearEndEducationId = `year_end-${elem.education_id}`,
          universityId = `university-${elem.education_id}`,
          cityEducationId = `city-${elem.education_id}`,
          countryEducationId = `country-${elem.education_id}`,
          descriptionEducationId = `description-${elem.education_id}`;
        return (
          <nav>
            <ul key={elem.user_id || index} className="ul-list">
              <li>
                <input
                  type="text"
                  name={skillId}
                  data-id={index}
                  id={skillId}
                  defaultValue={allDataCV[index].skill_name}
                  placeholder="Introduis ta modification"
                  className="skill_name"
                />
              </li>
              <li>
                <select
                  name={skillLevelId}
                  data-id={index}
                  id={skillLevelId}
                  defaultValue={allDataCV[index].skill_level_id}
                  placeholder="Introduis ta modification"
                  className="skill_level_id"
                >
                  <option>Niveau</option>
                  {this.state.skillLevel.map((elem, index) => (
                    <option key={index} value={elem.skill_level_id}>
                      {elem.skill_level_name}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <input
                  type="text"
                  name={languageId}
                  data-id={index}
                  id={languageId}
                  defaultValue={allDataCV[index].language_name}
                  placeholder="Introduis ta modification"
                  className="language_name"
                />
              </li>
              <li>
                <select
                  name={languageLevelId}
                  data-id={index}
                  id={languageLevelId}
                  defaultValue={allDataCV[index].language_level_id}
                  className="language_level_id"
                >
                  <option>Niveau</option>
                  {this.state.languageLevel.map((elem, index) => (
                    <option key={index} value={elem.language_level_id}>
                      {elem.language_level_name}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <input
                  type="date"
                  name={yearStartId}
                  data-id={index}
                  id={yearStartId}
                  defaultValue={allDataCV[index].year_start_wke}
                  placeholder="Introduis ta modification"
                  className="year_start_wke"
                />
              </li>
              <li>
                <input
                  type="date"
                  name={yearEndId}
                  data-id={index}
                  id={yearEndId}
                  defaultValue={allDataCV[index].year_end_wke}
                  placeholder="Introduis ta modification"
                  className="year_end_wke"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={titleId}
                  data-id={index}
                  id={titleId}
                  defaultValue={allDataCV[index].title_name_wke}
                  placeholder="Introduis ta modification"
                  className="title_name_wke"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={companyId}
                  data-id={index}
                  id={companyId}
                  defaultValue={allDataCV[index].company_name}
                  placeholder="Introduis ta modification"
                  className="company_name"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={cityWkeId}
                  data-id={index}
                  id={cityWkeId}
                  defaultValue={allDataCV[index].city_wke}
                  placeholder="Introduis ta modification"
                  className="city_wke"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={countryWkeId}
                  data-id={index}
                  id={countryWkeId}
                  defaultValue={allDataCV[index].country_wke}
                  placeholder="Introduis ta modification"
                  className="country_wke"
                />
              </li>
              <li>
                <input
                  type="textarea"
                  name={descriptionId}
                  data-id={index}
                  id={descriptionId}
                  defaultValue={allDataCV[index].description_wke}
                  placeholder="Introduis ta modification"
                  className="description_wke"
                  width="250px"
                  height="150px"
                />
              </li>
              <li>
                <input
                  type="date"
                  name={yearStartEducationId}
                  data-id={index}
                  id={yearStartEducationId}
                  defaultValue={allDataCV[index].year_start}
                  placeholder="Introduis ta modification"
                  className="year_start"
                />
              </li>
              <li>
                <input
                  type="date"
                  name={yearEndEducationId}
                  data-id={index}
                  id={yearEndEducationId}
                  defaultValue={allDataCV[index].year_end}
                  placeholder="Introduis ta modification"
                  className="year_end"
                />
              </li>
              <li>
                <select
                  name={educationLevelId}
                  data-id={index}
                  id={educationLevelId}
                  defaultValue={allDataCV[index].education_level_id}
                  className="education_level_id"
                >
                  <option>Niveau</option>
                  {this.state.educationLevel.map((elem, index) => (
                    <option key={index} value={elem.education_level_id}>
                      {elem.education_level_name}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <input
                  type="text"
                  name={titleNameId}
                  data-id={index}
                  id={titleNameId}
                  defaultValue={allDataCV[index].title_name}
                  placeholder="Introduis ta modification"
                  className="title_name"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={universityId}
                  data-id={index}
                  id={universityId}
                  defaultValue={allDataCV[index].university}
                  placeholder="Introduis ta modification"
                  className="university"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={cityEducationId}
                  data-id={index}
                  id={cityEducationId}
                  defaultValue={allDataCV[index].city}
                  placeholder="Introduis ta modification"
                  className="city"
                />
              </li>
              <li>
                <input
                  type="text"
                  name={countryEducationId}
                  data-id={index}
                  id={countryEducationId}
                  defaultValue={allDataCV[index].country}
                  placeholder="Introduis ta modification"
                  className="country"
                />
              </li>
              <li>
                <input
                  type="textarea"
                  name={descriptionEducationId}
                  data-id={index}
                  id={descriptionEducationId}
                  defaultValue={allDataCV[index].description}
                  placeholder="Introduis ta modification"
                  className="description"
                  width="250px"
                  height="150px"
                />
              </li>
            </ul>
          </nav>
        );
      });
    }
    console.log(this.state.first_name, this.state.last_name);
    var layout = [
      { i: "name", x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
      { i: "titre", x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12 },
      { i: "contact", x: 0, y: 3, w: 6, h: 9 },
      { i: "profil", x: 0, y: 4, w: 6, h: 5 },
      { i: "skills", x: 6, y: 5, w: 6, h: 5 },
      { i: "languages", x: 6, y: 5, w: 6, h: 5 },
      { i: "experience", x: 6, y: 6, w: 6, h: 4 },
      { i: "education", x: 6, y: 7, w: 6, h: 4 }
    ];

    return (
      <div>
        <div className="container-cv-form">
          <div>
            <input
              type="text"
              placeholder="couleur"
              onChange={e => this.setState({ cssTitle: e.target.value })}
            />
            <input
              type="text"
              placeholder="size"
              onChange={e => this.setState({ sizeTitle: e.target.value })}
            />
          </div>
          <div className="container-update-cv">
            <form onChange={this.handleChangeData}>
              <div>
                <input
                  type="text"
                  name="title"
                  defaultValue={this.state.title}
                  onChange={e => this.handleChange(e)}
                  className=""
                />
              </div>
              <div>
                <ul>
                  <li>
                    <input
                      type="text"
                      name="first_name"
                      defaultValue={this.props.usr.first_name}
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      name="last_name"
                      defaultValue={this.props.usr.last_name}
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                  </li>
                </ul>
              </div>
              <div>{profileShow}</div>
              <div>
                <ul className="ul-list">
                  <li className="li-list">
                    <label htmlFor="phoneContact"></label>
                    <textarea
                      name="profileId"
                      placeholder=""
                      onChange={e => this.handleChange(e)}
                      className=""
                      rows="5"
                      cols="33"
                    />
                  </li>
                </ul>
              </div>
              <div>
                <ul className="ul-list">
                  <li className="li-list">
                    <label htmlFor="phoneContact"></label>
                    <input
                      type="tel"
                      name="phoneId"
                      placeholder="Numéro de téléphone"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="e_mail"></label>
                    <input
                      type="email"
                      name="e_mail"
                      defaultValue={this.props.usr.email}
                      placeholder="Adresse e-mail"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="linkedIn"></label>
                    <input
                      type="url"
                      name="linkedIn"
                      placeholder="Linkedin"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="birthDate"></label>
                    <input
                      type="date"
                      name="birthdateId"
                      placeholder="Année de naissance"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="nationalityContact"></label>
                    <input
                      type="text"
                      name="nationalityContact"
                      placeholder="Nationalité"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="cityContact"></label>
                    <input
                      type="text"
                      name="cityContact"
                      placeholder="Ville"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="countryContact"></label>
                    <input
                      type="text"
                      name="countryContact"
                      placeholder="Pays"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                    <label htmlFor="drivingLicense"></label>
                    <input
                      type="text"
                      name="drivingLicenseContact"
                      placeholder="Catégorie du permis de conduire"
                      onChange={e => this.handleChange(e)}
                      className=""
                    />
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Titre"
                    onChange={e =>
                      this.setState({ titleSkill: e.target.value })
                    }
                  />
                  {skill_db.map((elem, index) => {
                    let skillId = `nameSkill-${index}`,
                      skillLevelId = `skillLevelId-${index}`;
                    return (
                      <ul key={index} className="ul-list">
                        <li className="li-list">
                          <label htmlFor="nameSkill"></label>
                          <input
                            type="text"
                            name={skillId}
                            data-id={index}
                            id={skillId}
                            defaultValue={skill_db[index].nameSkill}
                            placeholder="Nom de la compétence"
                            className="nameSkill"
                          />
                          <label htmlFor={skillLevelId}></label>
                          <select
                            name={skillLevelId}
                            data-id={index}
                            id={skillLevelId}
                            defaultValue={skill_db[index].skillLevelId}
                            className="skillLevelId"
                          >
                            <option>Niveau</option>
                            {this.state.skillLevel.map((elem, index) => (
                              <option key={index} value={elem.skill_level_id}>
                                {elem.skill_level_name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={e => this.deleteSkillDb(e)}
                            className="icon-folder-minus"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="add-new-subject"
                  onClick={() => this.addNewSkill()}
                >
                  Skill
                </button>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Titre"
                    onChange={e =>
                      this.setState({ titleLanguage: e.target.value })
                    }
                  />
                  {language_db.map((elem, index) => {
                    let languageId = `nameLanguage-${index}`,
                      languageLevelId = `languageLevelId-${index}`;
                    return (
                      <ul key={index} className="ul-list">
                        <li className="li-list">
                          <label htmlFor="nameLanguage"></label>
                          <input
                            type="text"
                            name={languageId}
                            data-id={index}
                            id={languageId}
                            defaultValue={language_db[index].nameLanguage}
                            placeholder="Langue"
                            className="nameLanguage"
                          />
                          <label htmlFor={languageLevelId}></label>
                          <select
                            name={languageLevelId}
                            data-id={index}
                            id={languageLevelId}
                            defaultValue={language_db[index].languageLevelId}
                            className="languageLevelId"
                          >
                            <option>Niveau</option>
                            {this.state.languageLevel.map((elem, index) => (
                              <option
                                key={index}
                                value={elem.language_level_id}
                              >
                                {elem.language_level_name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={e => this.deleteLanguageDb(e)}
                            className="icon-folder-minus"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="add-new-subject"
                  onClick={() => this.addNewLanguage()}
                >
                  Langue
                </button>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Titre"
                    onChange={e => this.setState({ titleWke: e.target.value })}
                  />
                  {experience_db.map((elem, index) => {
                    let titleId = `titleNameWke-${index}`,
                      yearStartId = `yearStartWke-${index}`,
                      yearEndId = `yearEndWke-${index}`,
                      companyId = `companyName-${index}`,
                      cityId = `cityWke-${index}`,
                      countryId = `countryWke-${index}`,
                      descriptionId = `descriptionWke-${index}`;
                    return (
                      <ul key={index} className="ul-list">
                        <li className="li-list">
                          <label htmlFor="yearStartWke"></label>
                          <input
                            type="date"
                            name={yearStartId}
                            data-id={index}
                            id={yearStartId}
                            defaultValue={experience_db[index].yearStartWke}
                            placeholder="Date de début"
                            className="yearStartWke"
                          />
                          <label htmlFor="yearEndWke"></label>
                          <input
                            type="date"
                            name={yearEndId}
                            data-id={index}
                            id={yearEndId}
                            defaultValue={experience_db[index].yearEndWke}
                            placeholder="Date de fin"
                            className="yearEndWke"
                          />
                          <label htmlFor="titleNameWke"></label>
                          <input
                            type="text"
                            name={titleId}
                            data-id={index}
                            id={titleId}
                            defaultValue={experience_db[index].titleNameWke}
                            placeholder="Titre du poste"
                            className="titleNameWke"
                          />
                          <label htmlFor="companyName"></label>
                          <input
                            type="text"
                            name={companyId}
                            data-id={index}
                            id={companyId}
                            defaultValue={experience_db[index].companyName}
                            placeholder="Nom de la société"
                            className="companyName"
                          />
                          <label htmlFor="cityWke"></label>
                          <input
                            type="text"
                            name={cityId}
                            data-id={index}
                            id={cityId}
                            defaultValue={experience_db[index].cityWke}
                            placeholder="Ville"
                            className="cityWke"
                          />
                          <label htmlFor="countryWke"></label>
                          <input
                            type="text"
                            name={countryId}
                            data-id={index}
                            id={countryId}
                            defaultValue={experience_db[index].countryWke}
                            placeholder="Pays"
                            className="countryWke"
                          />
                          <label htmlFor="descriptionWke"></label>
                          <input
                            type="textarea"
                            name={descriptionId}
                            data-id={index}
                            id={descriptionId}
                            defaultValue={experience_db[index].descriptionWke}
                            placeholder="Description"
                            className="descriptionWke"
                            width="250px"
                            height="150px"
                          />
                          <button
                            onClick={e => this.deleteExperienceDb(e)}
                            className="icon-folder-minus"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="add-new-subject"
                  onClick={() => this.addNewExperience()}
                >
                  Experience
                </button>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Titre"
                    onChange={e =>
                      this.setState({ titleEducation: e.target.value })
                    }
                  />
                  {education_db.map((elem, index) => {
                    let titleId = `nameTitle-${index}`,
                      educationLevelId = `educationLevelId-${index}`,
                      yearStartId = `yearStart-${index}`,
                      yearEndId = `yearEnd-${index}`,
                      universityId = `universityEducation-${index}`,
                      cityId = `cityEducation-${index}`,
                      countryId = `countryEducation-${index}`,
                      descriptionId = `descriptionEducation-${index}`;
                    return (
                      <ul key={index} className="ul-list">
                        <li className="li-list">
                          <label htmlFor="yearStart"></label>
                          <input
                            type="date"
                            name={yearStartId}
                            data-id={index}
                            id={yearStartId}
                            defaultValue={education_db[index].yearStart}
                            placeholder="Année début"
                            className="yearStart"
                          />
                          <label htmlFor="yearEnd"></label>
                          <input
                            type="date"
                            name={yearEndId}
                            data-id={index}
                            id={yearEndId}
                            defaultValue={education_db[index].yearEnd}
                            placeholder="Année fin"
                            className="yearEnd"
                          />
                          <label htmlFor={educationLevelId}></label>
                          <select
                            name={educationLevelId}
                            data-id={index}
                            id={educationLevelId}
                            defaultValue={education_db[index].educationLevelId}
                            className="educationLevelId"
                          >
                            <option>Niveau</option>
                            {this.state.educationLevel.map((elem, index) => (
                              <option
                                key={index}
                                value={elem.education_level_id}
                              >
                                {elem.education_level_name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="nameTitle"></label>
                          <input
                            type="text"
                            name={titleId}
                            data-id={index}
                            id={titleId}
                            defaultValue={education_db[index].nameTitle}
                            placeholder="Etudes"
                            className="nameTitle"
                          />
                          <label htmlFor="universityEducation"></label>
                          <input
                            type="text"
                            name={universityId}
                            data-id={index}
                            id={universityId}
                            defaultValue={
                              education_db[index].universityEducation
                            }
                            placeholder="Lieu d'étude"
                            className="universityEducation"
                          />
                          <label htmlFor="cityEducation"></label>
                          <input
                            type="text"
                            name={cityId}
                            data-id={index}
                            id={cityId}
                            defaultValue={education_db[index].cityEducation}
                            placeholder="Ville"
                            className="cityEducation"
                          />
                          <label htmlFor="countryEducation"></label>
                          <input
                            type="text"
                            name={countryId}
                            data-id={index}
                            id={countryId}
                            defaultValue={education_db[index].countryEducation}
                            placeholder="Pays"
                            className="countryEducation"
                          />
                          <label htmlFor="descriptionEducation"></label>
                          <input
                            type="textarea"
                            name={descriptionId}
                            data-id={index}
                            id={descriptionId}
                            defaultValue={
                              education_db[index].descriptionEducation
                            }
                            placeholder="Descrire"
                            className="descriptionEducation"
                            width="250px"
                            height="150px"
                          />
                          <button
                            onClick={e => this.deleteEducationDb(e)}
                            className="icon-folder-minus"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="add-new-subject"
                  onClick={() => this.addNewEducation()}
                >
                  Education
                </button>
              </div>
            </form>
          </div>
          <div className={"container cv"}>
            <GridLayout
              className="layout"
              layout={layout}
              cols={12}
              rowHeight={20}
              width={600}
            >
              <div className={"cv-part"} key="titre">
                {this.state.title}
              </div>
              <div className={"cv-part"} key="name">
                <ul>
                  <li>{this.state.first_name}</li>
                  <li>{this.state.last_name}</li>
                </ul>
              </div>
              <div className={"cv-part"} key="contact">
                <Contact
                  allDataCV={this.state.allDataCV}
                  phoneId={this.state.phoneId}
                  e_mail={this.state.e_mail}
                  linkedIn={this.state.linkedIn}
                  birthdateId={this.state.birthdateId}
                  nationalityContact={this.state.nationalityContact}
                  cityContact={this.state.cityContact}
                  countryContact={this.state.countryContact}
                  drivingLicenseContact={this.state.drivingLicenseContact}
                />
              </div>

              <div className={"cv-part"} key="profil">
                <Profile
                  allDataCV={this.state.allDataCV}
                  profileId={this.state.profileId}
                  cssTitle={this.state.cssTitle}
                />
              </div>

              <div className={"cv-part"} key="skills">
                <Skills
                  allDataCV={this.state.allDataCV}
                  skill_db={this.state.skill_db}
                  titleSkill={this.state.titleSkill}
                  cssTitle={this.state.cssTitle}
                  sizeTitle={this.state.sizeTitle}
                />
              </div>
              <div className={"cv-part"} key="languages">
                <Langages
                  allDataCV={this.state.allDataCV}
                  language_db={this.state.language_db}
                  titleLanguage={this.state.titleLanguage}
                  cssTitle={this.state.cssTitle}
                  sizeTitle={this.state.sizeTitle}
                />
              </div>
              <div className={"cv-part"} key="experience">
                <Experience
                  allDataCV={this.state.allDataCV}
                  experience_db={this.state.experience_db}
                  titleWke={this.state.titleWke}
                  cssTitle={this.state.cssTitle}
                  sizeTitle={this.state.sizeTitle}
                />
              </div>
              <div className={"cv-part"} key="education">
                <Education
                  allDataCV={this.state.allDataCV}
                  education_db={this.state.education_db}
                  titleEducation={this.state.titleEducation}
                  cssTitle={this.state.cssTitle}
                  sizeTitle={this.state.sizeTitle}
                />
              </div>
            </GridLayout>
          </div>
        </div>
        <div className="button--inscription">
          <button
            type="submit"
            className="styleButton"
            onSubmit={() => this.allFetch()}
          >
            <span className="styleText">JE VALIDE</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser,
  usr: state.idUser.user,
  cv: state.saveCV.curriculumVitae
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeIdUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "template"
  })(Template)
);
