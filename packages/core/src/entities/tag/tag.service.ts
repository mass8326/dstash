import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Tag } from "./tag.entity";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRep: EntityRepository<Tag>) {}

  async one(composite: [string, string]) {
    const tag = await this.tagRep.findOne(composite);
    if (!tag) return null;
    return {
      ...tag,
      count: await tag.entries.loadCount(),
    };
  }

  async all() {
    const tags = await this.tagRep.findAll({});
    const mapped = await Promise.all(
      tags.map(async (tag) => ({
        ...tag,
        count: await tag.entries.loadCount(),
      }))
    );
    return mapped;
  }

  write(input: Tag | Tag[]) {
    return this.tagRep.persist(input).flush();
  }

  async entries(composite: [string, string], limit?: number, offset?: number) {
    const tag = await this.tagRep.findOne(composite);
    if (!tag) return null;
    return Promise.all([
      tag.entries.matching({ limit, offset }),
      tag.entries.loadCount(),
    ]);
  }
}
