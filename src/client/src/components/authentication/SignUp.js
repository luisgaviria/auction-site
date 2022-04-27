import React, { useState } from "react";
import FormError from "../error/FormError";
import config from "./config.js";
import {url} from "../../url.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
      event.preventDefault();
      validateInput(userPayload);
      if(Object.keys(errors).length ===0){
          const {data} = await axios.post(url+"/api/v1/auth/register",{
            ...userPayload
          },{headers: {
            "Content-Type": "application/json",
          }});

          console.log(data);
          localStorage.setItem("token",data.token);
          navigate("/");
      }
      // event.preventDefault();
    // validateInput(userPayload);
    // if (Object.keys(errors).length === 0) {
    //   fetch("/api/v1/users", {
    //     method: "post",
    //     body: JSON.stringify(userPayload),
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //   }).then((resp) => {
    //     if (resp.ok) {
    //       resp.json().then((user) => {
    //         setShouldRedirect(true);
    //       });
    //     } else {
    //       const errorMessage = `${resp.status} (${resp.statusText})`;
    //       const error = new Error(errorMessage);
    //       throw error;
    //     }
    //   });
    // }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h3>Register</h3>
      <form>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
