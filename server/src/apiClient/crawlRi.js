import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];
  $("body > center > center > font > b > table:nth-child(5) > tbody > tr")
    .toArray()
    .map((tr) => {
      const tds = $(tr).find("td");
      const date = $(tds[0]).text().trim("\n").trim("\t").replace("/2021", "/21");
      const time = $(tds[2]).text().trim("\n").trim("\t");
      const address = $(tds[4]).text().trim("\n").trim("\t");
      const city = $(tds[5]).text().trim("\n").trim("\t");
      const state = $(tds[6]).text().trim("\n").trim("\t");
      const status = $(tds[8]).text().trim("\n").trim("\t");
      const deposit = $(tds[9]).text().trim("\n").trim("\t");

      data.push({
        date: date,
        time: time,
        address: address,
        city: city,
        state: state,
        status: status,
        deposit: deposit,
        link: url,
      });
    });

  return data;
};

crawl({
  url: "http://www.auctionsri.com/scripts/auctions.asp?category=R",
});

export default crawl;
