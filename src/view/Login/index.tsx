import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useMutation } from "@apollo/client";
import { Context } from "../../context/Context";
import { ContextType } from "../../@types/context.d";
import "./style.scss";
import { LOGIN } from "../../graphql/schema";
export default function Login() {
  let navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const { login: loginData } = React.useContext(Context) as ContextType;
  let {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  } = loginData;
  let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let handleSubmit = (e: any) => {
    e.preventDefault();
    login({
      variables: {
        password: password,
        email: email,
      },
    })
      .then((res: any) => {
        localStorage.setItem("wazoKey", res.data.login.token);
        if (localStorage.getItem("wazoKey")) {
          navigate("/dashboard");
        }
      })
      .then(() => {
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="heading">
          <h2>Login</h2>
          <p>
            If you have no account <Link to="/register">Sign up</Link>
          </p>
        </div>

        <form>
          <div className="form-item">
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Type here"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <p
              className={`prompt ${
                !regexEmail.test(email) && email.length > 0
                  ? "visible"
                  : "hidden"
              }`}
              style={{ padding: "2px 0", fontSize: "80%", color: "red" }}
            >
              Wrong email format!
            </p>
          </div>
          <div className="form-item">
            <p>Password</p>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type your password here"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
              <p
                className="hover"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {" "}
              </p>
            </div>
            <p>&nbsp;</p>
          </div>
          <div className="form-item">
            {regexEmail.test(email) && (
              <Button
                title="Log in"
                className="sec"
                onClick={(e: any) => {
                  handleSubmit(e);
                }}
              />
            )}
            {!regexEmail.test(email) && (
              <Button
                title="Log in"
                className="disabled"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
            )}

            <p>&nbsp;</p>
          </div>
        </form>
      </div>
    </div>
  );
}
