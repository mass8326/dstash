import { Node } from "dstash-core/src/controllers/node/node.entity";

export declare global {
  interface Window {
    stash: {
      node: () => Promise<Node[]>;
      stash: () => Promise<Node[]>;
    };
  }
}
