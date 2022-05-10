import { knex, Knex } from "knex";

const config: Knex.Config = {
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
  useNullAsDefault: true,
  seeds: {
    directory: "./seeds",
  },
};

export const pg = knex(config);

export default config;
