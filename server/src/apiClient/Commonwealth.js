import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const logo = "https://i.postimg.cc/JnBtmSVs/logocomm.gif";

  const real_data = [];
  let data = [];
  let temp_data = [];
  const links = $(
    "body > table.menu > tbody > tr:nth-child(2) > td.pagebody > table > tbody > tr > td:nth-child(2) > div"
  )
    .toArray()
    .map((element) => {
      temp_data.push($(element).text());
      if ($(element).find("img").attr("src") == "images/mapquest.gif") {
        data.push(temp_data);
        temp_data = [];
      }
    });

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      data[i][j] = data[i][j].trim();
    }
  }

  data = data.filter((article) => {
    if (!article[6].length) {
      return article;
    }
  });
  data.map((article) => {
    real_data.push({
      status: "On schedule" || article[0],
      logo: logo,
      date: article[1].split(" ")[0].replace("/2021", "/21"),
      link: url,
      address: article[2],
      deposit: article[4],
    });
  });

  return real_data;
};

crawl({
  url: "http://www.commonwealthauction.com/auctions.asp?location=1",
});

export default crawl;
