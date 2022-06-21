import React from "react";
import Button from "../../components/Button";
import "./style.scss";
import create from "../../resources/create.svg";

type Props = {};

export default function Dashboard({}: Props) {
  let desArr = [
    {
      name: "Item 1",
      content:
        "    Amet minim mollit non deserunt ullamco est sit aliqua dolor doamet sint. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Item 1",
      content:
        "    Amet minim mollit non deserunt ullamco est sit aliqua dolor doamet sint. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Item 1",
      content:
        "    Amet minim mollit non deserunt ullamco est sit aliqua dolor doamet sint. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet.",
    },
  ];
  let user = "name";
  // to toggle button visibility
  let [loginBtn, setLoginBtn] = React.useState(false);
  // create card
  let [showCreate, setShowCreate] = React.useState(false);
  let [showVerified, setShowVerified] = React.useState(false);

  return (
    <div className="dashboard">
      <div className="upper">
        {!showVerified && (
          <div className="verified">
            <p>
              You have not verified your email address. Click <a href="/#">here</a> to resend
              verification link.
            </p>
          </div>
        )}

        <div className="header">
          <h2>Dashboard</h2>
          <div className="username-wrapper">
            <p
              onClick={() => {
                setLoginBtn(!loginBtn);
              }}
            >
              {user} &#9660;
            </p>
            {loginBtn && <p className="login-button"> Log Out</p>}
          </div>
        </div>
      </div>

      <div className="card-wrapper">
        {desArr.map((item: any, index: number) => {
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
