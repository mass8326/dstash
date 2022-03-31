import { Controller, Param, Res } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { Get } from "@nestjs/common";
import { Response } from "express";

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
