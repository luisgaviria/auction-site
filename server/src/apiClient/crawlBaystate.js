import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  // const link = $("#DataTables_Table_0 > tbody").text();

  // for (let i = 0; i < 5; i++) {
  //   trs.shift();
  // }

  // console.log(trs);
  // });

  // trs.map((tr) => {
  //   const tds = $(tr).find("td");
  //   const date = $(tds[0]).text().substring(1);
  //   const time = $(tds[1]).text();
  //   const address = $(tds[2]).text();
  //   const city = $(tds[3]).text();
  //   const state = $(tds[4]).text();
  //   const zip = $(tds[5]).text();
  //   const status = $(tds[6]).text();
  //   const deposit = $(tds[7]).text();
  // console.log(data);
  return data;
};

crawl({
  url: "https://www.baystateauction.com/auctions/state/ma",
});

export default crawl;
