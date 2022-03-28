import { MikroORM } from "@mikro-orm/core";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

const logger = new Logger("Database");

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}
  onApplicationBootstrap() {
    logger.log("Attempting migrations...");
    return this.orm.getMigrator().up();
  }
}
