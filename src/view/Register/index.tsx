import React from "react";
import { SIGNUP } from "../../graphql/schema";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useMutation } from "@apollo/client";
import "./style.scss";

export default function Register() {
  let [fName, setFName] = React.useState("");
  let [lName, setLName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [showPassword, setShowPassword] = React.useState(false);
  let navigate = useNavigate();
  let regexFinal =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])(?=.*[\d]).+$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexUpper = /^(?=.*[A-Z]).+$/;
  let regexNum = /\d/;
  let regexSym = /^(?=.*[-+_!@#$%^&*., ?]).+$/;
  // const SIGNUP = gql`
  //   mutation SIGNUP(
  //     $firstName: String!
  //     $lastName: String!
  //     $email: String!
  //     $password: String!
  //   ) {
  //     signup(
  //       first_name: $firstName
  //       last_name: $lastName
  //       email: $email
  //       password: $password
  //     ) {
  //       token
  //       user {
  //         email_verification_token
  //         email_verified_at
  //         email
  //         last_name
  //         first_name
  //         uuid
  //         _id
  //         created_at
  //         updated_at
  //       }
  //     }
  //   }
  // `;

  const [signup, { data, loading, error }] = useMutation(SIGNUP);
  let handleSubmit = (e: any) => {
    e.preentDefault();
    console.log(fName, lName, email, password);
    signup({
      variables: {
        password: password,
        email: email,
        firstName: fName,
        lastName: lName,
      },
    }).then((res: any) => {
      localStorage.setItem("wazoKey", res.data.signup.token);
      if (localStorage.getItem("wazoKey")) {
        navigate("/dashboard");
      }
    });
    console.log(error, data, loading);
    if (!loading) {
      console.log(data);
      console.log(data);
      console.log("redirect");
    }
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

            <p>&nbsp;</p>
          </div>
        </form>
      </div>
    </div>
  );
}
