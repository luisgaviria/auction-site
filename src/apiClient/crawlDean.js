import * as cheerio from "cheerio";
import fetch from "node-fetch";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "https://auction-site-ma.herokuapp.com/auction_photos/dean.webp";

  let data = [];

  let links = $("body > center:nth-child(2) > table > tbody > tr")
    .toArray()
    .map((item) => {
      const tds = $(item).find("td");
      let date = new Date(
        $(tds[0]).text().trim().replace(/\n/g, "").replace(/\t/g, "").replace(/  +/g, " ").trim()
      ).toLocaleDateString();

      // let date = new Date($(tds[0]).text().trim("\n")).toLocaleDateString();
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
        logo: logo,
        date: date,
        hour: hour,
        address: address,
        deposit: deposit,
        balance_due: balance_due,
        link: url,
      });
    });

  data.pop();
  data.shift();
  data.shift();

  data = data.filter((article) => {
    if (article.address.search("CANCELLED") < 0) {
      return article;
    }
    // console.log(article.address.search("CANCELLED"));
  });

  // console.log(data);
  return data;
};

// crawl({
//   url: "http://www.deanassociatesinc.com/auctions.htm",
// });

export default crawl;
