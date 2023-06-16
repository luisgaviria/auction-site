import filter from "../utils/filter.js";
import axios from "axios"; 

const streetTypeMapping = {
  al: 'alley',
  ave: 'avenue',
  blvd: 'boulevard',
  cir: 'circle',
  ct: 'court',
  dr: 'drive',
  hwy: 'highway',
  ln: 'lane',
  pkwy: 'parkway',
  pl: 'place',
  plz: 'plaza',
  rd: 'road',
  st: 'street',
  ter: 'terrace',
  way: 'way',
  w: 'west',
  n: 'north',
  e: 'east',
  s: 'south'
  // Add more mappings as needed
};


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

  // console.log(auctions);

  for (let auction of auctions) {
    auction.date = auction.date.toLocaleDateString();
  }

  for (const auction of auctions){
    console.log(auction.address)

    // console.log(auction.lat);
    // console.log(auction.lng);
    await checkIfItExistsInAPI(auction);
  }
  
  // auctions.map(auction=>{
  //   checkIfItExistsInAPI(auction);
  // }); 

  return res.status(200).json({
    allAuctions: auctions,
    pages: pages,
    page: page,
    limit: limit,
  });
};

const checkIfItExistsInAPI =async (auction)=>{ // find an algorithm to actually check if auc addresses from database are match with addresses from api
  let address = auction.address.toLowerCase();
  address = address.split(' ');
  const lat = auction.lat;
  const lng = auction.lng;
  try{

    const res = await axios.get(`https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=${process.env.SERVER_TOKEN}&near=${lng},${lat}`)
    const bundle = res.data.bundle; 
    for (const auction of bundle){
      let aucApiAddress = auction.UnparsedAddress.toLowerCase(); 
      aucApiAddress = aucApiAddress.split(' ');
      // console.log(aucApiAddress);
    }
    // console.log(res.data.bundle[0].UnparsedAddress);
    // console.log(res.data.bundle[0].UnparsedAddress);
  }
  catch(err){
    // console.log(err);
  }

};

// const getDataFromExternalAPI =async (req,res)=>{ 

// };

export default getData;
