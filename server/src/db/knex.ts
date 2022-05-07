// tslint:disable-next-line:no-var-requires

import { knex } from "knex";

export const pg = knex({
    client: "postgres",
    connection: {
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
    },
    useNullAsDefault: true,
});
