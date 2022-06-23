import React from "react";
import Button from "../../components/Button";
import "./style.scss";
import create from "../../resources/create.svg";
import greenCheck from "../../resources/green-check.svg";
import caretRight from "../../resources/caret-right.svg";
import { GETME, GETITEMS, VERIFYME } from "../../graphql/schema";
import { useMutation, useQuery } from "@apollo/client";

type Props = {};

export default function Dashboard({}: Props) {
  const { loading, error, data } = useQuery(GETME);
  const {
    loading: itemsLoading,
    error: itemsError,
    data: itemsData,
  } = useQuery(GETITEMS);
  const [
    verifyme,
    { loading: verifyLoading, error: verifyError, data: verifyData },
  ] = useMutation(VERIFYME);
  let handleVerification = () => {
    setConfirmVerified(true);
    verifyme({ variables: { token: data.getMe.email_verification_token } });
  };
  // const [
  //   verifyme,
  //   { loading: verifyLoading, error: verifyError, data: verifyData },
  // ] = useMutation(GETITEMS);
  // let handleVerification = (e: any) => {
  //   e.preventDefault();
  //   // verifyme({ variables: { token: data.getMe.email_verification_token } });
  // };
  let [loginBtn, setLoginBtn] = React.useState(false);
  let [showCreate, setShowCreate] = React.useState(false);
  let [showVerified, setShowVerified] = React.useState(false);
  let [confirmVerified, setConfirmVerified] = React.useState(false);

  return (
    <div className="dashboard">
      <div className="upper">
        {!loading && !data.getMe.email_verified_at && (
          <div className="verified">
            <p>
              You have not verified your email address. Click{" "}
              <span
                className="verify-link"
                onClick={() => {
                  handleVerification();
                }}
              >
                here
              </span>{" "}
              to resend verification link.
            </p>
          </div>
        )}

        <div className="header">
          <h2>Dashboard</h2>
          <div className="username-wrapper">
            <p
              style={{ display: "inline" }}
              onClick={() => {
                setLoginBtn(!loginBtn);
              }}
              className="hover"
            >
              {loading && "User"}
              {!loading && `${data.getMe.first_name}  ${data.getMe.last_name}`}
            </p>
            <span style={{ fontSize: "80%", padding: "0 5px" }}>&#9660;</span>
            {loginBtn && <p className="login-button"> Log Out</p>}
          </div>
        </div>
      </div>

      <div className="card-wrapper">
        {itemsLoading && <p>Loading...</p>}
        {!itemsLoading &&
          itemsData.getItems.items.map((item: any, index: number) => {
            return <DashCard item={item} key={index} />;
          })}
      </div>
      {showCreate && (
        <div className="create-wrapper">
          <div className="create-card">
            <p className="heading">Create Item</p>
            <div className="card-item">
              <p>Name</p>
              <input placeholder="Input item name here" />
            </div>
            <div className="card-item">
              <p>Add Note</p>
              {/* <input type="textarea"placeholder="Input item name here" />
               */}
              <textarea
                id="w3review"
                name="w3review"
                rows={5}
                cols={50}
                placeholder="Type Here"
              ></textarea>
            </div>
            <div className="button-wrapper">
              <Button
                className="pry"
                title="Cancel"
                onClick={() => {
                  setShowCreate(!showCreate);
                }}
              />
              <Button className="sec" title="Create Event" />
            </div>
          </div>
        </div>
      )}
      {confirmVerified && (
        <div className="confirm-verified-wrapper">
          <div className="confirm-verified">
            <img src={greenCheck} alt="green check" />
            <p className="first">Your email address has been verified.</p>
            <div
              className="second-container"
              onClick={() => {
                setConfirmVerified(false);
              }}
            >
              <p className="second">Go to Dashboard</p>
              <img src={caretRight} alt="caret-right" />
            </div>
          </div>
        </div>
      )}
      <div className="bottom-bar">
        <img
          src={create}
          alt=""
          onClick={() => {
            setShowCreate(!showCreate);
          }}
        />
      </div>
    </div>
  );
}
const DashCard = ({ item }: { item: { name: string; content: string } }) => {
  let { name, content } = item;
  return (
    <div className="dash-card">
      <div className="head">
        <p className="one">Name</p>
        <p className="two">{name}</p>
      </div>
      <div className="content">
        <p className="one">Description</p>
        <p className="two">{content}</p>
      </div>
      <div className="button-wrapper">
        <Button className="pry" title="Edit" />
        <Button className="sec" title="Delete" />
      </div>
    </div>
  );
};
