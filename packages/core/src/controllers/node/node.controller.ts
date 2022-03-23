import { Controller, Get } from "@nestjs/common";
import { NodeService } from "./node.service";

@Controller("node")
export class NodeController {
  constructor(private readonly nodeSvc: NodeService) {}

  @Get()
  findAll() {
    return this.nodeSvc.findAll();
  }
}
