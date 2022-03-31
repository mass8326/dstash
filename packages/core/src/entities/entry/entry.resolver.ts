import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { Tag } from "../tag/tag.entity";
import { Entry } from "./entry.entity";
import { EntryService } from "./entry.service";

@Injectable()
export class EntryResolver {
  constructor(private entrySvc: EntryService) {}

  getRouter() {
    return trpc
      .router()
      .query("entry.all", {
        resolve: () => this.entrySvc.all() as Promise<Omit<Entry, "tags">[]>,
      })
      .query("entry.tags", {
        input: z.number(),
        resolve: ({ input }) =>
          this.entrySvc.tags(input) as Promise<Omit<Tag, "entries">[]>,
      });
  }
}
