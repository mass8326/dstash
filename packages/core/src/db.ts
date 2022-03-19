import type { Database } from "./types.d";
import type { BetterSqliteDriver } from "@mikro-orm/better-sqlite";
import { MikroORM } from "@mikro-orm/core";
import { Node } from "./entities";

export async function init(): Promise<Database> {
  const orm = await MikroORM.init<BetterSqliteDriver>();
  const em = orm.em;
  await orm.getMigrator().up();
  return { orm, em, node: em.getRepository(Node) };
}
