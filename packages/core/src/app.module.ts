import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { NodeModule } from "./controllers/node/node.module";
import { StashModule } from "./controllers/stash/stash.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [DatabaseModule, StashModule, NodeModule],
  controllers: [AppController],
})
export class AppModule {}
