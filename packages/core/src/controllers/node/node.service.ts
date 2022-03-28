import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Node } from "./node.entity";

@Injectable()
export class NodeService {
  constructor(private orm: MikroORM) {}

  @UseRequestContext()
  findAll() {
    return this.orm.em.getRepository(Node).findAll();
  }

  @UseRequestContext()
  write(input: Node | Node[]) {
    return this.orm.em.getRepository(Node).persist(input).flush();
  }
}
