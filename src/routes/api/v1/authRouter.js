import express from "express";
import { User } from "../../../models/index.js";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import bcrypt from "bcrypt";

// dotenv.config();

const authRouter = new express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const persistedUser = await User.query().findOne({ email: email });
    if (persistedUser) {
      return res.status(200).json({
        message: "Somebody have this email",
      });
    }

    const newUser = await User.query().insertAndFetch({ email, password });
    console.log(newUser.id);

    const token = await jwt.sign(
      {
        email: newUser.email,
        id: newUser.id,
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      email: newUser.email,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const persistedUser = await User.query().findOne({ email: email });
    if (persistedUser) {
      const agree = bcrypt.compareSync(password, persistedUser.cryptedPassword);
      if (agree) {
        const token = await jwt.sign(
          {
            email: persistedUser.email,
            id: persistedUser.id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          message: "Succesfully logged",
          token: token,
        });
      } else {
        return res.status(404).json({
          message: "Wrong Password Or Email",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default authRouter;
