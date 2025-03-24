import { Component } from "react";
import { Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

// ✅ Define withRouter inside the same file
const withRouter = Component => props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  return <Component {...props} navigate={navigate} location={location} params={params} />;
};

class Login extends Component {
  state = { username: "", password: "", errorMsg: "", errorOcurred: false };

  onChangeUserName = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = jwtToken => {
    Cookies.set("jwt_token", jwtToken, { expires: 1 });
    this.props.navigate("/"); // ✅ Use navigate from props
  };

  onSubmitFail = err => {
    this.setState({ errorMsg: err, errorOcurred: true });
  };

  onSubmitForm = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "http://localhost:5000/login";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      this.onSubmitSuccess(data.token);
    } else {
      this.onSubmitFail(data.message || "Invalid credentials");
    }
  };

  render() {
    const { username, password, errorOcurred, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="form-logo-container">
            <h1 className="logo">Syncthreads</h1>
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={this.onChangeUserName}
            placeholder="username"
            id="username"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={this.onChangePassword}
            placeholder="password"
            id="password"
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Login
          </button>
          {errorOcurred && <p className="err">{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(Login); 
