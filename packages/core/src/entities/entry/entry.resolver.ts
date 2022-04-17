import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { EntryService } from "./entry.service";

@Injectable()
export class EntryResolver {
  constructor(private entrySvc: EntryService) {}

  getRouter() {
    return trpc
      .router()
      .query("entry.all", {
        resolve: () => this.entrySvc.all(),
      })
      .query("entry.page", {
        input: z.object({ limit: z.number(), offset: z.number() }),
        resolve: ({ input }) => this.entrySvc.page(input.limit, input.offset),
      })
      .query("entry.one", {
        input: z.number(),
        resolve: ({ input }) => this.entrySvc.one(input),
      })
      .query("entry.tags", {
        input: z.number(),
        resolve: ({ input }) => this.entrySvc.tags(input),
      })
      .mutation("entry.tag-add", {
        input: z.object({
          id: z.number(),
          tag: z.tuple([z.string(), z.string()]),
        }),
        resolve: ({ input: { id, tag } }) => this.entrySvc.tagAdd(id, tag),
      });
  }
}
