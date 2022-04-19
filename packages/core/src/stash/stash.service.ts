import crypto from "crypto";
import { join, resolve } from "path";
import { EntityRepository } from "@mikro-orm/better-sqlite";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import fs from "fs-extra";
import { Entry } from "../entities/entry/entry.entity";
import { Tag } from "../entities/tag/tag.entity";
import { TagRepository } from "../entities/tag/tag.repository";

@Injectable()
export class StashService {
  constructor(
    @InjectRepository(Entry) private entryRep: EntityRepository<Entry>,
    @InjectRepository(Tag) private tagRep: TagRepository
  ) {}

  async consume() {
    const root = resolve(process.env.STASH_DIR ?? "sample");
    const dropoff = join(root, "dropoff");
    const stashed = join(root, "stashed");
    const files = await fs.readdir(dropoff);
    const success: Entry[] = [];
    const failure: [string, unknown][] = [];
    await Promise.all(
      files.map(async (name) => {
        try {
          const path = join(dropoff, name);
          const hash = crypto
            .createHash("sha256")
            .update(await fs.readFile(path))
            .digest("hex");
          const ext = name.split(".").pop();
          const arr = [...hash];
          const rename =
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.join("")}` +
            (ext ? `.${ext}` : "");
          const dest = join(stashed, rename);
          await fs.move(path, dest);
          success.push(new Entry(hash, rename, ext));
        } catch (err: any) {
          failure.push([name, err?.code ?? err]);
        }
      })
    );
    if (success.length) {
      // Attach a default tag
      const tag = await this.tagRep.findOneOrPersist(["meta", "default"]);
      for (const entry of success) entry.tags.add(tag);
      await this.entryRep.persist(success).flush();
    }
    if (failure.length) console.warn("Imports failed:", failure);
    return success;
  }
}
