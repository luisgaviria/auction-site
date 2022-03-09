import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  let userName = "";
  if (props.user !== undefined && props.user !== null) {
    userName += props.user.email;
  }

  const onChangeInput = (event) => {
    setPhoneNumber(event.target.value);
  };

  const acceptPhoneNumber = async () => {
    try {
      const response = await fetch("/api/v1/users/phoneNumber", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          userId: localStorage.getItem("userId"),
        }),
      });

      console.log("added phone number");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="callout small-10 small-centered columns" id="user-profile-card">
      <h3 className="centered-text">Profile: {userName}</h3>

      <h1>Add phone number</h1>
      <input onChange={onChangeInput} value={phoneNumber} />
      <button onClick={acceptPhoneNumber}>Ok</button>
    </div>
  );
};

export default UserProfile;
