import express from "express";

import crawlApg from "../../../apiClient/crawlApg.js";

const apgRouter = new express.Router();

apgRouter.get("/", (req, res) => {
  crawlApg({ url: "https://apg-online.com/auction-schedule/" }).then((data) => {
    if (data.error) {
      console.log(`Error from crawlClient: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default apgRouter;
