import crawlClient from "../../src/apiClient/crawlClient.js";
import crawlCommonwealth from "../../src/apiClient/Commonwealth.js";
import crawlTowne from "../../src/apiClient/Towne.js";
import crawlApg from "../../src/apiClient/crawlApg.js";
import crawlDean from "../../src/apiClient/crawlDean.js";
import crawlTache from "../../src/apiClient/crawlTache.js";
import crawlHarvard from "../../src/apiClient/Harvard.js";
import crawlDaniel from "../../src/apiClient/Danielp.js";
import crawlRi from "../../src/apiClient/crawlRi.js";
import crawlBaystate from "../../src/apiClient/crawlBaystate.js";
import PatriotCrawl from "../../src/apiClient/PatriotCrawl.js";
import crawlSullivan from "../../src/apiClient/crawlSullivan.js";
import crawlJake from "../../src/apiClient/crawlJake.js";

import Auction from "../models/Auction.js";

const auctionControl = async (req, res) => {
  try {
    let allAuctions = [];

    const data = await crawlClient({ url: "https://www.amgauction.com" });
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

    const data9 = await crawlBaystate({
      url: "https://www.baystateauction.com/auctions/state/ma",
    });

    const data10 = await PatriotCrawl({
      url: "https://patriotauctioneers.com/auctions-in-massachusetts/",
    });

    const data11 = await crawlSullivan({
      url: "https://sullivan-auctioneers.com/massachusetts/",
    });

    const data12 = await crawlJake({
      url: "https://www.jkauctioneers.com/list1.htm",
    });

    let date_sort_asc = (date2, date1) => {
      if (new Date(date1.date) > new Date(date2.date)) return 1;
      if (new Date(date1.date) < new Date(date2.date)) return -1;
      return 0;
    };

    console.log(data11);

    allAuctions = data.concat(
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12
    );

    let sorted = allAuctions.sort(date_sort_asc).reverse();

    sorted = sorted.filter((auction) => {
      let date_future = new Date();
      date_future.setDate(date_future.getDate() - 1);
      if (new Date(auction.date) > date_future) {
        return auction;
      }
    });

    const sorted2 = [];

    for (const auction of sorted) {
      try {
        const auctionTemp = await Auction.query().insertAndFetch({
          deposit: auction.deposit,
          link: auction.link,
          logo: auction.logo,
          state: auction.state,
          city: auction.city,
          date: auction.date,
          address: auction.address,
          time: auction.time,
          status: auction.status,
        });

        sorted2.push(auctionTemp);
      } catch (error) {
        const auctionTemp = await Auction.query().where({ address: auction.address });
        sorted2.push(auctionTemp[0]);
      }
    }

    sorted2.map((auc) => {
      auc.date = new Date(auc.date).toLocaleDateString();
    });

    console.log(data11, data10);

    return res.status(200).json({ allAuctions: sorted2 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};

export default auctionControl;
