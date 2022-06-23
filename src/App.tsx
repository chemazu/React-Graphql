import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";
import Register from "./view/Register";
import { gql, useMutation } from "@apollo/client";

function App() {
  const SIGNUP = gql`
    mutation SIGNUP(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      signup(
        first_name: $firstName
        last_name: $lastName
        email: $email
        password: $password
      ) {
        user {
          first_name
          last_name
          email
        }
      }
    }
  `;

  const [signup, { data, loading, error }] = useMutation(SIGNUP, {
    variables: {
      page: 1,
      email: "me344ewew3rere3@me.com",
      password: "Ratface_12",
      lastName: "me",
      signupEmail2: "me",
      signupPassword2: "Ratface_12",
      name: "me",
      firstName: "me",
    },
  });

  // let handleSignup = async () => {
  //   console.log(await signup());
  // };
  let handleSignup = () => {
    signup().then((res) => {
      console.log(res);
    });
    if (error) console.log("error");
    // console.log(data);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
