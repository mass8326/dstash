import { MikroORM, RequestContext } from "@mikro-orm/core";
import { Injectable, NestMiddleware } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { Request, Response } from "express";
import { DatabaseResolver } from "src/database/database.resolver";
import { EntryResolver } from "../entities/entry/entry.resolver";
import { TagResolver } from "../entities/tag/tag.resolver";
import { StashResolver } from "../stash/stash.resolver";

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  constructor(
    private orm: MikroORM,
    private databaseRslv: DatabaseResolver,
    private entryRslv: EntryResolver,
    private tagRslv: TagResolver,
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
      .merge(this.databaseRslv.getRouter())
      .merge(this.entryRslv.getRouter())
      .merge(this.tagRslv.getRouter())
      .merge(this.stashRslv.getRouter());
  }
}
