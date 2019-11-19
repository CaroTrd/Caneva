import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationLevel: [],
      educationData: [],
      education_db: [],
      education_id: 0
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationLevel: data }));
    }
  }
  handleChange = e => {
    if (
      [
        "year_start",
        "year_end",
        "education_level_id",
        "title_name",
        "university",
        "city",
        "country",
        "description"
      ].includes(e.target.className)
    ) {
      let educationData = [...this.state.educationData];
      educationData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ educationData }, () =>
        console.log(this.state.educationData)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleEducationId(ev) {
    let joined = this.state.education_id.concat(ev);
    this.setState({ education_id: joined });
    console.log(ev, joined, this.state.education_id);
  }
  addNew() {
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
  render() {
    let { allDataCV, education_db } = this.props;
    let educationShow = "";
    if (allDataCV !== undefined) {
      educationShow = allDataCV.map((elem, index) => {
        let titleId = `title_name-${elem.education_id}`,
          educationLevelId = `education_level_id-${elem.education_id}`,
          yearStartId = `year_start-${elem.education_id}`,
          yearEndId = `year_end-${elem.education_id}`,
          universityId = `university-${elem.education_id}`,
          cityId = `city-${elem.education_id}`,
          countryId = `country-${elem.education_id}`,
          descriptionId = `description-${elem.education_id}`;
        return (
          <nav>
            <ul key={elem.education_id || index} className="ul-list">
              <li>{elem.year_start}</li>
              <li>{elem.year_end}</li>
              <li>{elem.education_level_id}</li>
              <li>{elem.title_name}</li>
              <li>{elem.university}</li>
              <li>{elem.city}</li>
              <li>{elem.country}</li>
              <li>{elem.description}</li>
            </ul>
          </nav>
        );
      });
    }
    return (
      <div>
        <h1 style={{ color:this.props.cssTitle, fontSize:this.props.sizeTitle  }}>{this.props.titleEducation}</h1>
        <div>{educationShow}</div>
        <div>
          {education_db.map((elem, index) => (
            <ul key={index}>
              <li>{elem.yearStart}</li>
              <li>{elem.yearEnd}</li>
              <li>{elem.educationLevelId}</li>
              <li>{elem.nameTitle}</li>
              <li>{elem.universityEducation}</li>
              <li>{elem.cityEducation}</li>
              <li>{elem.countryEducation}</li>
              <li>{elem.descriptionEducation}</li>
            </ul>
          ))}
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
  )(Education)
);
