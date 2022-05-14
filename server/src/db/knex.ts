import { knex, Knex } from "knex";

const config: Knex.Config = {
  client: "postgres",
  connection: {
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432,
  },
  useNullAsDefault: true,
  seeds: {
    directory: "./seeds",
  },
};

export const pg = knex(config);

export default config;
