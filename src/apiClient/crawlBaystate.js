import puppeteer from "puppeteer";

const crawl = async ({ url }) => {
  const logo =
    "";
  const link = "https://auction-site-ma.herokuapp.com/auction_photos/baystate.webp";

  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.waitForSelector("#main > div.row.main > script");
  let value = await page.evaluate((el) => el.innerText, element);
  value =
    "[" +
    value
      .toString()
      .split("[")[1]
      .trim()
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .replace(/  +/g, " ")
      .trim();
  value = value.replace("},]", "}]");
  //console.log(value);

  let data = JSON.parse(value);
  data = data.filter((record) => {
    if (record.date.search("Postponed") == -1 && record.date.search("IS CANCELLED") == -1) {
      record.date = record.date.split(" <s")[0].replace("at", "@");
      const date = new Date(record.date).toLocaleDateString();
      record.date = date;
      record.link = link;
      record.logo = logo;

      return record;
    }
  });
  data.map((record) => {
    record.address = record.address + " " + record.city + ", " + record.state;
    delete record.state;
    delete record.city;
  });
  browser.close();
  // console.log(data);
  return data;
};

crawl("https://www.baystateauction.com/auctions/state/ma");

export default crawl;
