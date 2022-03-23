import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { NodeController } from "./node.controller";
import { Node } from "./node.entity";
import { NodeService } from "./node.service";

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
