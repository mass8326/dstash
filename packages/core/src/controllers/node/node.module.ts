import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { NodeController } from "./node.controller";
import { Node } from "./node.entity";
import { NodeResolver } from "./node.resolver";
import { NodeService } from "./node.service";

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  controllers: [NodeController],
  providers: [NodeService, NodeResolver],
  exports: [NodeService, NodeResolver],
})
export class NodeModule {}
