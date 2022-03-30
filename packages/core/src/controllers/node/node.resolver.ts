import { EntityRepository } from "@mikro-orm/better-sqlite";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Resolver, Query } from "type-graphql";
import { Node } from "./node.entity";

@Resolver()
@Injectable()
export class NodeResolver {
  constructor(
    @InjectRepository(Node) private nodeRep: EntityRepository<Node>
  ) {}

  @Query(() => [Node])
  nodes() {
    return this.nodeRep.findAll();
  }
}
