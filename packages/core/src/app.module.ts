import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StashModule } from "./stash/stash.module";
import { DatabaseModule } from "./database/database.module";
import { TrpcModule } from "./trpc/trpc.module";
import { EntitiesModule } from "./entities/entities.module";

@Module({
  imports: [DatabaseModule, TrpcModule, StashModule, EntitiesModule],
  controllers: [AppController],
})
export class AppModule {}
