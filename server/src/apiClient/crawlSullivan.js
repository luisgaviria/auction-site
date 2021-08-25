import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = await cheerio.load(body);
  const data = [];
  const divs = $("#calendar > div > div.auction-list").toArray();
  const logo = "https://i.postimg.cc/cJw0xJHX/imageedit-152-7011749727.png";
  try {
    for (const div of divs) {
      const address = $(div).find("h1").text().trim();
      const link = "https://sullivan-auctioneers.com/massachusetts" + $(div).find("a").attr("href");
      let date = $(div).find(".auction-date").text().trim();
      // const img = "https://sullivan-auctioneers.com/massachusetts" + $(div).find("img").attr("src");
      date = date.split("Continued")[0].trim();
      date = date.split("Postponed")[0].trim();

      const response2 = await fetch(link);
      const body2 = await response2.text();
      const $2 = await cheerio.load(body2);
      const deposit = $2(
        "#calendar > div:nth-child(2) > div > div.col-md-4.col-print-4 > div:nth-child(4) > p"
      )
        .text()
        .split("deposit")[0]
        .trim();

      let status = $2(
        "#calendar > div:nth-child(2) > div > div.col-md-4.col-print-4 > div:nth-child(2) > p > span.text-red"
      )
        .text()
        .trim();
      if (!status.length) {
        status = "On Schedule";
      }

      data.push({
        status: status,
        address: address,
        link: link,
        date: new Date(date).toLocaleDateString().replace("2001", new Date().getFullYear()),
        deposit: deposit,
        logo: logo,
      });
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// crawl({
//   url: "https://sullivan-auctioneers.com/massachusetts/",
// });

export default crawl;
