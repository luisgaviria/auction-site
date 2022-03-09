import Auction from "../models/Favorite.js";

const filterFavorite = async (userId) => {
  let auctions = await Auction.query().where({ userId: userId });

  for (const auction of auctions) {
    const date = auction.date;
    const status = auction.status;
    // console.log(status);

    if (date < new Date().setHours(0, 0, 0, 0)) {
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

export default filterFavorite;
