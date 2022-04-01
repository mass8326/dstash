import { EntityRepository } from "@mikro-orm/core"; // or any other driver package
import { Tag } from "./tag.entity";

export class TagRepository extends EntityRepository<Tag> {
  async findOneOrCreate(composite: [string, string]) {
    const found = await this.findOne(composite);
    if (found) return found;
    const created = new Tag(composite);
    this.persist(created);
    return created;
  }
}
