import React,{Component} from "react";
import "../Styles.css";
import { Link } from "react-router-dom";
import InfoSection from "../InfoSection";   
import { connect } from "react-redux";
import axios from 'axios';  
import { toast } from "react-toastify";
import { newPassword } from "../userfunctions";
 
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class NewPassword extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      password1: "", 
      password2: "",
      errorMessage: "",

      formErrors: {
        password1: "", 
        password2: ""
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
  }

  handleOnchange(event) {
    event.preventDefault();

    const { name, value } = event.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "password1":
       formErrors.password1 = value.length < 8 ? "minimum 8 characaters required" : "";
       break; 
    
      case "password2": 
      formErrors.password2 = value.length < 8 ? "minimum 8 characaters required" : "";
      break;

      default:
    }

    this.setState({ formErrors, [name]: value });
  }

  async handleSubmit(event) { 

    event.preventDefault();
    
    const {token} = this.props.match.params;

    const details = { 
      password1: this.state.password1,
      password2: this.state.password2,  
      token: token
    }   

     // check if confirm passwords match
    const password = this.state.password1; 
    const password2 = this.state.password2; 
    
    if(password !== password2) { 
     this.setState({ errorMessage: "Passwords do not match!" });
     setTimeout(() => this.setState({ errorMessage: "" }), 3050); 
     return null;
    }

    const response = await newPassword(details); 

    if (response.data.error) {
      this.setState({ errorMessage: response.data.error });
      setTimeout(() => this.setState({ errorMessage: "" }), 3000);
      return null;
    } else { 
        toast("Password updated successfully!");
        window.location = "/"; 
    } 
     
  }

  render() {
    const { formErrors, password2, password1, errorMessage } = this.state; 


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
              <h2 className="form-title">Change Password</h2>

              <div className={`error-display ${!errorMessage ? "hidden" : ""}`}>
                <p>{errorMessage}</p>
              </div> 

              <div className="input-group">
                <input
                  type="text"
                  className={formErrors.password1.length > 0 ? "error" : null}
                  name="email"
                  onChange={this.handleOnchange}
                  value={this.state.password1}
                  required
                  id="email"
                />
                <label
                  className={password1.length > 0 ? "static" : ""}
                  htmlFor="email"
                >
                  Enter new Password
                </label>
                <span className="ion-ios-email icon"></span>

                {formErrors.email.length > 0 && (
                  <div error={formErrors.password1} className="errorMessage">
                    !
                  </div>
                )}
                <div className="underline"></div>
              </div> 

              <div className="input-group">
                <input
                  type="text"
                  className={formErrors.password2.length > 0 ? "error" : null}
                  name="email"
                  onChange={this.handleOnchange}
                  value={this.state.password2}
                  required
                  id="email"
                />
                <label
                  className={password2.length > 0 ? "static" : ""}
                  htmlFor="email"
                >
                  Confirm Password
                </label>
                <span className="ion-ios-email icon"></span>

                {formErrors.password2.length > 0 && (
                  <div error={formErrors.password2} className="errorMessage">
                    !
                  </div>
                )}
                <div className="underline"></div>
              </div>

              <div className="button-group">
                <button type="submit" className="submit">
                  Submit
                </button>
              </div>
              <Link to="/login">
                {" "}
                <span className="redirect-link">
                  {" "}
                  Go Back{" "}
                </span>{" "}
              </Link> 
               <br/>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(null, {})(NewPassword);

