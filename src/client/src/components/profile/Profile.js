import React, {useEffect, useState} from "react"; 
import axios from "axios";
import {url} from "../../url.js";

const Profile = (props)=>{
    const [profile, setProfile] = useState({
        email: "",
        id: "",
        phoneNumber: ""
    });

    useEffect(async()=>{
        const {data} = await axios.get(url+"/api/v1/users/profile",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        });

        console.log(data);

        setProfile({
            ...data
        })
    },[]);


    const onChangeInput = (event) => {
        setProfile(prevState=>{
            return {
                ...prevState,
                phoneNumber: event.target.value
            }
        });
      };
    
      const acceptPhoneNumber = async (event) => {
          event.preventDefault();
          try{
            await axios.post(url+"/api/v1/users/phoneNumber",{
                "phoneNumber": profile.phoneNumber
            },{
                headers:{
                    "Authorization": "Bearer "+ localStorage.getItem("token"),
                    "Content-type": "application/json"
                }
            });

            console.log("added phone Number");

          }
          catch(err){
            console.log(err);
          }
      };
    return (
        <div className="grid-container">
      <br />
      <h3 className="centered-text">Profile: {profile.email} id: {profile.id}</h3>
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
              value={profile.phoneNumber}
              placeHolder="123-45-678"
            />
          </label>
        </div>
        <div>
          <input onClick={acceptPhoneNumber} type="submit" className="button" value="Add Number" />
        </div>
      </form>
      <br />
      <br />
    </div>
    )
}

export default Profile;