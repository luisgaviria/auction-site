import React, { useState } from "react";
import config from "./config.js";
import FormError from "../error/FormError.js";
import axios from "axios";
import {url} from "../../url.js";
import {useNavigate} from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
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

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    validateInput(userPayload);
    if (Object.keys(errors).length === 0) {
        const {data} = await axios.post(url+"/api/v1/auth/login",{
            ...userPayload
        },{
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log(data);
        localStorage.setItem("token",data.token);
        window.location.href="/";
    }
  };
  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h3>Sign In</h3>
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
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
