import { Controller } from "@nestjs/common";
import { NodeService } from "./node.service";
import { GetSwitch } from "../switch.controller";

@Controller()
export class NodeController {
  constructor(private readonly nodeSvc: NodeService) {}

  @GetSwitch("node")
  findAll() {
    return this.nodeSvc.findAll();
  }
}
