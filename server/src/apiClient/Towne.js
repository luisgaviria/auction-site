// #GridView1 > tbody
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];
  $("#GridView1 > tbody > tr")
    .toArray()
    .map((tr) => {
      // console.log($(tr).text());
      const tds = $(tr).find("td");
      const date = $(tds[0]).text().trim("\n").substring(1).replace("/0", "/");
      const time = $(tds[1]).text().trim("\n");
      const address = $(tds[3]).text().trim("\n");
      const city = $(tds[4]).text().trim("\n");
      const state = $(tds[5]).text().trim("\n");
      const status = $(tds[2]).text().trim("\n");
      const deposit = $(tds[9]).text().trim("\n");

      data.push({
        date: date,
        time: time,
        address: address,
        city: city,
        state: state,
        status: status,
        deposit: deposit,
      });
    });

  return data;
};

crawl({
  url: "https://www3.towneauction.com/Auctions_NoNav.aspx",
});

export default crawl;
