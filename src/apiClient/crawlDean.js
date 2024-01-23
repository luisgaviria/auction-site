// import * as cheerio from "cheerio";
// import fetch from "node-fetch";

import { Browser,Builder, By,until } from "selenium-webdriver";
const logo = "https://auction-site-ma.herokuapp.com/auction_photos/dean.webp";

// here also selenium they changed layout of site
const crawl = async ({ url }) => {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  const auctions = [];   
  try{ 
    await driver.get(url);
    await driver.sleep(8000);
    let trs = await driver.findElements(By.xpath("/html/body/div/div[1]/main/section/div[1]/div/table/tbody/child::*"));
    for(const tr of trs){
      const tds = await tr.findElements(By.xpath("./child::*")); 
      const date = await tds[0].getText(); 
      const address = await tds[2].getText();
      const deposit = await tds[3].getText();
      try {
        console.log(date);
        auctions.push({
          date: new Date(date).toISOString(),
          address: address,
          deposit: deposit,
          logo: logo,
          link: "https://deanassociatesinc.com/auctions/",
          status: "Active"
        }); 
      }
      catch(err) { 
        console.log(err);
      }


    }
    await driver.close(); 
    return auctions;
  }
  catch(err){ 
    console.log(err);
  }
}
export default crawl;
