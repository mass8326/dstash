import crypto from "crypto";
import fs from "fs/promises";
import { resolve } from "path";
import { Injectable } from "@nestjs/common";
import { Node } from "../node/node.entity";
import { NodeService } from "../node/node.service";

@Injectable()
export class StashService {
  constructor(private nodeSvc: NodeService) {}

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
        return new Node(hash);
      })
    );
    this.nodeSvc.write(nodes);
    return nodes;
  }
}
