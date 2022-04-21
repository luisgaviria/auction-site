import Auction from "../models/Favorite.js";

const filterFavorite = async (userId) => {
  console.log(userId); 
  let auctions = await Auction.query().select("id","address","city","state","time","logo","status","link","date","deposit","lat","lng","repoId","userId").where("userId",userId).orderBy("date");
  // console.log(auctions);

  for (const auction of auctions) {
    let date = auction.date;
    const status = auction.status;
    // console.log(status);

    if (date < new Date().setHours(0, 0, 0, 0)) {
      await Auction.query().deleteById(auction.id);
    }
    if (
      status == "Sold" ||
      status == "Cancelled" ||
      status == "CANCELLED" ||
      status == "Postponed" ||
      status == "Canceled" ||
      status == "CANCELED"
    ) {
      await Auction.query().deleteById(auction.id);
    }

    date = new Date().toDateString();
    // console.log(date);
  }

  // auctions = await Auction.query();

  return auctions;
};

export default filterFavorite;
