import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];

  let links = $("body > table.menu > tbody > tr:nth-child(2) > td.pagebody > table")
    .toArray()
    .map((item) => {
      const dd = $(item).find("dd");
      const auction_status = $(dd[0])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const property_status = $(dd[1])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const address = $(dd[2])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const description = $(dd[3])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const required_deposit = $(dd[4])
        .text()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();

      data.push({
        auction_status: auction_status,
        property_status: property_status,
        address: address,
        description: description,
        required_deposit: required_deposit,
      });
    });
  data.pop();
  data.shift();
  data.shift();

  console.log(data);
  return data;
};

crawl({
  url: "http://www.commonwealthauction.com/auctions.asp?location=1",
});

export default crawl;
