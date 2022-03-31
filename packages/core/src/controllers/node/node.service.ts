import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs-extra";
import { join } from "path";
import { Node } from "./node.entity";

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node) private nodeRep: EntityRepository<Node>
  ) {}

  findAll() {
    return this.nodeRep.findAll();
  }

  write(input: Node | Node[]) {
    return this.nodeRep.persist(input).flush();
  }

  async stream(hash: string) {
    const node = await this.nodeRep.findOne({ hash });
    if (!node) return null;
    return createReadStream(
      join(process.env.STASH_DIR ?? "sample", "stashed", node?.path)
    );
  }
}
