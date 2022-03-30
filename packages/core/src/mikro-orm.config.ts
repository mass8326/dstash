import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { resolve, basename } from "path";
import { MigrationsOptions, Options } from "@mikro-orm/core";
import { Migration } from "@mikro-orm/migrations";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const dbName = process.env.STASH_DIR
  ? resolve(process.env.STASH_DIR, "data.db")
  : "dev.db";

// Webpack dev server workaround to import all migrations from folder
const migrations: MigrationsOptions = module.hot
  ? (() => {
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
  : {
      path: resolve(__dirname, "../dist/migrations"),
      pathTs: resolve(__dirname, "../src/migrations"),
    };

const config: Options<BetterSqliteDriver> = {
  // Database
  dbName,
  type: "better-sqlite",
  migrations,
  // Entities
  entities: [resolve(__dirname, "../dist/**/*.entity.js")],
  entitiesTs: [resolve(__dirname, "../src/**/*.entity.ts")],
  // Logging
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
