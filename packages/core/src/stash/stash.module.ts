import { Module } from "@nestjs/common";
import { EntryModule } from "../entities/entry/entry.module";
import { StashController } from "./stash.controller";
import { StashResolver } from "./stash.resolver";
import { StashService } from "./stash.service";

@Module({
  imports: [EntryModule],
  controllers: [StashController],
  providers: [StashService, StashResolver],
  exports: [StashResolver],
})
export class StashModule {}
