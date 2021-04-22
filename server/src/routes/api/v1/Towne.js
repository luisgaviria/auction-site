import express from "express";

// import crawlClient from "../../../apiClient/crawlClient.js";
import crawl from "../../../apiClient/Towne.js";

const towneRouter = new express.Router();

towneRouter.get("/", (req, res) => {
  crawl({ url: "https://www3.towneauction.com/Auctions_NoNav.aspx" }).then((data) => {
    if (data.error) {
      console.log(`Error from crawlClient: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default towneRouter;
