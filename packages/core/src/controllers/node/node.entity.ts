import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity()
export class Node {
  @PrimaryKey()
  hash: string;

  @Unique()
  @Property()
  path: string;

  @Property({ nullable: true })
  ext?: string;

  constructor(hash: string, path: string, ext?: string) {
    this.hash = hash;
    this.path = path;
    this.ext = ext;
  }
}
