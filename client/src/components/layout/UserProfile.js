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
    <div className="grid-container">
      <br />
      <h3 className="centered-text">Profile: {userName}</h3>
      <br />
      <h3>Add a phone number</h3>
      <form>
        <div>
          <label>
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              onChange={onChangeInput}
              value={phoneNumber}
              placeHolder="123-45-678"
            />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Add Number" />
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default UserProfile;
