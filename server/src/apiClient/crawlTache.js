import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const data = [];

  let trs = $("body > div > div > div > table > tbody > tr").toArray();
  for (let i = 0; i < 4; i++) {
    trs.shift();
  }

  trs.map((tr) => {
    const tds = $(tr).find("td");
    const date = $(tds[0]).text().substring(1).replace("/0", "/");
    const time = $(tds[1]).text();
    const address = $(tds[2]).text();
    const city = $(tds[3]).text();
    const state = $(tds[4]).text();
    const zip = $(tds[5]).text();
    const status = $(tds[6]).text();
    const deposit = $(tds[7]).text();

    data.push({
      date: date,
      time: time,
      address: address,
      city: city,
      state: state,
      zip: zip,
      status: status,
      deposit: deposit,
      link: url,
    });
  });
  data.pop();

  return data;
};

crawl({
  url:
    "https://docs.google.com/spreadsheets/u/1/d/14nrcaKBhCA61FcnBwU6EbiDbRQtOP-gQVxJVvxg5_o0/pubhtml/sheet?headers=false&gid=0",
});

export default crawl;
