import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs-extra";
import { join } from "path";
import { Tag } from "../tag/tag.entity";
import { Entry } from "./entry.entity";

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry) private entryRep: EntityRepository<Entry>,
    @InjectRepository(Tag) private tagRep: EntityRepository<Tag>
  ) {}

  one(id: number) {
    return this.entryRep.findOne(id);
  }

  all() {
    return this.entryRep.findAll();
  }

  write(input: Entry | Entry[]) {
    return this.entryRep.persist(input).flush();
  }

  async tags(id: number) {
    const entry = await this.entryRep.findOne(id);
    if (!entry) return null;
    return entry.tags.loadItems();
  }

  async tagAdd(id: number, composite: [string, string]) {
    const [entry, tag] = await Promise.all([
      this.entryRep.findOne(id, { populate: ["tags"] }),
      this.tagRep.findOne(composite),
    ]);
    if (!entry) return null;
    entry.tags.add(tag ?? new Tag(composite));
  }

  async stream(id: number) {
    const entry = await this.entryRep.findOne({ id });
    if (!entry) return null;
    return createReadStream(
      join(process.env.STASH_DIR ?? "sample", "stashed", entry?.path)
    );
  }
}
