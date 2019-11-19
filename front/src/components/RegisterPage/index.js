import React, { Component } from "react";
import RegisterForm from "./Inscription/index";

import './index.css';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isOpen: false
    };
  }

  handleSubmit = values => {
    console.log("value", values);
    fetch("/api/inscription/new-user", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(values)
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          message: "Votre inscription a bien éte enregitrée.",
          isOpen: !false
        });
      }
      if (res.status === 500) {
        this.setState({
          message: "Nous avons rencontré un problème lors de la sauvegarde.",
          isOpen: !false
        });
      }
    });
  };

  handleClick() {
    this.setState({
      isOpen: false
    });
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="space">
        <div className="container_members">
          {/* {this.state.visible ? : ''
          } */}
          <RegisterForm onSubmit={this.handleSubmit} id="Questionnaire" />
          <div className={this.state.isOpen ? "popup" : " close"}>
            <h1>{this.state.message}</h1>
            <div className="flex-container">
              <button
                type="button"
                className="closewindow"
                onClick={() => this.handleClick()}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmitForm;
