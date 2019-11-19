import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      profile_db: [],
      profile_id: 0
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      this.setState({ profileData: this.props.allDataCV });
    }
  }
  handleChangeNewInformation(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange = e => {
    if (["profile"].includes(e.target.className)) {
      let profileData = [...this.state.profileData];
      profileData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ profileData }, () => console.log(this.state.profileData));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleContactId(ev) {
    let joined = this.state.profile_id.concat(ev);
    this.setState({ profile_id: joined });
    console.log(ev, joined, this.state.profile_id);
  }
  render() {
    let { profileData } = this.state;
    let profileShow = "";
    if (profileData !== undefined) {
      profileShow = profileData.map((elem, index) => {
        let profileId = `profile-${elem.user_id}`;
        return (
          <nav>
            <ul key={elem.user_id || index} className="ul-list">
              <li>{elem.profile}</li>
            </ul>
          </nav>
        );
      });
    }
    return (
      <div>
        <h1>Résumé</h1>
        <form onChange={this.handleChange}>
          <div>{profileShow}</div>
          <div>{this.props.profileId}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.idUser.loggedInUser,
    user: state.idUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
