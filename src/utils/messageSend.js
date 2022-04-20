import User from "../models/User.js";
import Favorite from "../models/Favorite.js";
import filterFavorite from "../utils/filterFavorites.js";
// import dotenv from "dotenv";

import twilio from "twilio";

// We need to comment out this dotenv function when we deploy to Heroku
// dotenv.config();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const messageSend = async () => {
  const users = await User.query();
  const phoneNumberUsers = users.filter((user) => {
    if (user.phoneNumber) {
      return user;
    }
  });
  // console.log(users);
  // console.log(phoneNumberUsers);

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
        from: process.env.PHONE_NUMBER,
        to: "+1" + user.phoneNumber,
      })
      .then((message) => console.log(message.status))
      .done();
  });
};

export default messageSend;
