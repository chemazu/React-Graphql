import React from "react";
import "./style.scss";
import Button from "../../components/Button";
import create from "../../resources/create.svg";
import greenCheck from "../../resources/green-check.svg";
import caretRight from "../../resources/caret-right.svg";
import {
  GETME,
  GETITEMS,
  VERIFYME,
  CREATEITEM,
  DELETEITEM,
  UPDATEITEM,
} from "../../graphql/schema";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GETME);
  const {
    loading: itemsLoading,
    data: itemsData,
  } = useQuery(GETITEMS);
  const [createitem] = useMutation(CREATEITEM);
  const [deleteItem] = useMutation(DELETEITEM);
  const [updateItem] = useMutation(UPDATEITEM);
  const [verifyme] = useMutation(VERIFYME);
  let [loginBtn, setLoginBtn] = React.useState(false);
  let [note, setNote] = React.useState({ noteName: "", noteDescription: "" });
  let [showCreate, setShowCreate] = React.useState(false);
  let [showEdit, setShowEdit] = React.useState({ status: false, uuid: "" });
  let [confirmVerified, setConfirmVerified] = React.useState(false);

  let handleVerification = () => {
    setConfirmVerified(true);
    verifyme({ variables: { token: data.getMe.email_verification_token } });
  };
  let handleCreate = () => {
    createitem({
      variables: { name: note.noteName, description: note.noteDescription },
    }).then((res: any) => {
      window.location.reload();
    });
    setShowCreate(false);
  };
  let handleDelete = (uuid: any) => {
    deleteItem({
      variables: {
        uuid,
      },
    }).then(() => {
      window.location.reload();
    });
  };
  let handleUpdate = () => {
    console.log(note.noteName, note.noteDescription, showEdit.uuid);
    updateItem({
      variables: {
        name: note.noteName,
        description: note.noteDescription,
        uuid: showEdit.uuid,
      },
    }).then((res: any) => {
      // console.log(res)
      window.location.reload();
    });
    setShowCreate(!showCreate);
  };
  let handleLogOut=()=>{
    localStorage.setItem("wazoKey","")
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="upper">
        {!loading && data.getMe.email_verified_at == null && (
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
            {loginBtn && <p className="logout-button hover" onClick={handleLogOut}> Log Out</p>}
          </div>
        </div>
      </div>

      <div className="card-wrapper">
        {itemsLoading && <p>Loading...</p>}
        {!itemsLoading &&
          itemsData.getItems.items.map((item: any, index: number) => {
            return (
              <DashCard
                item={item}
                key={index}
                action={{ handleDelete }}
                show={{ showCreate, setShowCreate, showEdit, setShowEdit }}
              />
            );
          })}
      </div>
      {showCreate && (
        <div className="create-wrapper">
          <div className="create-card">
            {!showEdit.status && <p className="heading">Create Item</p>}
            {showEdit.status && <p className="heading">Edit Item</p>}

            <div className="card-item">
              <p>Name</p>
              <input
                placeholder="Input item name here"
                onChange={(e) => {
                  setNote({ ...note, noteName: e.target.value });
                }}
              />
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
                value={note.noteDescription}
                onChange={(e) => {
                  setNote({ ...note, noteDescription: e.target.value });
                }}
              ></textarea>
            </div>
            <div className="button-wrapper">
              <Button
                className="pry"
                title="Cancel"
                onClick={() => {
                  setShowCreate(false);
                }}
              />
              {!showEdit.status && (
                <Button
                  className="sec"
                  title="Create Event"
                  onClick={() => {
                    handleCreate();
                  }}
                />
              )}
              {showEdit.status && (
                <Button
                  className="sec"
                  title="Edit Event"
                  onClick={() => {
                    handleUpdate();
                  }}
                />
              )}
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
                window.location.reload();
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
const DashCard = ({
  item,
  action,
  show,
}: {
  item: { name: string; description: string; uuid: any };
  action: any;
  show: any;
}) => {
  let { name, description, uuid } = item;
  let { handleDelete } = action;
  let { showCreate, setShowCreate, setShowEdit } = show;
  return (
    <div className="dash-card">
      <div className="head">
        <p className="one">Name</p>
        <p className="two">{name}</p>
      </div>
      <div className="content">
        <p className="one">Description</p>
        <p className="two">{description}</p>
      </div>
      <div className="button-wrapper">
        <Button
          className="pry"
          title="Edit"
          onClick={() => {
            setShowCreate(!showCreate);
            setShowEdit({ uuid: uuid, status: true });
          }}
        />
        <Button
          className="sec"
          title="Delete"
          onClick={() => {
            handleDelete(uuid);
          }}
        />
      </div>
    </div>
  );
};
