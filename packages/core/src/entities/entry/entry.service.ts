import { join } from "path";
import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs-extra";
import { Tag } from "../tag/tag.entity";
import { TagRepository } from "../tag/tag.repository";
import { TagService } from "../tag/tag.service";
import { Entry } from "./entry.entity";

export type EntryTagEdit = {
  add?: [string, string][];
  del?: [string, string][];
};

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry) private entryRep: EntityRepository<Entry>,
    @InjectRepository(Tag) private tagRep: TagRepository,
    private tagSvc: TagService,
    private orm: MikroORM
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
    const tags = await entry.tags.loadItems();
    return Promise.all(tags.map(this.tagSvc.injectCount));
  }

  async tagEdit(id: number, input: EntryTagEdit) {
    const [entry, adds, dels] = await Promise.all([
      this.entryRep.findOne(id, { populate: ["tags"] }),
      Promise.all(
        input.add?.map((tuple) => this.tagRep.findOneOrPersist(tuple)) ?? []
      ),
      Promise.all(
        input.del?.map((tuple) => this.tagRep.findOneOrFail(tuple)) ?? []
      ),
    ]);
    if (!entry) return null;
    entry.tags.add(...adds);
    entry.tags.remove(...dels);
    this.tagRep.flush();
    const tags = await Promise.all(
      [...entry.tags].map(async (tag) => ({
        ...tag,
        count: await tag.entries.loadCount(),
      }))
    );
    return tags;
  }

  async stream(id: number) {
    const entry = await this.entryRep.findOne({ id });
    if (!entry) return null;
    return createReadStream(
      join(this.orm.config.get("dbName"), "../stashed", entry?.path)
    );
  }
}
