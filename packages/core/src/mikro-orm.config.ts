import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { resolve, basename } from "path";
import { Options } from "@mikro-orm/core";
import { Migration } from "@mikro-orm/migrations";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const dbName = process.env.STASH_DIR
  ? resolve(process.env.STASH_DIR, "data.db")
  : "dev.db";
console.log(`Using ${dbName}`);

// Webpack workaround to import all migrations from folder
const context = require.context("../migrations", false, /\.ts$/);
const migrationsList = context.keys().map((key) => {
  const constructor = Object.values(context(key))[0] as new () => Migration;
  return {
    name: basename(key),
    class: constructor,
  };
});

const config: Options<BetterSqliteDriver> = {
  // Database
  dbName,
  type: "better-sqlite",
  migrations: { migrationsList },
  // Entities
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  // Logging
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
