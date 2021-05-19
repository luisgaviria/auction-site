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
    table.string("status", 1000000).notNullable();
    table.date("date", 1000000);
    table.integer("deposit", 1000000);
    table.bigInteger("userId").unsigned().index().notNullable().references("users.id");
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
