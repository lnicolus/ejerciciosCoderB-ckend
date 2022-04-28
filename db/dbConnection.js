import knex from "knex";
import { newDB } from "./newDB.js";

export const mariadb = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "db",
  },
});

export const sqlite3 = knex({
  client: "sqlite3",
  connection: { filename: "./db/db.sqlite3" },
  useNullAsDefault: true,
});

export const mariadbBase = new newDB(mariadb, "products");
export const sqlite3Base = new newDB(sqlite3, "messages");
