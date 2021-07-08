import Auction from "../models/Auction.js";

const filter = async () => {
  let auctions = await Auction.query();

  for (const auction of auctions) {
    const date = auction.date;
    const status = auction.status;

    if (date < new Date()) {
      await Auction.query().deleteById(auction.id);
    }
    if (
      status == "Sold" ||
      status == "Cancelled" ||
      status == "CANCELLED" ||
      status == "Postponed"
    ) {
      await Auction.query().deleteById(auction.id);
    }
  }

  auctions = await Auction.query().orderBy("date");

  return auctions;
};

export default filter;