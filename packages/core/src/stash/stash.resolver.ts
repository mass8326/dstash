import { Injectable } from "@nestjs/common";
import * as trpc from "@trpc/server";
import { StashService } from "./stash.service";

@Injectable()
export class StashResolver {
  constructor(private stashSvc: StashService) {}

  getRouter() {
    return trpc.router().mutation("stash.consume", {
      resolve: () => this.stashSvc.consume(),
    });
  }
}
