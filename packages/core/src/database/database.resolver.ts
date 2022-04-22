import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { DatabaseService } from "./database.service";

@Injectable()
export class DatabaseResolver {
  constructor(private databaseSvc: DatabaseService) {}

  getRouter() {
    return trpc
      .router()
      .query("db.list", {
        resolve: () => this.databaseSvc.list(),
      })
      .mutation("db.reconnect", {
        input: z.string(),
        resolve: ({ input }) => this.databaseSvc.reconnect(input),
      })
      .mutation("db.add", {
        input: z.object({ name: z.string(), path: z.string() }),
        resolve: ({ input }) => this.databaseSvc.add(input),
      })
      .mutation("db.del", {
        input: z.string(),
        resolve: ({ input }) => this.databaseSvc.del(input),
      });
  }
}
