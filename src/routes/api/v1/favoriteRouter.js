import express from "express";
import objection from "objection";
// import cleanUserInput from "../../services/cleanUserInput.js";
import filterFavorite from "../../../../src/utils/filterFavorites.js";
const { ValidationError } = objection;
import { isAuth } from "../../../middlewares/isAuth.js";

import Favorite from "../../../models/Favorite.js";
import Auction from "../../../models/Auction.js";

const favoriteRouter = new express.Router();
favoriteRouter.post("/:auctionId",isAuth, async (req, res) => {
  const auctionId = req.params.auctionId;
  const userId = req.userId;
  const currentAuction = await Auction.query().findOne({ id: auctionId });

  const duplicate = await Favorite.query().findOne({ address: currentAuction.address });

  if (duplicate) {
    return res.status(500).json({
      message: "You have this auction in favorite",
    });
  }

  // console.log(auctionId, userId);
  try {
    await Favorite.query().insertAndFetch({
      address: currentAuction.address,
      city: currentAuction.city,
      state: currentAuction.state,
      time: currentAuction.time,
      logo: currentAuction.logo,
      status: currentAuction.status,
      link: currentAuction.link,
      date: currentAuction.date, //to see
      deposit: currentAuction.deposit,
      lat: currentAuction.lat,
      lng: currentAuction.lng,
      repoId: currentAuction.id,
      userId: userId,
    });

    return res
      .status(201)
      .json({ message: "success added a favorite auction", auction: currentAuction });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

favoriteRouter.get("/",isAuth, async (req, res) => {
  const userId = req.userId;
  if (userId === "null") {
    return res.status(200).json({ favorites: [] });
  }
  const favorites = await filterFavorite(userId);

  try {
    return res.status(201).json({ favorites: favorites });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

favoriteRouter.delete("/:favoriteId",isAuth, async (req, res) => {
  const favoriteId = req.params.favoriteId;

  try {
    await Favorite.query().deleteById(favoriteId);
    return res.status(200).json({
      message: "Succesfully deleted Favorite auction",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

favoriteRouter.delete("/favoriteRepo/:repoId",isAuth, async (req, res) => {
  const repoId = req.params.repoId;
  const userId = req.userId;

  try {
    await Favorite.query().delete().where("repoId", "=", repoId).where("userId","=",userId);
    return res.status(200).json({
      message: "Succesfully deleted Favorite auction",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

export default favoriteRouter;
