import fetch from "node-fetch";
import * as cheerio from "cheerio";
 // sullivan change layout

const formatDate = (dateProp)=>{ 
  const datePropSplitted = dateProp.split(" ");
  datePropSplitted[1]= datePropSplitted[1].slice(0, -1);
  datePropSplitted[2]=datePropSplitted[2].slice(0,-1);
  const correctDateFormat = datePropSplitted[1]+" "+datePropSplitted[2]+" "+datePropSplitted[3];
  return correctDateFormat;
}  


const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = await cheerio.load(body);
  const auctions = [];
  const trs = $("#table-view > table > tbody").find('tr').toArray();
  const logo = "https://auction-site-ma.herokuapp.com/auction_photos/sullivan.webp";
  try {
    for(const tr of trs){
      const tds = $(tr).find('td').toArray();
      const status = $(tds[1]).text().trim(); 
      let date = ""; 
      if(status!="postponed"){
        date= $(tds[0]).text().trim(); 
      }
      else{  
        const previousPostponed = $(tds[0]).find("span").text(); 
        date = $(tds[0]).text().split(previousPostponed)[1].trim();
      }
      const link = $(tds[0]).find('a').attr('href');
      const address = $(tds[2]).text().trim()+", "+$(tds[3]).text().trim();
      date = formatDate(date);
      auctions.push({
        date: new Date(date), 
        address: address, 
        deposit: null,
        logo: logo,
        link: url+link,
        status: status,
      });
    } 
    // console.log(auctions);
    
    return auctions;
}
catch(err){
  console.log(err);
}
}

// crawl({
//   url: "https://sullivan-auctioneers.com/massachusetts/",
// });

export default crawl;
