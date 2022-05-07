// tslint:disable-next-line:no-var-requires
export const pg = require("knex")({
    client: "postgres",
    connection: {
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
    },
    useNullAsDefault: true,
});
