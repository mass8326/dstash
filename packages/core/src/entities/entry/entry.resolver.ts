import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { TagSerialized } from "../tag/tag.entity";
import { EntrySerialized } from "./entry.entity";
import { EntryService } from "./entry.service";

@Injectable()
export class EntryResolver {
  constructor(private entrySvc: EntryService) {}

  getRouter() {
    return trpc
      .router()
      .query("entry.all", {
        resolve: () => this.entrySvc.all() as Promise<EntrySerialized[]>,
      })
      .query("entry.one", {
        input: z.number(),
        resolve: ({ input }) =>
          this.entrySvc.one(input) as Promise<EntrySerialized>,
      })
      .query("entry.tags", {
        input: z.number(),
        resolve: ({ input }) =>
          this.entrySvc.tags(input) as Promise<TagSerialized[]>,
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
