const Model = require("./Model");

class Favorite extends Model {
  static get tableName() {
    return "favorites";
  }

  static get relationMappings() {
    const Auction = require("./Auction.js");
    const User = require("./User.js");

    return {
      // auction: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: Auction,
      //   join: {
      //     from: "favorites.auctionId",
      //     to: "auctions.id",
      //   },
      // },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "favorites.userId",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        comments: { type: "string", minLength: 1, maxLength: 255 },
        auctionId: { type: ["string", "integer"] },
      },
    };
  }
}

module.exports = Favorite;
