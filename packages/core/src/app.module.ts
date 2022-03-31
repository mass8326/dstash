import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { NodeModule } from "./controllers/node/node.module";
import { StashModule } from "./controllers/stash/stash.module";
import { DatabaseModule } from "./database/database.module";
import { TrpcModule } from "./trpc/trpc.module";

@Module({
  imports: [DatabaseModule, TrpcModule, StashModule, NodeModule],
  controllers: [AppController],
})
export class AppModule {}
