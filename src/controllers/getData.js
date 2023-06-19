import filter from "../utils/filter.js";
import axios from "axios"; 
import stringSimilarity from "string-similarity";

const streetTypeMapping = {
  alley: 'al',
  avenue: 'ave',
  boulevard: 'blvd',
  circle: 'cir',
  court: 'ct',
  drive: 'dr',
  highway: 'hwy',
  lane: 'ln',
  parkway: 'pkwy',
  place: 'pl',
  plaza: 'plz',
  road: 'rd',
  street: 'st',
  terrace: 'ter',
  way: 'way',
  west: 'w',
  north: 'n',
  east: 'e',
  south: 's',
  "street,": 'st',
  "avenue,": 'ave',
  "road,": "rd",
  "terrace,": 'ter'
  // Add more mappings as needed
};

const removeTextBetweenBrackets = (str)=>{
  console.log(str);
  const pos1 = str.indexOf('(');
  const pos2 = str.indexOf(')'); 
  console.log(str.substring(pos1,pos2));
  str = str.replace(str.substring(pos1,pos2),'');
  return str;
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
  for (const [index,auction] of auctions.entries()){

    // console.log(auction.lat);
    // console.log(auction.lng);
    const result = await checkIfItExistsInAPI(auction);
    if(result){
      auctions[index] = {...auction,details: result};
    }
  }


  return res.status(200).json({
    allAuctions: auctions,
    pages: pages,
    page: page,
    limit: limit,
  });
};

const checkIfItExistsInAPI =async (auction)=>{ // find an algorithm to actually check if auc addresses from database are match with addresses from api
  let address = auction.address.toLowerCase();

  const lat = auction.lat;
  const lng = auction.lng;

  try{  
    const res = await axios.get(`https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=${process.env.SERVER_TOKEN}&near=${lng},${lat}`)
    const bundle = res.data.bundle; 
    const aucApiAddresses = [];
    for (const auction of bundle){
      let aucApiAddress = auction.UnparsedAddress.toLowerCase(); 
      aucApiAddresses.push(aucApiAddress);

      
  
    }
    const match = stringSimilarity.findBestMatch(address,aucApiAddresses);
    const addressArray = address.split(' ');
    const addressApiArray = aucApiAddresses[match.bestMatchIndex].split(' ');
    if(addressArray[0] == addressApiArray[0]){
      return bundle[match.bestMatchIndex];
    }

    return null;

  }
  catch(err){
    console.log(err);
  }

};

// const getDataFromExternalAPI =async (req,res)=>{ 

// };

export default getData;
