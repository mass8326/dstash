import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Node {
  @Field()
  @PrimaryKey()
  hash: string;

  @Field()
  @Unique()
  @Property()
  path: string;

  @Field()
  @Property({ nullable: true })
  ext?: string;

  constructor(hash: string, path: string, ext?: string) {
    this.hash = hash;
    this.path = path;
    this.ext = ext;
  }
}
