import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { Tag } from "../tag/tag.entity";

@Entity()
export class Entry {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  hash: string;

  @Unique()
  @Property()
  path: string;

  @Property({ nullable: true })
  ext?: string;

  @ManyToMany(() => Tag, (tag) => tag.entries, { owner: true })
  tags = new Collection<Tag>(this);

  constructor(hash: string, path: string, ext?: string) {
    this.hash = hash;
    this.path = path;
    this.ext = ext;
  }
}
