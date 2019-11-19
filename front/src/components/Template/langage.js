import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Langages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageLevel: [],
      languageData: [],
      language_db: [],
      language_id: 0
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/language-level")
        .then(response => response.json())
        .then(data => this.setState({ languageData: data }));
    }
  }
  handleChange = e => {
    if (["language_name", "language_level_id"].includes(e.target.className)) {
      let languageData = [...this.state.languageData];
      languageData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ languageData }, () =>
        console.log(this.state.languageData)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
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
  
  render() {
    let { allDataCV, language_db } = this.props;
    let languageShow = "";
    if (allDataCV !== undefined) {
      languageShow = allDataCV.map((elem, index) => {
        let languageId = `language_name-${elem.language_id}`,
          languageLevelId = `language_level_id-${elem.language_id}`;
        console.log("render", languageId, languageLevelId);
        return (
          <nav>
            <ul key={elem.language_id || index} className="ul-list">
              <li>
                <ul>
                  <li>{elem.language_title_name}</li>
                  <li>{elem.language_name}</li>
                  <li>{elem.language_level_id}</li>
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
          {this.props.titleLanguage}
        </h1>
        <div>{languageShow}</div>
        <div>
          {language_db.map((elem, index) => {
            let languageId = `nameLanguage-${index}`,
              languageLevelId = `languageLevelId-${index}`;
            return (
              <ul key={index} className="ul-list">
                <li className="li-list">{elem.nameLanguage}</li>
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
  connect(mapStateToProps, mapDispatchToProps)(Langages)
);
