import { Module } from "@nestjs/common";
import { EntryModule } from "./entry/entry.module";
import { TagModule } from "./tag/tag.module";

@Module({ imports: [EntryModule, TagModule] })
export class EntitiesModule {}
