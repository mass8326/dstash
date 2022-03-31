import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Tag } from "./tag.entity";
import { TagResolver } from "./tag.resolver";
import { TagService } from "./tag.service";

@Module({
  imports: [MikroOrmModule.forFeature([Tag])],
  providers: [TagService, TagResolver],
  exports: [TagService, TagResolver],
})
export class TagModule {}
