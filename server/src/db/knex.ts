import { knex, Knex } from "knex";

const config: Knex.Config = {
  client: "postgres",
  connection: {
    host : 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: 5432,
  },
  useNullAsDefault: true,
  seeds: {
    directory: "./seeds",
  },
};

export const pg = knex(config);

export default config;
