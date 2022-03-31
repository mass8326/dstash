import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { TagService } from "./tag.service";
import { z } from "zod";

@Injectable()
export class TagResolver {
  constructor(private tagSvc: TagService) {}

  getRouter() {
    return trpc
      .router()
      .query("tag.all", { resolve: () => this.tagSvc.all() })
      .query("tag.entries", {
        input: z.tuple([z.string(), z.string()]),
        resolve: ({ input }) => this.tagSvc.entries(input),
      });
  }
}
