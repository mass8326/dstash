import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Entry } from "../entities/entry/entry.entity";
import { Tag } from "../entities/tag/tag.entity";
import { StashController } from "./stash.controller";
import { StashResolver } from "./stash.resolver";
import { StashService } from "./stash.service";

@Module({
  imports: [MikroOrmModule.forFeature([Entry, Tag])],
  controllers: [StashController],
  providers: [StashService, StashResolver],
  exports: [StashResolver],
})
export class StashModule {}
