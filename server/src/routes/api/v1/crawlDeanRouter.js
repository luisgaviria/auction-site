import express from "express";

import crawlDean from "../../../apiClient/crawlDean.js";

const crawlDeanRouter = new express.Router();

crawlDeanRouter.get("/", (req, res) => {
  crawlDean({ url: "http://www.deanassociatesinc.com/auctions.htm" }).then((data) => {
    if (data.error) {
      console.log(`Error from crawlClient: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default crawlDeanRouter;
