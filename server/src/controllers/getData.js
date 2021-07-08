import filter from "../utils/filter.js";

const getData = async (req, res) => {
  let auctions = await filter();

  for (let auction of auctions) {
    auction.date = auction.date.toLocaleDateString();
  }

  return res.status(200).json({
    allAuctions: auctions,
  });
};

export default getData;
