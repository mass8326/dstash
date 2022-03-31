import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { NodeService } from "./node.service";

@Injectable()
export class NodeResolver {
  constructor(private nodeSvc: NodeService) {}

  getRouter() {
    return trpc.router().query("node.all", {
      resolve: () => this.nodeSvc.findAll(),
    });
  }
}
