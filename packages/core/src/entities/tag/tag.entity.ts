import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  PrimaryKeyType,
} from "@mikro-orm/core";
import { Entry } from "../entry/entry.entity";
import { TagRepository } from "./tag.repository";

@Entity({ customRepository: () => TagRepository })
export class Tag {
  @PrimaryKey()
  namespace: string;

  @PrimaryKey()
  name: string;

  [PrimaryKeyType]?: [string, string];

  @ManyToMany(() => Entry, (entry) => entry.tags)
  entries = new Collection<Entry>(this);

  constructor([namespace, name]: [string, string]) {
    this.namespace = namespace;
    this.name = name;
  }
}
