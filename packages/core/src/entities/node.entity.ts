import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Node {
  @PrimaryKey()
  hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }
}
