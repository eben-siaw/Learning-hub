import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import InfoSection from "./InfoSection";  
import { login } from "./userfunctions"; 
import {setLoggedIn} from '../actions/index'; 
import { connect } from "react-redux";
  
 
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",

      formErrors: {
        email: "",
        password: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
  }

  componentWillMount() {
  if (localStorage.getItem("usertoken")) window.location = "/dashboard";
  }

  handleOnchange(event) {
    event.preventDefault();

    const { name, value } = event.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "password":
        formErrors.password = value.length < 6 ? "minimum 6 characaters" : "";
        break;

      default:
    }

    this.setState({ formErrors, [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }; 

    const result = await login(user);

    if (result.error) {
      this.setState({ errorMessage: result.error });
      setTimeout(() => this.setState({ errorMessage: "" }), 3000);
      return;
    } 
     this.props.setLoggedIn(true)
    window.location = "/dashboard";
   
  }

  render() {
    const { formErrors, email, password, errorMessage } = this.state; 


    return (
      <main>
        <div className="inner-container">
          <InfoSection isLogin={true} />
          <div className="form-section">
            <form onSubmit={this.handleSubmit} className="formbox">
              {/* <div style={{ textAlign: "center" }}>
                <img
                  src="/img/nileeLogo.png"
                  width="150px"
                  style={{ margin: "0 auto" }}
                  alt="nileeLogo"
                />
              </div> */}
              <h2 className="form-title">LOGIN FORM</h2>

              <div className={`error-display ${!errorMessage ? "hidden" : ""}`}>
                <p>{errorMessage}</p>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className={formErrors.email.length > 0 ? "error" : null}
                  name="email"
                  onChange={this.handleOnchange}
                  value={this.state.email}
                  required
                  id="email"
                />
                <label
                  className={email.length > 0 ? "static" : ""}
                  htmlFor="email"
                >
                  Emails
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
                  name="password"
                  onChange={this.handleOnchange}
                  value={this.state.password}
                  className="login-input"
                  required
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
              <div className="button-group">
                <button type="submit" className="submit">
                  Login
                </button>
              </div>
              <Link to="/register">
                {" "}
                <span className="redirect-link">
                  {" "}
                  Not an Edunal member? Register{" "}
                </span>{" "}
              </Link>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(null,{setLoggedIn})(Login);
