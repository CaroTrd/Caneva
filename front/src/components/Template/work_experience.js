import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceData: [],
      experience_db: [],
      experience_id: 0
    };
  }

  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationData: data }));
    }
  }
  handleChange = e => {
    if (
      [
        "title_name_wke",
        "year_start_wke",
        "year_end_wke",
        "company_name",
        "city_wke",
        "country_wke",
        "description_wke"
      ].includes(e.target.className)
    ) {
      let experienceData = [...this.state.experienceData];
      experienceData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ experienceData }, () =>
        console.log(this.state.experienceData)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
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
  render() {
    console.log(this.state.experience_db);
    let { allDataCV, experience_db } = this.props;
    let experienceShow = "";
    if (allDataCV !== undefined) {
      experienceShow = allDataCV.map((elem, index) => {
        let titleId = `title_name_wke-${elem.work_experience_id}`,
          yearStartId = `year_start_wke-${elem.work_experience_id}`,
          yearEndId = `year_end_wke-${elem.work_experience_id}`,
          companyId = `company_name-${elem.work_experience_id}`,
          cityId = `city_wke-${elem.work_experience_id}`,
          countryId = `country_wke-${elem.work_experience_id}`,
          descriptionId = `description_wke-${elem.work_experience_id}`;
        return (
          <nav>
            <ul key={elem.work_experience_id || index} className="ul-list">
              <li>
                <ul>
                  <li><h1>{elem.work_experience_title_name}</h1></li>
                  <li>{elem.year_start_wke}</li>
                  <li>{elem.year_end_wke}</li>
                  <li>{elem.title_name_wke}</li>
                  <li>{elem.company_name}</li>
                  <li>{elem.city_wke}</li>
                  <li>{elem.country_wke}</li>
                  <li>{elem.description_wke}</li>
                </ul>
              </li>
            </ul>
          </nav>
        );
      });
    }
    return (
      <div>
        <h1 style={{ color:this.props.cssTitle, fontSize:this.props.sizeTitle  }}>{this.props.titleWke}</h1>
        <div>{experienceShow}</div>
        <div>
          {" "}
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
                
                <li className="li-list">{elem.titleNameWke}</li>
                <li>{elem.yearStartWke}</li>
                <li>{elem.yearEndWke}</li>
                <li>{elem.companyName}</li>
                <li>{elem.cityWke}</li>
                <li>{elem.countryWke}</li>
                <li>{elem.descriptionWke}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.idUser.loggedInUser,
    userId: state.idUser.user.user_id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Experience)
);
