import React, { Component } from "react";
import Navbar from '../Navbar/index';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from '../../container/index';
import { skillLevel  } from "../../actions/index";
import { educationLevel } from "../../actions/index";
import { languageLevel } from "../../actions/index";

class Home extends Component {

componentDidMount() {
    if (this.props.logged === true ) {
      this.props.skillLevel();
      this.props.educationLevel();
      this.props.languageLevel();
    } 
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="home_text">
          <h1>
            Bienvenue dans Caneva. Un site qui t'aide à trouver ton modèle de
            curriculum vitae idéal.
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ skillLevel, educationLevel, languageLevel }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
