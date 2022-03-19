import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { resolve } from "path";
import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Node } from "./entities";

const dbName = process.env.STASH_DIR
  ? resolve(process.env.STASH_DIR, "data.db")
  : "dev.db";
console.log(`Using ${dbName}`);

const config: Options<BetterSqliteDriver> = {
  // Database
  type: "better-sqlite",
  dbName,
  // Entities
  entities: [Node],
  metadataProvider: TsMorphMetadataProvider,
  migrations: { path: "dist/migrations" },
  // Logging
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
