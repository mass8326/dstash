import { Controller } from "@nestjs/common";
import { Node } from "../node/node.entity";
import { StashService } from "./stash.service";
import { GetSwitch } from "../switch.controller";

@Controller()
export class StashController {
  constructor(private stashSvc: StashService) {}

  @GetSwitch("stash")
  async get(): Promise<Node[]> {
    return this.stashSvc.consume();
  }
}
