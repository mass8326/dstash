import { Controller, Param, Res, Get } from "@nestjs/common";
import { Response } from "express";
import { EntryService } from "./entry.service";

@Controller("entry")
export class EntryController {
  constructor(private readonly entrySvc: EntryService) {}

  @Get()
  findAll() {
    return this.entrySvc.all();
  }

  @Get(":id")
  async stream(@Param("id") id: number, @Res() res: Response) {
    const stream = await this.entrySvc.stream(id);
    if (!stream) return null;
    stream.pipe(res);
  }
}
