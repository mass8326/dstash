import { resolve } from "path";
import { MikroORM } from "@mikro-orm/core";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { flatcatch } from "dstash-util";
import { outputJson, pathExists, readJson } from "fs-extra";
import { uniqBy } from "lodash";
import { z, ZodType } from "zod";
import { STD_META, STD_PATH } from "../mikro-orm.config";

const logger = new Logger("Database");

type Collection = { name: string; path: string };
const collectionSchema: ZodType<Collection> = z.object({
  name: z.string(),
  path: z.string(),
});
type Meta = { collections: Collection[] };
const metaSchema: ZodType<Meta> = z.object({
  collections: z.array(collectionSchema),
});

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}
  async onApplicationBootstrap() {
    if (!(await pathExists(STD_META)))
      outputJson(STD_META, {
        collections: [{ name: "Default", path: STD_PATH }],
      });
    await this.migrate();
  }

  async list() {
    const [meta, err] = await flatcatch(() => readJson(STD_META));
    if (err) return logger.error(err);
    const result = metaSchema.parse(meta);
    return result;
  }

  async add(input: { name: string; path: string }) {
    const [meta, err] = await flatcatch(() => readJson(STD_META));
    if (err) return logger.error(err);
    const result = metaSchema.parse(meta);
    result.collections.push(input);
    result.collections = uniqBy(result.collections, "name");
    result.collections = uniqBy(result.collections, "path");
    await outputJson(STD_META, result);
    return result.collections;
  }

  async del(name: string) {
    const [meta, err] = await flatcatch(() => readJson(STD_META));
    if (err) return logger.error(err);
    const result = metaSchema.parse(meta);
    const index = result.collections.findIndex((col) => col.name === name);
    result.collections = [
      ...result.collections.slice(0, index),
      ...result.collections.slice(index + 1),
    ];
    await outputJson(STD_META, result);
    return meta;
  }

  async reconnect(path: string) {
    await this.orm.close();
    this.orm.config.set("dbName", resolve(path, "data.db"));
    await this.orm.connect();
    await this.migrate();
  }

  async migrate() {
    logger.log("Attempting migrations...");
    await this.orm.getMigrator().up();
  }
}
