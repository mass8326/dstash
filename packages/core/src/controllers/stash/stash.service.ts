import crypto from "crypto";
import fs from "fs/promises";
import { resolve } from "path";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Node } from "../node/node.entity";

@Injectable()
export class StashService {
  constructor(
    @InjectRepository(Node) private nodeRep: EntityRepository<Node>
  ) {}

  async consume() {
    const dropoff = resolve(process.env.STASH_DIR ?? "stash", "dropoff");
    const files = await fs.readdir(dropoff);
    const nodes = await Promise.all(
      files.map(async (name) => {
        const path = resolve(dropoff, name);
        const hash = crypto
          .createHash("sha256")
          .update(await fs.readFile(path))
          .digest("hex");
        const node = new Node(hash);
        await this.nodeRep.persist(node);
        return node;
      })
    );
    this.nodeRep.flush();
    return nodes;
  }
}
