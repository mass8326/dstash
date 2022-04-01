import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { EntitiesModule } from "./entities/entities.module";
import { StashModule } from "./stash/stash.module";
import { TrpcModule } from "./trpc/trpc.module";

@Module({
  imports: [DatabaseModule, TrpcModule, StashModule, EntitiesModule],
  controllers: [AppController],
})
export class AppModule {}
