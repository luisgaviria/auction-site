import express from "express";

import objection from "objection";
const { ValidationError } = objection;

import { Auction } from "../../../models/index.js";

import auctionControl from "../../../controllers/auctionControl.js";

const crawlRouter = new express.Router();

crawlRouter.get("/", auctionControl);

crawlRouter.get("/:id", async (req, res) => {
  const crawlId = req.params.id;
  try {
    const auction = await Auction.query().findOne({ crawlId: crawlId });
    return res.status(200).json({ auction: auction });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default crawlRouter;
