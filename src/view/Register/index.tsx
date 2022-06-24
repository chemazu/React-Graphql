import React from "react";
import { SIGNUP } from "../../graphql/schema";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useMutation } from "@apollo/client";
import { Context } from "../../context/Context";
import { ContextType } from "../../@types/context.d";
import "./style.scss";

export default function Register() {
  const { register } = React.useContext(Context) as ContextType;
  let {
    fName,
    setFName,
    lName,
    setLName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  } = register;
  let navigate = useNavigate();
  let regexFinal =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])(?=.*[\d]).+$/;
  let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexUpper = /^(?=.*[A-Z]).+$/;
  let regexNum = /\d/;
  let regexSym = /^(?=.*[-+_!@#$%^&*., ?]).+$/;
  const [signup, {  loading, error }] = useMutation(SIGNUP);
  let handleSubmit = (e: any) => {
    e.preventDefault();
    signup({
      variables: {
        password: password,
        email: email,
        firstName: fName,
        lastName: lName,
      },
    }).then((res: any) => {
      localStorage.setItem("wazoKey", "");
      localStorage.setItem("wazoKey", res.data.signup.token);
      if (localStorage.getItem("wazoKey")) {
        navigate("/dashboard");
      }
    });
    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="heading">
          <h2>Create an Account</h2>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <form>
          <div className="form-row">
            <div className="form-item">
              <p>First Name</p>
              <input
                type="text"
                placeholder="Type here"
                value={fName}
                onChange={(e: any) => {
                  setFName(e.target.value);
                }}
              />
            </div>
            <div className="form-item">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Type here"
                value={lName}
                onChange={(e: any) => {
                  setLName(e.target.value);
                }}
              />
            </div>
          </div>
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
            {password.length > 0 && (
              <div className="password-validation">
                <ul>
                  <li className={`${regexUpper.test(password) ? "check" : ""}`}>
                    Contains at least one uppercase letter
                  </li>
                  <li className={`${password.length > 7 ? "check" : ""}`}>
                    Contains eight characters
                  </li>
                  <li className={`${regexNum.test(password) ? "check" : ""}`}>
                    Contains at least one number
                  </li>
                  <li className={`${regexSym.test(password) ? "check" : ""}`}>
                    Contains at least one symbol
                  </li>
                </ul>
              </div>
            )}
            <p>&nbsp;</p>
          </div>
          <div className="form-item">
            {loading && <p>Loading.....</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            {(!regexEmail.test(email) ||
              !regexFinal.test(password) ||
              password.length < 8 ||
              fName.length < 1 ||
              lName.length < 1) && (
              <Button
                title="Register"
                className="disabled"
                onClick={(e: any) => {
                  e.preventDefault();
                }}
              />
            )}
            {regexEmail.test(email) &&
              regexFinal.test(password) &&
              password.length > 7 &&
              fName.length > 1 &&
              lName.length > 1 && (
                <Button
                  title="Register"
                  className="sec"
                  onClick={(e: any) => {
                    handleSubmit(e);
                  }}
                />
              )}
          </div>
        </form>
      </div>
    </div>
  );
}
