import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Node } from "../node/node.entity";
import { StashController } from "./stash.controller";
import { StashService } from "./stash.service";

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  controllers: [StashController],
  providers: [StashService],
})
export class StashModule {}
