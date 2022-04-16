import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Tag } from "./tag.entity";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRep: EntityRepository<Tag>) {}

  one(composite: [string, string]) {
    return this.tagRep.findOne(composite);
  }

  async all() {
    const tags = await this.tagRep.findAll({});
    const mapped = await Promise.all(
      tags.map(async (tag) => ({
        ...tag,
        entriesCount: await tag.entries.loadCount(),
      }))
    );
    return mapped;
  }

  write(input: Tag | Tag[]) {
    return this.tagRep.persist(input).flush();
  }

  async entries(composite: [string, string]) {
    const one = await this.tagRep.findOne(composite);
    return one?.entries.loadItems() ?? null;
  }
}
