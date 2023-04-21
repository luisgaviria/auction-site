import scrapToDatabase from "../controllers/scrapToDatabase.js";
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "../../knexfile.cjs";
const knex = Knex(knexConfig);
Model.knex(knex);

scrapToDatabase();