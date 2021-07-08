import crawlClient from "../apiClient/crawlClient.js";
import crawlCommonwealth from "../apiClient/Commonwealth.js";
import crawlTowne from "../../src/apiClient/Towne.js";
import crawlApg from "../apiClient/crawlApg.js";
import crawlDean from "../apiClient/crawlDean.js";
import crawlTache from "../apiClient/crawlTache.js";
import crawlHarvard from "../apiClient/Harvard.js";
import crawlDaniel from "../apiClient/Danielp.js";
import crawlRi from "../apiClient/crawlRi.js";
import crawlBaystate from "../apiClient/crawlBaystate.js";
import PatriotCrawl from "../apiClient/PatriotCrawl.js";
import crawlSullivan from "../apiClient/crawlSullivan.js";
import crawlJake from "../apiClient/crawlJake.js";

import Auction from "../models/Auction.js";

const scrapToDatabase = async (req, res) => {
  try {
    let allAuctions = [];

    console.log("start");

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

    //console.log(data11);

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

    const sorted2 = sorted;

    for (let i = 0; i < sorted2.length; i++) {
      try {
        // console.log(sorted2[i]);
        const auctionTemp = await Auction.query().insert({
          deposit: sorted2[i].deposit,
          link: sorted2[i].link,
          logo: sorted2[i].logo,
          state: sorted2[i].state,
          city: sorted2[i].city,
          date: sorted2[i].date,
          address: sorted2[i].address,
          time: sorted2[i].time,
          status: sorted2[i].status,
        });
      } catch (error) {
        // const auctionTemp = await Auction.query().where({ address: sorted2[i].address });
      }
    }

    sorted2.map((auc) => {
      auc.date = new Date(auc.date).toLocaleDateString();
    });

    const databaseAuctions = await Auction.query();
    sorted2.map(async (auc) => {
      console.log(auc.address);
      // if(auc.address.search('Natick')!=-1){
      //   console.log(auc);
      // }
      databaseAuctions.map(async (databaseAuction) => {
        if (
          auc.address == databaseAuction.address &&
          new Date(auc.date).setHours(0, 0, 0, 0) !=
            new Date(databaseAuction.date).setHours(0, 0, 0, 0)
        ) {
          await databaseAuction.$query().patch({ date: new Date(auc.date) });
        }
      });
    });
    //console.log(data11, data10);
    console.log(sorted2.length);

    return res.status(200).json({ message: "Succesfully updated database", allAuctions: sorted2 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};

export default scrapToDatabase;
