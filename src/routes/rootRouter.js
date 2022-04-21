import express from "express";
// import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import crawlRouter from "./api/v1/crawlRouter.js";
import favoriteRouter from "./api/v1/favoriteRouter.js";
import authRouter from "./api/v1/authRouter.js";

const rootRouter = new express.Router();
// rootRouter.use("/", clientRouter);

// rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/auth",authRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/crawl", crawlRouter);
rootRouter.use("/api/v1/favorite", favoriteRouter);

export default rootRouter;
