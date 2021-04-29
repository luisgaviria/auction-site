import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "https://i.postimg.cc/jCY7GtDq/footer-massachusetts-auctioneers-association-img.png";

  let data = [];

  let links = $("#content > div.columns.three.properties > div")
    .toArray()
    .map((item) => {
      const dt = $(item).find("dt");
      const dd = $(item).find("dd");
      let auction_status = null;
      let property_status = null;
      let auction_date = null;
      let address = null;
      let description = null;
      let deposit = null;
      for (let i = 0; i < dt.length; i++) {
        if ($(dt[i]).text() == "Auction Status:") {
          auction_status = $(dd[i]).text();
        }
        if ($(dt[i]).text() == "Property Status:") {
          property_status = $(dd[i]).text();
        }
        if ($(dt[i]).text() == "Auction Date:") {
          auction_date = $(dd[i]).text();
        }
        if ($(dt[i]).text() == "Address:") {
          address = $(dd[i]).text();
        }
        if ($(dt[i]).text() == "Description:") {
          description = $(dd[i]).text();
        }
        if ($(dt[i]).text() == "Required Deposit:") {
          deposit = $(dd[i]).text();
        }
      }
      data.push({
        logo: logo,
        status: auction_status,
        property_status: property_status,
        date: auction_date,
        address: address,
        deposit: deposit,
        link: url,
      });
    });

  function convertStringDateToDate(date) {
    date = date.split(" ");
    console.log(date);
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    date = date[0] + " " + date[1] + " " + date[2];
    date = new Date(date).addHours(2).toLocaleDateString();
    return date;
  }
  data = data.filter((record) => {
    if (record.date && record.status != "Off") {
      return record;
    }
  });
  data.map((record) => {
    record.date = convertStringDateToDate(record.date);
  });
  console.log(data);
  return data;
};

crawl({
  url: "https://apg-online.com/auction-schedule/",
});

export default crawl;
