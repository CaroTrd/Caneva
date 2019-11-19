import React, { Component } from "react";
import CvForm from "./CvForm";


class SubmitCv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isOpen: false
    };
  }

  handleSubmit = values => {
    console.log("value", values);
    let array = Object.keys(values);
    let obj = array.toString();
    console.log("obj", obj)
    let arrayName = obj.split(",", 6);
    console.log("arrayName ", arrayName )
    arrayName.forEach(function(item) {
      if (item === "skills") {
        fetch("/api/curriculum/add-skills", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(values.skills)
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
      }
      if (item === "languages") {
        fetch("/api/curriculum/add-languages", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(values.languages)
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
      }
      if (item === "work_experience") {
        fetch("/api/curriculum/add-work-experience", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(values.work_experience)
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
      }
      if (item === "education") {
        fetch("/api/curriculum/add-education", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(values.education)
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
      }
    })
  };

  handleClick() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div className="space">
        <div className="container_members">
          {/* {this.state.visible ? : ''
          } */}
          <CvForm onSubmit={this.handleSubmit} id="Questionnaire" />
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

export default SubmitCv;
