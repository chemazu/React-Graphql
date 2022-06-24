import React from "react";
import { ContextType } from "../@types/context.d";

export const Context = React.createContext<ContextType | null>(null);

export default function Provider({ children }: { children: React.ReactNode }) {
  let [fName, setFName] = React.useState("");
  let [lName, setLName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [showPassword, setShowPassword] = React.useState(false);
  let [loginBtn, setLoginBtn] = React.useState(false);
  let [note, setNote] = React.useState({ noteName: "", noteDescription: "" });
  let [showCreate, setShowCreate] = React.useState(false);
  let [showEdit, setShowEdit] = React.useState({ status: false, uuid: "" });
  let [confirmVerified, setConfirmVerified] = React.useState(false);
  let register = {
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
  };
  let login = {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  };
  let dashboard = {
    loginBtn,
    setLoginBtn,
    note,
    setNote,
    showCreate,
    setShowCreate,
    showEdit,
    setShowEdit,
    confirmVerified,
    setConfirmVerified,
  };

  const value = { register, login,dashboard };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
