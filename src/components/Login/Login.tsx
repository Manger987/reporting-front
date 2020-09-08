import React from "react";
import { connect } from "react-redux";
import { setUserAction } from "./../../store/actions";
import { login } from './../../services/authService';
import "./styles.css";

type MyProps = { setUserDispatch: any, history: any };
type MyState = { username: string; password: string;[key: string]: any };
class Login extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  AuthLogin = async (event: any) => {
    event.preventDefault();
    const loginData = await login(this.state.username, this.state.password);
    if (loginData.code === 200) {
      this.props.setUserDispatch(loginData.data);
      this.props.history.push("/reports");
    } else {
      console.log("Login::", loginData.message);
    }
  };
  updateInputValue = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src={require("./../../public/img/logo-fen-blue.svg")}
              id="icon"
              alt="User Icon"
            />
          </div>
          <div>
            <form>
              <input
                type="text"
                id="username"
                className="fadeIn second"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.updateInputValue}
              />
              <input
                type="text"
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="password"
                value={this.state.password}
                onChange={this.updateInputValue}
              />
              <input
                type="button"
                className="fadeIn fourth"
                onClick={this.AuthLogin}
                value="Ingresar"
              />
            </form>
          </div>
          <div id="formFooter">
            <a className="underlineHover" href="/#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToPropsActions = (dispatch: any) => ({
  setUserDispatch: (value: any) => dispatch(setUserAction(value)), //login.data
});

export default connect(null, mapDispatchToPropsActions)(Login);
