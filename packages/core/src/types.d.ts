import type { Node } from "./entities";
import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import type { EntityRepository, MikroORM } from "@mikro-orm/core";

export type Mikro = MikroORM<BetterSqliteDriver>;
export type Database = {
  orm: Mikro;
  em: Mikro["em"];
  node: EntityRepository<Node>;
};

declare module "koa" {
  export interface DefaultState {
    db: Database;
  }
}
