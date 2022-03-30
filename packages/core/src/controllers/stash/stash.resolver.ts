import { Injectable } from "@nestjs/common";
import { Resolver, Mutation } from "type-graphql";
import { Node } from "../node/node.entity";
import { StashService } from "./stash.service";

@Resolver()
@Injectable()
export class StashResolver {
  constructor(private readonly stashSvc: StashService) {}

  @Mutation(() => [Node])
  stashConsume() {
    return this.stashSvc.consume();
  }
}
