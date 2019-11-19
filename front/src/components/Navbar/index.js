import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeIdUser } from "../../actions/logout.actions";
import { removeSkillLevel, removeLanguageLevel, removeEducationLevel  } from '../../actions/index';

class Navbar extends Component {
  handleClick() {
    this.props.removeIdUser();
    this.props.removeSkillLevel();
    this.props.removeLanguageLevel();
    this.props.removeEducationLevel();
  }
  render() {
    return (
      <div id="myTopnav" className="navbar-container topnav">
        <nav>
          {this.props.logged ? (
            <ul className="navbar__list">
              <li className="navbar__list__item">
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="navbar__list__item">
                <NavLink to="/my-account">Mon compte</NavLink>
              </li>
              <li className="navbar__list__item">
                <NavLink to="/template-curriculum-vitae">Templates CV</NavLink>
              </li>
              <li className="navbar__list__item">
                <input type="button" onClick={() => this.handleClick()} />
              </li>
            </ul>
          ) : (
            <ul className="navbar__list">
              <li className="navbar__list__item">
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="navbar__list__item">
                <NavLink to="/register">S'inscrire</NavLink>
              </li>
              <li className="navbar__list__item">
                <NavLink to="/login">S'identifier</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeIdUser, removeSkillLevel, removeLanguageLevel, removeEducationLevel }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
