import express from "express";

import objection from "objection";
// const { ValidationError } = objection;

import crawlClient from "../../../apiClient/crawlClient.js";
import crawlCommonwealth from "../../../apiClient/Commonwealth.js";
import crawlTowne from "../../../apiClient/Towne.js";
import crawlApg from "../../../apiClient/crawlApg.js";
import crawlDean from "../../../apiClient/crawlDean.js";
import crawlTache from "../../../apiClient/crawlTache.js";
import crawlHarvard from "../../../apiClient/Harvard.js";
import crawlDaniel from "../../../apiClient/Danielp.js";
import crawlRi from "../../../apiClient/crawlRi.js";
import crawlBaystate from "../../../apiClient/crawlBaystate.js";

const crawlRouter = new express.Router();

crawlRouter.get("/", async (req, res) => {
  try {
    let allAuctions = [];

    const data = await crawlClient({ url: "http://www.auctionmarketinggroup.com/auctions.html" });
    const data1 = await crawlCommonwealth({
      url: "http://www.commonwealthauction.com/auctions.asp?location=1",
    });

    const data2 = await crawlTowne({ url: "https://www3.towneauction.com/Auctions_NoNav.aspx" });
    const data3 = await crawlDean({ url: "http://www.deanassociatesinc.com/auctions.htm" });
    const data4 = await crawlApg({ url: "https://apg-online.com/auction-schedule/" });
    const data5 = await crawlTache({
      url:
        "https://docs.google.com/spreadsheets/u/1/d/14nrcaKBhCA61FcnBwU6EbiDbRQtOP-gQVxJVvxg5_o0/pubhtml/sheet?headers=false&gid=0",
    });
    const data6 = await crawlHarvard({ url: "http://harvardauctioneers.com/" });
    const data7 = await crawlDaniel({
      url: "https://www.re-auctions.com/Auction-Schedule/PropertyAgentName/-1/sortBy/cf11",
    });
    const data8 = await crawlRi({
      url: "http://www.auctionsri.com/scripts/auctions.asp?category=R",
    });

    // const data9 = await crawlBaystate({
    //   url: "https://www.baystateauction.com/auctions/state/ma",
    // });

    var date_sort_asc = function (date2, date1) {
      // This is a comparison function that will result in dates being sorted in
      // ASCENDING order. As you can see, JavaScript's native comparison operators
      // can be used to compare dates. This was news to me.
      if (new Date(date1.date) > new Date(date2.date)) return 1;
      if (new Date(date1.date) < new Date(date2.date)) return -1;
      return 0;
    };

    allAuctions = data.concat(data1, data2, data3, data4, data5, data6, data7, data8);

    let sorted = allAuctions.sort(date_sort_asc);

    sorted = allAuctions.sort(date_sort_asc).reverse();

    sorted = sorted.filter((auction) => {
      let date_future = new Date();
      date_future.setDate(date_future.getDate() - 1);
      if (new Date(auction.date) > date_future) {
        return auction;
      }
    });

    return res.status(200).json({ allAuctions: sorted });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default crawlRouter;
