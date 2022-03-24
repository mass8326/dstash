import { Controller, Get } from "@nestjs/common";
import { Node } from "../node/node.entity";
import { StashService } from "./stash.service";

@Controller("stash")
export class StashController {
  constructor(private stashSvc: StashService) {}

  @Get()
  async get(): Promise<Node[]> {
    return this.stashSvc.consume();
  }
}
