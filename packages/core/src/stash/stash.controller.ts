import { Controller, Get } from "@nestjs/common";
import { Entry } from "../entities/entry/entry.entity";
import { StashService } from "./stash.service";

@Controller("stash")
export class StashController {
  constructor(private stashSvc: StashService) {}

  @Get()
  async get(): Promise<Entry[]> {
    return this.stashSvc.consume();
  }
}
