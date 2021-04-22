import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];

  $("#Table_01 > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr")
    .toArray()
    .map((tr) => {
      const tds = $(tr).find("td");
      const date = $(tds[0]).text().trim("\t").trim("\n");
      const time = $(tds[1]).text().trim("\t").trim("\n");
      const address = $(tds[2])
        .text()
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/  +/g, " ")
        .trim()
        .split(",")[0];
      const city = $(tds[3]).text().trim("\t").trim("\n");
      const deposit = $(tds[4]).text().trim();

      const status = $(tds[5]).text();

      data.push({
        date: date,
        time: time,
        address: address,
        city: city,
        deposit: deposit,
        status: status.length ? "Sold" : "Available",
      });
    });
  data.shift();

  return data;
};

crawl({
  url: "http://harvardauctioneers.com/",
});

export default crawl;
