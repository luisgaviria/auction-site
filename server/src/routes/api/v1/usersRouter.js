import express from "express";
import passport from "passport";
import objection from "objection";
import { User } from "../../../models/index.js";

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

usersRouter.post("/phoneNumber", async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.get("userid");
  console.log(userId);
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

export default usersRouter;
