import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import "./style.scss";

export default function Register() {
  let [fName, setFName] = React.useState("");
  let [lName, setLName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [showPassword, setShowPassword] = React.useState(false);
  let [regexChecker, setRegexChecker] = React.useState({});

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexUpper = /^(?=.*[A-Z]).+$/;
  let regexNum = /\d/;
  let regexSym = /^(?=.*[-+_!@#$%^&*., ?]).+$/;
  // let handleRegex = () => {
  //   let regexUpper = /^(?=.*[A-Z]).+$/;
  //   let regexNum = /\d/;
  //   let regexSym = /^(?=.*[-+_!@#$%^&*., ?]).+$/;

  //   if (regexUpper.test(password)) {
  //     setRegexChecker({ ...regexChecker, upper: true });
  //   }
  //   if (regexSym.test(password)) {
  //     setRegexChecker({ ...regexChecker, sym: true });
  //   }
  //   if (regexNum.test(password)) {
  //     setRegexChecker({ ...regexChecker, num: true });
  //   }
  //   //  return regexChecker;
  // };
  // let pattern = new RegExp(regexUppercase);
  let handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(fName, lName, email, password);
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
                  <>
                    {regexUpper.test(password) && (
                      <li className="check">
                        Contains at least one uppercase letter
                      </li>
                    )}
                    {!regexUpper.test(password) && (
                      <li>Contains at least one uppercase letter</li>
                    )}
                  </>
                  <>
                    {password.length > 7 && (
                      <li className="check">Contains eight characters</li>
                    )}
                    {password.length < 8 && <li>Contains eight characters</li>}
                  </>
                  <>
                    {regexNum.test(password) && (
                      <li className="check">Contains at least one number</li>
                    )}
                    {!regexNum.test(password) && (
                      <li>Contains at least one number</li>
                    )}
                  </>
                  <>
                    {regexSym.test(password) && (
                      <li className="check">Contains at least one symbol</li>
                    )}
                    {!regexSym.test(password) && (
                      <li>Contains at least one symbol</li>
                    )}
                  </>
                </ul>
                {/* {regexNum.test(password) && <p className="check">dfd</p>}
                {!regexNum.test(password) && <p>dfd</p>}

                <p className="check">Contains at least one uppercase letter</p>
                <p>Contains eight characters</p>
                <p>Contains at least one number</p>
                <p>Contains at least one symbol</p> */}
              </div>
            )}
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
