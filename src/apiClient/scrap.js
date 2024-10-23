import scrapToDatabase from "../controllers/scrapToDatabase.js";
import knex from "knex";
import objection from "objection";
import knexConfig from "../../knexfile.cjs";

const knexConnection = knex(knexConfig);

objection.Model.knex(knexConnection);


// const knex = Knex(knexConfig);
// Model.knex(knex);

// scrapToDatabase();