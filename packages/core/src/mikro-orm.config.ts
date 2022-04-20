import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { homedir } from "os";
import { resolve, basename } from "path";
import { MigrationsOptions, Options } from "@mikro-orm/core";
import { Migration } from "@mikro-orm/migrations";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const dbName = process.env.STASH_DIR
  ? resolve(process.env.STASH_DIR, "data.db")
  : resolve(homedir(), ".dstash/data.db");

const migrations: MigrationsOptions = module.hot
  ? // Webpack development server config
    (() => {
      const context = require.context("./migrations", false, /\.ts$/);
      const migrationsList = context.keys().map((key) => {
        const constructor = Object.values(
          context(key)
        )[0] as new () => Migration;
        return {
          name: basename(key),
          class: constructor,
        };
      });
      return { migrationsList };
    })()
  : // Production config
    { path: resolve(__dirname, "./migrations") };

const config: Options<BetterSqliteDriver> = {
  // Database
  dbName,
  type: "better-sqlite",
  migrations,
  // Entities for CLI
  entities: [resolve(__dirname, "./**/*.entity.ts")],
  // Logging
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
