// include all of your models here using CommonJS requires
const User = require("./User.js");
const Favorite = require("./Favorite.js");
const Auction = require("./Auction.js");
const Model = require("./Model.js");

module.exports = { User, Model, Auction, Favorite };
