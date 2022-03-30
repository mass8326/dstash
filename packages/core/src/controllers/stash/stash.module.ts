import { Module } from "@nestjs/common";
import { NodeModule } from "../node/node.module";
import { StashController } from "./stash.controller";
import { StashResolver } from "./stash.resolver";
import { StashService } from "./stash.service";

@Module({
  imports: [NodeModule],
  controllers: [StashController],
  providers: [StashService, StashResolver],
})
export class StashModule {}
