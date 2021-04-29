import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "https://i.postimg.cc/NfKnTct5/300x83.jpg";

  let data = [];

  let links = $(
    "body > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > center:nth-child(3) > table > tbody > tr"
  )
    .toArray()
    .map((item) => {
      const tds = $(item).find("td");
      const image = $(tds[0]).find("img").attr("src");
      const number = $(tds[0]).text().trim();
      const status = $(tds[1])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const date = $(tds[2])
        .text()
        .trim()
        .replace(/\n\t\t\t/g, " ");
      const address = $(tds[3])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const victorian_family = $(tds[4])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();

      data.push({
        logo: logo,
        serial_number: number,
        image: image,
        status: status,
        date: date,
        address: address,
        victorian_family: victorian_family,
        link: url,
      });
    });
  data.shift();
  data.pop();

  function convertStringDateToDate(date) {
    date = date.split(" ");
    console.log(date);
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    date = date[1] + " " + date[2] + " " + date[3];
    //   console.log(date);
    date = new Date(date).addHours(2).toLocaleDateString();
    return date;
  }

  data = data.filter((record) => {
    if (
      record.status != "SOLD" &&
      record.status != "Sold at Auction" &&
      record.date != "" &&
      record.date != "Sold" &&
      record.date != "SOLD"
    ) {
      return record;
    }
  });

  data.map((record) => {
    record.date = convertStringDateToDate(record.date);
  });

  //console.log(data);

  /*links.map(tr=>{
    //console.log(td.children());
    console.log($(tr).text()) 
  })*/
  //links = links.substr(55,links.length);

  //links = links.split('#');
  //.children('td[width="82%"]').text();

  //console.log(links)

  //console.log(data);
  return data;
};

crawl({
  url: "http://www.auctionmarketinggroup.com/auctions.html",
});
export default crawl;
