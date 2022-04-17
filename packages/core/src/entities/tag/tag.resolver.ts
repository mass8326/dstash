import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { TagService } from "./tag.service";

@Injectable()
export class TagResolver {
  constructor(private tagSvc: TagService) {}

  getRouter() {
    return trpc
      .router()
      .query("tag.one", {
        input: z.tuple([z.string(), z.string()]),
        resolve: ({ input }) => this.tagSvc.one(input),
      })
      .query("tag.all", {
        resolve: () => this.tagSvc.all(),
      })
      .query("tag.entries", {
        input: z.object({
          tag: z.tuple([z.string(), z.string()]),
          limit: z.number().int().optional(),
          offset: z.number().int().optional(),
        }),
        resolve: ({ input }) =>
          this.tagSvc.entries(input.tag, input.limit, input.offset),
      });
  }
}
