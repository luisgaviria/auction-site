import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "http://tacheauctionsandsales.com/images/ta.png?crc=3835416695";

  let data = [];

  let trs = $("body > div > div > div > table > tbody > tr").toArray();
  for (let i = 0; i < 4; i++) {
    trs.shift();
  }

  trs.map((tr) => {
    const tds = $(tr).find("td");
    const date = $(tds[0]).text().substring(1).replace("/0", "/").replace("/21", "/2021");
    const time = $(tds[1]).text();
    let address = $(tds[2]).text();
    const city = $(tds[3]).text();
    const state = $(tds[4]).text();
    const zip = $(tds[5]).text();
    const status = $(tds[6]).text();
    const deposit = $(tds[7]).text();

    address += " " + city + ", " + state;

    data.push({
      logo: logo,
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

  data = data.filter((record) => {
    if (record.status.search("PP") == -1) {
      return record;
    }
  });

  return data;
};

crawl({
  url:
    "https://docs.google.com/spreadsheets/u/1/d/14nrcaKBhCA61FcnBwU6EbiDbRQtOP-gQVxJVvxg5_o0/pubhtml/sheet?headers=false&gid=0",
});

export default crawl;
