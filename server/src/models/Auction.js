const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["address"],
  identifiers: ["id"],
});

class Auction extends unique(Model) {
  static get tableName() {
    return "auctions";
  }
  static get relationMappings() {
    const { Favorite, User } = require("./index.js");
    return {
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: "auctions.id",
          to: "favorites.auctionId",
        },
      },
      // user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User,
      //   join: {
      //     from: "auctions.userId",
      //     to: "users.id",
      //   },
      // },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      status: { type: "string", minLength: 1, maxLength: 300 },
      address: { type: "string" },
    };
  }
}

module.exports = Auction;
