import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import * as util from "dstash-util";
import { Tag } from "./tag.entity";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRep: EntityRepository<Tag>) {}

  /** Spread operation may not preserve the underlying class functionality */
  async injectCount(tag: Tag) {
    return {
      ...tag,
      count: await tag.entries.loadCount(),
    };
  }

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
    return Promise.all(tags.map(this.injectCount));
  }

  write(input: Tag | Tag[]) {
    return this.tagRep.persist(input).flush();
  }

  async search(query: string) {
    const parse = util.tag.unslugify(query);
    if (!parse) return null;
    const { name, namespace } = parse;
    const where = namespace
      ? { namespace, name: { $like: "%" + name + "%" } }
      : {
          $or: [
            { namespace: { $like: "%" + name + "%" } },
            { name: { $like: "%" + name + "%" } },
          ],
        };
    const tags = await this.tagRep.find(where);
    return Promise.all(tags.map(this.injectCount));
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
