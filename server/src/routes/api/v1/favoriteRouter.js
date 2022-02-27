import express from "express";
import objection from "objection";
import cleanUserInput from "../../services/cleanUserInput.js";
const { ValidationError } = objection;

import Favorite from "../../../models/Favorite.js";
import Auction from "../../../models/Auction.js";

const favoriteRouter = new express.Router();

favoriteRouter.post("/:auctionId", async (req, res) => {
  const auctionId = req.params.auctionId;
  const userId = req.body.userId;
  const currentAuction = await Auction.query().findOne({ id: auctionId });
  // console.log(auctionId, userId);
  try {
    await Favorite.query().insertAndFetch({ auctionId: currentAuction.id, userId: userId });

    return res
      .status(201)
      .json({ message: "success adding a favorite auction", auction: currentAuction });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

favoriteRouter.get("/:userId", async (req, res) => {
  const favorites = await Favorite.query().where({ userId: req.params.userId });
  // console.log(favorites);
  for (const fav of favorites) {
    const auction = await Auction.query().findOne({ id: fav.auctionId });
    fav.auction = auction;
  }
  try {
    return res.status(201).json({ favorites: favorites });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

export default favoriteRouter;
