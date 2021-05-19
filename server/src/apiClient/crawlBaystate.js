import puppeteer from "puppeteer";

import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const logo =
    "https://clubrunner.blob.core.windows.net/00000000439/Images/auctioneer-export-2-001.jpg";
  const link = "https://www.baystateauction.com/auctions";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.waitForSelector("#main > div.row.main > script");
  let value = await page.evaluate((el) => el.innerText, element);
  value =
    "[" +
    value
      .toString()
      .split("[")[1]
      .trim()
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .replace(/  +/g, " ")
      .trim();
  value = value.replace("},]", "}]");
  //console.log(value);

  let data = JSON.parse(value);
  data = data.filter((record) => {
    if (record.date.search("THE SALE") == -1) {
      record.date = record.date.split(" <s")[0].replace("at", "@");
      const date = new Date(record.date).toLocaleDateString();
      record.date = date;
      record.link = link;
      record.logo = logo;

      return record;
    }
  });

  console.log(data);
  browser.close();
  return data;
};

// crawl("https://www.baystateauction.com/auctions/state/ma");

export default crawl;
