import express from "express";

// import objection from "objection";
// const { ValidationError } = objection;

import auctionControl from "../../../controllers/auctionControl.js";

const crawlRouter = new express.Router();

crawlRouter.get("/", auctionControl);

export default crawlRouter;
