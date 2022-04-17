import { join } from "path";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs-extra";
import { Tag } from "../tag/tag.entity";
import { TagRepository } from "../tag/tag.repository";
import { Entry } from "./entry.entity";

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry) private entryRep: EntityRepository<Entry>,
    @InjectRepository(Tag) private tagRep: TagRepository
  ) {}

  one(id: number) {
    // Destructure id to prevent typecasting 0 to false
    return this.entryRep.findOne({ id });
  }

  all() {
    return this.entryRep.findAll();
  }

  page(limit: number, offset: number) {
    return this.entryRep.findAndCount({}, { limit, offset });
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
      this.tagRep.findOneOrCreate(composite),
    ]);
    if (!entry) return null;
    entry.tags.add(tag);
    await this.entryRep.flush();
    return entry;
  }

  async stream(id: number) {
    const entry = await this.entryRep.findOne({ id });
    if (!entry) return null;
    return createReadStream(
      join(process.env.STASH_DIR ?? "sample", "stashed", entry?.path)
    );
  }
}
