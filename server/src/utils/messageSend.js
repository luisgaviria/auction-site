import User from "../models/User.js";
import Favorite from "../models/Favorite.js";
import filterFavorite from "../utils/filterFavorites.js";
const accountSid = "AC67aca721d5fe9c0966e75450ff6eae59"; //  process.env.TWILIO_ACCOUNT_SID;
const authToken = "ec378ebcd0cf20e9e058e31551f5610c"; // process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = "+15672294953";
import twilio from "twilio";

const client = twilio(accountSid, authToken);

const messageSend = async () => {
  const users = await User.query();
  const phoneNumberUsers = users.filter((user) => {
    if (user.phoneNumber) {
      return user;
    }
  });

  phoneNumberUsers.forEach(async (user) => {
    const favorites = await filterFavorite(user.id);
    const actualDateFavorites = favorites.filter((favorite) => {
      if (favorite.date.toDateString() == new Date().toDateString()) {
        return favorite;
      }
      // console.log(favorite.date.toDateString());
      // console.log(new Date().toDateString());
    });
    let body = "\nYour Favorites auctions for today: ";
    let n = 0;
    for (const favorite of actualDateFavorites) {
      n++;
      body += `\nAddress-${n}: ${favorite.address}`;
    }

    // body += "http://www.auctionandcompany.com/";

    var message = client.messages
      .create({
        body: body,
        from: phoneNumber,
        to: "+1" + user.phoneNumber,
      })
      .then((message) => console.log(message.status))
      .done();
  });
};

export default messageSend;
