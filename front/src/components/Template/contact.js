import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
      contact_db: [],
      contact_id: 0
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      this.setState({ contactData: this.props.allDataCV });
    }
  }
  handleChangeNewInformation(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange = e => {
    if (
      [
        "birthdate",
        "linkedin",
        "email",
        "nationality",
        "phone",
        "address",
        "zip_code",
        "municipality",
        "city",
        "country",
        "driving_license"
      ].includes(e.target.className)
    ) {
      let contactData = [...this.state.contactData];
      contactData[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ contactData }, () => console.log(this.state.contactData));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleContactId(ev) {
    let joined = this.state.contact_id.concat(ev);
    this.setState({ contact_id: joined });
    console.log(ev, joined, this.state.contact_id);
  }
  render() {
    let { contactData, contact_db } = this.state;
    let contactShow = "";
    if (contactData !== undefined) {
      contactShow = contactData.map((elem, index) => {
        let birthdateId = `birthdate-${elem.user_id}`,
          nationalityId = `nationality-${elem.user_id}`,
          linkedinId = `linkedin-${elem.user_id}`,
          emailId = `email-${elem.user_id}`,
          phoneId = `phone-${elem.user_id}`,
          addressId = `address-${elem.user_id}`,
          zipCodeId = `zip_code-${elem.user_id}`,
          municipalityId = `municipality-${elem.user_id}`,
          cityId = `city-${elem.user_id}`,
          countryId = `country-${elem.user_id}`,
          drivingLicenseId = `driving_license-${elem.user_id}`;
        return (
          <nav>
            <ul key={elem.user_id || index} className="ul-list">
              <li>{elem.phone}</li>
              <li>{elem.email}</li>
              <li>{elem.linkedin}</li>
              <li>{elem.birthdate}</li>
              <li>{elem.nationality}</li>
              <li>
                {elem.city} {elem.country}
              </li>
              <li>{elem.driving_license}</li>
            </ul>
          </nav>
        );
      });
    }
    return (
      <div>
        <h1>Contact</h1>
          <div>{contactShow}</div>
          <nav>
          <ul>
            <li>{this.props.phoneId} </li>
            <li>{this.props.e_mail}</li>
            <li>{this.props.linkedIn}</li>
            <li>{this.props.birthdateId}</li>
            <li>{this.props.nationalityContact}</li>
            <li>{this.props.cityContact}</li>
            <li>{this.props.countryContact} </li>
            <li>{this.props.drivingLicenseContact}</li>
          </ul> 
          </nav>
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
  )(Contact)
);
