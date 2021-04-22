import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];

  let divs = $("#dnn_ctr376_ModuleContent > div").toArray();
  divs.shift();
  divs.map((div) => {
    const insideDivs = $(div).find("div");
    const image = "https://www.re-auctions.com" + $(insideDivs[0]).find("img").attr("src");
    const address = $(insideDivs[2]).find("a").text();
    const lis = $(insideDivs[2]).find("li");
    const type = $(lis[0]).text().split(":")[1].trim();
    const status = $(lis[1]).text().split(":")[1].trim();
    const deposit = $(lis[2]).text().split(":")[1].trim();
    if ($(insideDivs[4]).find(".Postponed").length) {
      const postpone = $(insideDivs[4]).find(".Postponed").text().trim();
      const date = $(insideDivs[4]).find("b").text().split("-")[0].trim().replace("/2021", "/21");
      const time = $(insideDivs[4]).find("b").text().split("-")[1].trim();
      data.push({
        image: image,
        address: address,
        type: type,
        status: status,
        deposit: deposit,
        postpone: postpone,
        date: date,
        time: time,
      });
    } else {
      const date = $(insideDivs[4]).find("b").text().split("-")[0].trim().replace("/2021", "/21");
      const time = $(insideDivs[4]).find("b").text().split("-")[1].trim();
      data.push({
        image: image,
        address: address,
        type: type,
        status: status,
        deposit: deposit,
        date: date,
        time: time,
      });
    }
  });

  return data;
};

crawl({
  url: "https://www.re-auctions.com/Auction-Schedule/PropertyAgentName/-1/sortBy/cf11",
});

export default crawl;
