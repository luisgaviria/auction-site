// #GridView1 > tbody
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "https://auction-site-ma.herokuapp.com/auction_photos/towne.webp";

  let data = [];
  $("#GridView1 > tbody > tr")
    .toArray()
    .map((tr) => {
      const tds = $(tr).find("td");

      const date = new Date($(tds[0]).text().trim("\n")).toLocaleDateString();

      const time = $(tds[1]).text().trim("\n");
      let address = $(tds[3]).text().trim("\n");
      const city = $(tds[4]).text().trim("\n");
      const state = $(tds[5]).text().trim("\n");
      const status = $(tds[2]).text().trim("\n");
      const deposit = $(tds[9]).text().trim("\n");

      address += ", " + city + ", " + state;

      data.push({
        logo: logo,
        date: date,
        time: time,
        address: address,
        // city: city,
        // state: state,
        status: status,
        deposit: deposit,
        link: url,
      });
    });

  data = data.filter((article) => {
    if (article.date != "Invalid Date" && article.status.search("Postponed") == -1) {
      return article;
    }
  });

  return data;
};

export default crawl;
