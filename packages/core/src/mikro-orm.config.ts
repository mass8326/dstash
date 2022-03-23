import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { resolve } from "path";
import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const dbName = process.env.STASH_DIR
  ? resolve(process.env.STASH_DIR, "data.db")
  : "dev.db";
console.log(`Using ${dbName}`);

const config: Options<BetterSqliteDriver> = {
  // Database
  dbName,
  type: "better-sqlite",
  migrations: { path: "dist/migrations", pathTs: "src/migrations" },
  // Entities
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  // Logging
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
