import React from "react";
import "./Styles.css"; 
import {register} from './userfunctions';
import { Link } from "react-router-dom";
import InfoSection from "./InfoSection"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux'; 


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      country: "",
      region: "",
      date_of_birth: "",
      gender: "",
      formErrors: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
      },
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(event) {
    const { name, value } = event.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "first_name":
        formErrors.first_name = value.length < 3 ? "minimum 3 characters" : "";
        break;

      case "last_name":
        formErrors.last_name = value.length < 3 ? "minimum 3 characters" : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "password":
        formErrors.password =
          value.length < 6 ? "Password should be at least 6 characaters" : "";
        break;

      default:
    }

    this.setState({ formErrors, [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const newuser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      country: this.state.country,
      date_of_birth: this.state.date_of_birth,
      region: this.state.region,
    };

    register(newuser).then(({ data }) => {
      if (!data.error) { 
        toast("You have successfully signed up");
        window.location = "/login";
      }

      console.log(data.error);
    });

  }

  render() {
    const {
      formErrors,
      first_name,
      last_name,
      email,
      password,
      country,
      region,
      date_of_birth,
      gender,
    } = this.state;

    return (
      <main>
        <div className="inner-container">
          <InfoSection />
          <div className="form-section">
            <div className="header"></div>
            <form onSubmit={this.handleSubmit} className="formbox signup">
              <h2 className="form-title">SIGN UP FORM</h2>
              <div className="wrapper">
                <div className="input-group">
                  <input
                    type="text"
                    name="first_name"
                    onChange={this.handleOnChange}
                    value={first_name}
                    required
                    className="login-input"
                    id="first_name"
                  />
                  <label
                    className={first_name.length > 0 ? "static" : ""}
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <span className="ion-ios-person icon"></span>
                  {formErrors.first_name.length > 0 && (
                    <div error={formErrors.first_name} className="errorMessage">
                      !
                    </div>
                  )}
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="last_name"
                    onChange={this.handleOnChange}
                    value={last_name}
                    required
                    className="login-input"
                    id="last_name"
                  />
                  <label
                    className={last_name.length > 0 ? "static" : ""}
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <span className="ion-ios-person icon"></span>
                  {formErrors.last_name.length > 0 && (
                    <div error={formErrors.last_name} className="errorMessage">
                      !
                    </div>
                  )}
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    onChange={this.handleOnChange}
                    value={email}
                    name="email"
                    className="login-input"
                    id="email"
                  />
                  <label
                    className={email.length > 0 ? "static" : ""}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <span className="ion-ios-email icon"></span>
                  {formErrors.email.length > 0 && (
                    <div error={formErrors.email} className="errorMessage">
                      !
                    </div>
                  )}
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    onChange={this.handleOnChange}
                    value={password}
                    name="password"
                    className="login-input"
                    id="password"
                  />
                  <label
                    className={password.length > 0 ? "static" : ""}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <span className="ion-ios-locked icon"></span>
                  {formErrors.password.length > 0 && (
                    <div error={formErrors.password} className="errorMessage">
                      !
                    </div>
                  )}
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="gender" 
                    onChange={this.handleOnChange}
                    value={gender}
                    className="login-input"
                    id="gender"
                  />
                  <label
                    className={gender.length > 0 ? "static" : ""}
                    htmlFor="gender"
                  >
                    Gender(Male or Female)
                  </label>
                  <span className="ion-transgender icon"></span>
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="country"
                    onChange={this.handleOnChange}
                    value={country}
                    className="login-input"
                    id="country"
                  />
                  <label
                    className={country.length > 0 ? "static" : ""}
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <span className="ion-ios-world icon"></span>
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="date"
                    name="date_of_birth"
                    onChange={this.handleOnChange}
                    value={date_of_birth}
                    className="login-input"
                    id="dob"
                  />
                  <label className="static" htmlFor="dob">
                    Date of Birth
                  </label>
                  <span className="ion-ios-calendar icon"></span>
                  <div className="underline"></div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="region"
                    onChange={this.handleOnChange}
                    value={region}
                    className="login-input"
                    id="state"
                  />
                  <label
                    className={region.length > 0 ? "static" : ""}
                    htmlFor="state"
                  >
                    State or Region
                  </label>
                  <span className="ion-ios-location icon"></span>
                  <div className="underline"></div>
                </div>

                <div className="button-group">
                  <button type="submit" className="submit">
                    Sign Up
                  </button> 
                  <ToastContainer/>
                </div>
                <Link className="redirect-link" to="/login">
                  Already Have an Account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default SignUp ;
