import React,{Component} from "react";
import "../Styles.css";
import { Link } from "react-router-dom";
import InfoSection from "../InfoSection";   
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../userfunctions";
 
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class ResetPassword extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMessage: "",

      formErrors: {
        email: "",
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
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      default:
    }

    this.setState({ formErrors, [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email
    }; 

   const response = await reset(user); 

    if (response.error) {
      this.setState({ errorMessage: response.error });
      setTimeout(() => this.setState({ errorMessage: "" }), 3000);
      return null;
    } else { 
        toast("A link has been sent to your email");
        window.location = "/"; 
    } 
     
  }

  render() {
    const { formErrors, email, errorMessage } = this.state; 


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
              <h2 className="form-title">Password Reset</h2>

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
                  Enter your Email
                </label>
                <span className="ion-ios-email icon"></span>

                {formErrors.email.length > 0 && (
                  <div error={formErrors.email} className="errorMessage">
                    !
                  </div>
                )}
                <div className="underline"></div>
              </div>

              <div className="button-group">
                <button type="submit" className="submit">
                  Reset Password
                </button>
              </div>
              <Link to="/register">
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

export default connect(null, {})(ResetPassword);

