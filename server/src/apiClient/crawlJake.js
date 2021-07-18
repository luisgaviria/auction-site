import * as cheerio from "cheerio";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = await cheerio.load(body);
  const logo = "https://www.jkauctioneers.com/images/jksm.gif";
  const data = [];
  const ps = $("body").find("font").find('p[align="left"]').toArray();
  for (const p of ps) {
    const fonts = $(p).find("font").toArray();

    const href = "https://www.jkauctioneers.com/" + $(p).find("a").attr("href");
    const address = $(fonts[0]).text().split("\n")[1];
    const date = $(fonts[1]).text().trim();
    const status = $(fonts[2]).text().trim().length ? $(fonts[2]).text().trim() : "On Schedule";

    const response2 = await fetch(href);
    const body2 = await response2.text();
    const $2 = await cheerio.load(body2);
    const deposit = "$" + $2("body").text().split("TERMS")[1]?.trim().split(")")[0].split("$")[1];
    data.push({
      address: address,
      date: new Date(date.split("AT")[0].replace(",", "")).toLocaleDateString(),
      status: status,
      deposit: deposit,
      logo: logo,
    });
  }
  data.shift();
  //console.log(data);

  return data;
};

crawl({
  url: "https://www.jkauctioneers.com/list1.htm",
});

export default crawl;
