import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveIdUser } from "../../actions/index";
import { getCv } from "../../actions/index";

import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      isValide: true,
      isSubmited: false,
      nextRoute: "/",
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `/api/user/login`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.saveIdUser(data.id);
        this.setState({
          isValide: data.isValide,
          isSubmited: data.isValide
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isSubmited !== prevState.isSubmited &&
      this.state.isValide === true
    ) {
      console.log(
        this.state.isSubmited !== prevState.isSubmited &&
          this.state.isValide === true
      );
      this.props.history.push(this.state.nextRoute);
    }
  }

  render() {
    return (
      <div>
        <div className="login_container">
          <div className="login_background_container" />
          <div className="login_form_container">
            <form
              className="login_form"
              onSubmit={event => this.handleSubmit(event)}
            >
              <div className="">
                <label htmlFor="username">E-mail</label>
                <input
                  type="text"
                  id="standard-name"
                  label="email"
                  name="email"
                  style={{ width: 300 }}
                  value={this.state.email}
                  onChange={ev => this.handleChange(ev)}
                  margin="normal"
                />
              </div>

              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  id="adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={ev => this.handleChange(ev)}
                  name="password"
                  style={{ width: 300 }}
                />
                <input
                  type="checkbox"
                  name="togglePassword"
                  defaultChecked={this.state.showPassword}
                  onChange={this.handleClickShowPassword}
                />
                <div className="login_errormsg login_margin_auto">
                  {!this.state.isValide && !this.state.isSubmited && (
                    <h3>Bad login or Password</h3>
                  )}
                </div>
              </div>

              <div className="login_bouton_container login_margin_auto">
                <button type="submit">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ saveIdUser, getCv }, dispatch);
};

const mapStateToProps = state => ({
  isLoggedAdmin: state.idUser.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
