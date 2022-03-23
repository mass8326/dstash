import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Node } from "./node.entity";

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node) private nodeRep: EntityRepository<Node> // private readonly em: EntityManager
  ) {}

  findAll() {
    return this.nodeRep.findAll();
    // return this.em.getRepository(Node).findAll();
  }
}
