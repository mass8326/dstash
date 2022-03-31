import { Controller, Param, Res } from "@nestjs/common";
import { NodeService } from "./node.service";
import { Get } from "@nestjs/common";
import { Response } from "express";

@Controller("node")
export class NodeController {
  constructor(private readonly nodeSvc: NodeService) {}

  @Get()
  findAll() {
    return this.nodeSvc.findAll();
  }

  @Get(":hash")
  async stream(@Param("hash") hash: string, @Res() res: Response) {
    const stream = await this.nodeSvc.stream(hash);
    if (!stream) return null;
    stream.pipe(res);
  }
}
