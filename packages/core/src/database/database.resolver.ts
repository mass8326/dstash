import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { DatabaseService } from "./database.service";

@Injectable()
export class DatabaseResolver {
  constructor(private databaseSvc: DatabaseService) {}

  getRouter() {
    return trpc.router().mutation("db.reconnect", {
      input: z.string(),
      resolve: ({ input }) => this.databaseSvc.reconnect(input),
    });
  }
}
