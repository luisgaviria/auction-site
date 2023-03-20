import * as cheerio from "cheerio";
import fetch from "node-fetch";

const crawl = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = await cheerio.load(body);
  //console.log($.html());
  let data = [];
  await Promise.all(
    $("#block-yui_3_17_2_1_1617145124998_5821 > div > div > div > div > div")
      .toArray()
      .map(async (div) => {
        const month = $(div).find("span.summary-thumbnail-event-date-month").text();
        const date = $(div).find("span.summary-thumbnail-event-date-day").text();
        const title = $(div).find("div.summary-title > a").text();
        const href = "https://www.amgauction.com" + $(div).find("a").attr("href");
        const response_details_page = await fetch(href);
        const body_details_page = await response_details_page.text();
        const $2 = await cheerio.load(body_details_page);
        const details = $2("#page").find(".sqs-block-content");
        const time_start = await $2("#page").find("time.event-time-12hr-start").text();
        const logo = "https://auction-site-ma.herokuapp.com/auction_photos/amg.webp";
        //console.log(time_start);

        await details
          .find("p")
          .toArray()
          .map(async (item) => {
            let temp_info = $2(item).html().split("<br>");
            const keys = [];
            const values = [];
            for (let i = 0; i < temp_info.length; i++) {
              temp_info[i] = temp_info[i].replace("<strong>", "");
              temp_info[i] = temp_info[i].replace("</strong>", "");
              temp_info[i] = temp_info[i].replace(/&nbsp;/g, "");
              const key = temp_info[i].split(":")[0];
              const value = temp_info[i].split(":")[1];
              keys.push(key);
              values.push(value);
            }
            const object = {};
            for (let i = 0; i < keys.length; i++) {
              object[keys[i]] = values[i];
            }
            const formatted_date = new Date(month + " " + date + " " + "2021").toLocaleDateString();
            data.push({
              address: title,
              date: formatted_date,
              time: time_start,
              logo: logo,
              ...object,
            });
          });
      })
  );

  data = data.filter((item) => {
    const keys = Object.keys(item);
    if (keys.length > 10) {
      return item;
    }
  });

  data = data.filter((item) => {
    if (item.address.search("CANCELLED") == -1) {
      return item;
    }
  });

  for (let auction of data) {
    if (auction.Terms) {
      const array = auction.Terms.split(" ");
      for (const item of array) {
        //console.log(item.toString().search('.00'));
        if (item.toString().search(".00") != -1) {
          //console.log(item);
          auction.deposit = item;
        }
      }
    }
  }

  return data;
};

crawl({
  url: "https://www.amgauction.com/",
});

export default crawl;
