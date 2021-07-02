/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("auctions", (table) => {
    table.bigIncrements("id").primary();
    table.string("address", 1000000).notNullable();
    table.string("city", 1000000);
    table.string("state", 1000000);
    table.string("time", 1000000);
    table.string("logo", 1000000);
    table.string("status", 1000000);
    table.string("link", 1000000);
    table.date("date", 1000000);
    table.string("deposit", 1000000);
    // table.bigInteger("userId").unsigned().index().notNullable().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("auctions");
};
