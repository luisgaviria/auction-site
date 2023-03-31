import filter from "../utils/filter.js";

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const count_pages = (array, page_size) => {
  let pages = array.length / page_size;
  if (pages > parseInt(pages)) {
    pages = parseInt(pages) + 1;
  }
  return pages;
};

const getData = async (req, res) => {
  let auctions = await filter();
  const page = req.query.page;
  const limit = req.query.limit;
  
  if (!page || !limit) {
    return res.status(404).json({
      message: "You need to specify queries page, limit",
    });
  }

  if(page == "all" && limit == "all"){
    let auctions = await filter();
    return res.status(200).json({
      allAuctions: auctions
    });
  }

  const pages =  count_pages(auctions,limit);

  auctions = paginate(auctions,limit,page);

  console.log(auctions);

  for (let auction of auctions) {
    auction.date = auction.date.toLocaleDateString();
  }

  return res.status(200).json({
    allAuctions: auctions,
    pages: pages,
    page: page,
    limit: limit,
  });
};

export default getData;
