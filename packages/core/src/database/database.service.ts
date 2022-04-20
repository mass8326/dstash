import { resolve } from "path";
import { MikroORM } from "@mikro-orm/core";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

const logger = new Logger("Database");

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}
  async onApplicationBootstrap() {
    await this.migrate();
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
