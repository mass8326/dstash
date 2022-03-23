import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Controller, Get } from "@nestjs/common";
import { Node } from "../node/node.entity";
import { StashService } from "./stash.service";

@Controller("stash")
export class StashController {
  constructor(
    @InjectRepository(Node) private nodeRep: EntityRepository<Node>,
    private stashSvc: StashService
  ) {}

  @Get()
  async get() {
    return this.stashSvc.consume();
  }
}
