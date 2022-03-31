import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { NodeResolver } from "src/controllers/node/node.resolver";
import { StashResolver } from "src/controllers/stash/stash.resolver";
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import * as trpc from "@trpc/server";

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  constructor(
    private orm: MikroORM,
    private nodeRslv: NodeResolver,
    private stashRslv: StashResolver
  ) {}
  async use(req: Request, res: Response) {
    RequestContext.create(this.orm.em, () => {
      nodeHTTPRequestHandler({
        router: this.getRouter(),
        path: req.path.slice(1),
        req,
        res,
      });
    });
  }
  getRouter() {
    return trpc
      .router()
      .merge(this.nodeRslv.getRouter())
      .merge(this.stashRslv.getRouter());
  }
}
