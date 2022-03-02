const tableName = "favorites";
/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id");
      table.string("address", 1000000).notNullable();
      table.string("city", 1000000);
      table.string("state", 1000000);
      table.string("time", 1000000);
      table.string("logo", 1000000);
      table.string("status", 1000000);
      table.string("link", 1000000);
      table.date("date", 1000000);
      table.string("deposit", 1000000);
      table.string("lat", 1000000);
      table.string("lng", 1000000);
      table.bigInteger("userId").unsigned().notNullable().index().references("users.id");
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  }

  console.log(`${tableName} already exists; skipping`);
  return 1;
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.dropTableIfExists(tableName);
};
