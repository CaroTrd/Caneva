import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeIdUser } from "../../actions/logout.actions";

class MyAccount extends Component {
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push('/login')
    } 
  }
  handleDelete = () => {
    fetch("/api/delete/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user_id:this.props.detailUser.user_id})
    })
    this.props.removeIdUser();
    this.props.history.push('/')
  }
  render() {
    const { detailUser } = this.props;
    return (
      <div>
        <ul>
          <li>{this.props.logged ? detailUser.first_name : ""}</li>
          <li>{this.props.logged ? detailUser.last_name : ""}</li>
          <li>{this.props.logged ? detailUser.birthdate : ""}</li>
          <li>{this.props.logged ? detailUser.linkedin : ""}</li>
          <li>{this.props.logged ? detailUser.email : ""}</li>
          <li>{this.props.logged ? detailUser.phone : ""}</li>
          <li>{this.props.logged ? detailUser.address : ""}</li>
          <li>{this.props.logged ? detailUser.zip_code : ""}</li>
          <li>{this.props.logged ? detailUser.municipality : ""}</li>
          <li>{this.props.logged ? detailUser.city : ""}</li>
          <li>{this.props.logged ? detailUser.country : ""}</li>
        </ul>
        <div>
          <button onClick={this.handleDelete}>Supprimer mon compte</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser,
  detailUser: state.idUser.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeIdUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);
