import express from "express";
import passport from "passport";
import objection from "objection";
import { User } from "../../../models/index.js";
import {isAuth} from "../../../middlewares/isAuth.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.post("/phoneNumber",isAuth, async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.userId;
  try {
    // const user = await User.query().findById(userId);
    await User.query().findById(userId).patch({ phoneNumber: phoneNumber });

    return res.status(201).json({
      message: "Succesfully added phone number",
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/profile",isAuth,async(req,res)=>{
  const userId = req.userId;
  try{
    const user = await User.query().findById(userId);

    return res.status(200).json({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }
  catch(err){
    console.log(err);
    return res.status(404).json({
      errors: error
    });
  }
});

export default usersRouter;
