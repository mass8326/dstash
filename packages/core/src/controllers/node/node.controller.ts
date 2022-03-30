import { Controller } from "@nestjs/common";
import { NodeService } from "./node.service";
import { Get } from "@nestjs/common";

@Controller("node")
export class NodeController {
  constructor(private readonly nodeSvc: NodeService) {}

  @Get()
  findAll() {
    return this.nodeSvc.findAll();
  }
}
