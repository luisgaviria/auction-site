import express from "express";

import crawlClient from "../../../apiClient/crawlClient.js";

const crawlRouter = new express.Router();

crawlRouter.get("/", (req, res) => {
  crawlClient({ url: "http://www.auctionmarketinggroup.com/auctions.html" }).then((data) => {
    if (data.error) {
      console.log(`Error from crawlClient: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default crawlRouter;
