import * as cheerio from "cheerio";
import fetch from "node-fetch";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = await cheerio.load(body);
  const logo = "https://auction-site-ma.herokuapp.com/auction_photos/patriot.webp";
  const data = [];
  const as = $("#calendar > div > a").toArray();
  for (const a of as) {
    const address = $(a).find("h1").text().trim();
    const href = "https://patriotauctioneers.com" + $(a).attr("href");
    let date = $(a).find(".auction-date").text().trim();
    // const img = "https://patriotauctioneers.com" + $(a).find("img").attr("src");

    date = date.split("Continued")[0].trim();

    const response2 = await fetch(href);
    const body2 = await response2.text();
    const $2 = await cheerio.load(body2);
    const deposit = $2("#calendar > div:nth-child(2) > div > div.col-md-4 > div:nth-child(3) > p")
      .text()
      .split("deposit")[0]
      .trim();

    let status = $2(
      "#calendar > div:nth-child(2) > div > div.col-md-4 > div:nth-child(1) > p > span.text-red > strong"
    )
      .text()
      .trim();
    if (!status.length) {
      status = "On Schedule";
    }

    data.push({
      status: status,
      address: address,
      href: href,
      date: new Date(date).toLocaleDateString().replace("2001", new Date().getFullYear()),
      deposit: deposit,
      logo: logo,
      link: href,
    });
  }

  return data;
};

// crawl({
//   url: "https://patriotauctioneers.com/auctions-in-massachusetts/",
// });

export default crawl;
