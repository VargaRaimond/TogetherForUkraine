import { knex } from "knex";

export const pg = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
  useNullAsDefault: true,
});
