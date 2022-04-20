import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Tag } from "../tag/tag.entity";
import { TagModule } from "../tag/tag.module";
import { EntryController } from "./entry.controller";
import { Entry } from "./entry.entity";
import { EntryResolver } from "./entry.resolver";
import { EntryService } from "./entry.service";

@Module({
  imports: [MikroOrmModule.forFeature([Entry, Tag]), TagModule],
  controllers: [EntryController],
  providers: [EntryService, EntryResolver],
  exports: [EntryService, EntryResolver],
})
export class EntryModule {}
