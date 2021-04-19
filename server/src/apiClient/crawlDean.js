import fetch from "node-fetch";
import * as cheerio from "cheerio";
const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];

  let links = $("body > center:nth-child(2) > table > tbody > tr")
    .toArray()
    .map((item) => {
      const tds = $(item).find("td");
      const date = $(tds[0])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const hour = $(tds[1])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const address = $(tds[2])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const deposit = $(tds[3])
        .text()
        .trim()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();
      const balance_due = $(tds[4])
        .text()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim();

      data.push({
        date: date,
        hour: hour,
        address: address,
        deposit: deposit,
        balance_due: balance_due,
      });
    });
  data.pop();
  data.shift();
  data.shift();

  // console.log(data);
  return data;
};

crawl({
  url: "http://www.deanassociatesinc.com/auctions.htm",
});

export default crawl;
