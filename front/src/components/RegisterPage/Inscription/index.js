import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../../../container/simple_form";
import validate from "../Validation";

import "../index.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  showMyPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} id="Questionnaire">
        <div className="container-formulaire">
          <h2 className="title-h2 titre-section">Caneva</h2>
          <div className="bowtie">
            <span className="node" />
          </div>
          <div className="description">
            <p className="text form">Préparons ton curriculum vitae</p>
          </div>
        </div>
        <div className="formulary">
          <label htmlFor="">
            <ul className="fields">
              <li>
                <p className="typo">Prénom</p>
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="firstname"
                  label="first_name"
                  placeholder="Prénom"
                  className="field1"
                />
              </li>
              <li>
                <p className="typo">Nom</p>
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="lastname"
                  label="last_name"
                  placeholder="Nom"
                  className="field1"
                />
              </li>
            </ul>
            <ul className="fields">
              <li>
                <p className="typo">E-mail</p>
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="email"
                  label="email"
                  placeholder="E-mail"
                  className="field1"
                  value
                />
              </li>
            </ul>
            <ul className="fields">
              <li>
                <p className="typo">Password</p>
              </li>
              <li>
                <Field
                  component={renderField}
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  label="password"
                  id="password"
                  placeholder="8 caractères minimum"
                  className="field1"
                />
                <Field
                  component={renderField}
                  type="checkbox"
                  name="togglePassword"
                  defaultChecked={this.state.showPassword}
                  onChange={this.showMyPassword}
                />
              </li>
            </ul>
          </label>
        </div>
        <div className="button--inscription">
          <button type="submit" value="soumettre" className="styleButton">
            <span className="styleText">JE VALIDE</span>
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simple',
  validate,
})(RegisterForm);
