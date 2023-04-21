import * as cheerio from "cheerio";
import fetch from "node-fetch";

const crawl = async ({ url }) => {
  let response = await fetch(url);
  let body = await response.text();
  let $ = cheerio.load(body);

  const logo =
    "https://auction-site-ma.herokuapp.com/auction_photos/danielp.webp";

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
      const date = $(insideDivs[4]).find("b").text().split("-")[0].trim();
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
        logo: logo,
        link: url 
      });
    } else {
      const date = $(insideDivs[4]).find("b").text().split("-")[0].trim();
      const time = $(insideDivs[4]).find("b").text().split("-")[1].trim();
      data.push({
        image: image,
        address: address,
        type: type,
        status: status,
        deposit: deposit,
        date: date,
        time: time,
        link: url,
        logo: logo,
      });
    }
  });
  for (let i = 2; i <= 4; i++) {
    response = await fetch(url + "/currentpage/" + i);
    body = await response.text();
    $ = await cheerio.load(body);
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
        const date = $(insideDivs[4]).find("b").text().split("-")[0].trim();
        const time = $(insideDivs[4]).find("b").text()?.split("-")[1]?.trim();
        data.push({
          image: image,
          address: address,
          type: type,
          status: status,
          deposit: deposit,
          postpone: postpone,
          date: date,
          time: time,
          logo: logo,
          link: url
        });
      } else {
        const date = $(insideDivs[4]).find("b").text().split("-")[0].trim();
        const time = $(insideDivs[4]).find("b").text().split("-")[1].trim();
        data.push({
          image: image,
          address: address,
          type: type,
          status: status,
          deposit: deposit,
          date: date,
          time: time,
          link: url,
          logo: logo,
        });
      }
    });
  }

  return data;
};

// crawl({
  // url: "https://www.re-auctions.com/Auction-Schedule/PropertyAgentName/-1/sortBy/cf11",
// });

export default crawl;
