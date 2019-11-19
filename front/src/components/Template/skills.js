import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillLevel: [],
      skillData: [],
      skill_db: [],
      skill_id: 0
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/skill-level")
        .then(response => response.json())
        .then(data => this.setState({ skillLevel: data }));
    }
  }
  handleChange = e => {
    if (["skill_name", "skill_level_id"].includes(e.target.className)) {
      let skillData = [...this.state.skillData];
      skillData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ skillData }, () => console.log(this.state.skillData));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleSkillId(ev) {
    let joined = this.state.skill_id.concat(ev);
    this.setState({ skill_id: joined });
    console.log(ev, joined, this.state.skill_id);
  }
  addNew() {
    this.setState(prevState => ({
      skill_db: [...prevState.skill_db, { nameSkill: "", skillLevelId: "" }]
    }));
  }

  deleteSkillDb(index) {
    this.state.skill_db.splice(index, 1);
    this.setState({ skill_db: this.state.skill_db });
  }

  render() {
    let { allDataCV, skill_db } = this.props;
    let skillShow = "";
    if (allDataCV !== undefined) {
      skillShow = allDataCV.map((elem, index) => {
        let skillId = `skill_name-${elem.skill_id}`,
          skillLevelId = `skill_level_id-${elem.skill_id}`;
        console.log("render", skillId, skillLevelId);
        return (
          <nav>
            <ul key={elem.skill_id || index} className="ul-list">
              <li>
                <ul>
                  <li>{elem.skill_title_name}</li>
                  <li>{elem.skill_name}</li>
                  <li>{elem.skill_level_id}</li>
                </ul>
              </li>
            </ul>
          </nav>
        );
      });
    }
    return (
      <div>
        <h1
          style={{ color: this.props.cssTitle, fontSize: this.props.sizeTitle }}
        >
          {this.props.titleSkill}
        </h1>
        <div>{skillShow}</div>
        <div>
          {" "}
          {skill_db.map((elem, index) => {
            let skillId = `nameSkill-${index}`,
              skillLevelId = `skillLevelId-${index}`;
            return (
              <ul key={index} className="ul-list">
                <li className="li-list">{elem.nameSkill}</li>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skills));
