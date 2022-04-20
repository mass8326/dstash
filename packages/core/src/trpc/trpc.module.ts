import { Module, MiddlewareConsumer } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { EntryModule } from "../entities/entry/entry.module";
import { TagModule } from "../entities/tag/tag.module";
import { StashModule } from "../stash/stash.module";
import { TrpcMiddleware } from "./trpc.middleware";

@Module({
  imports: [DatabaseModule, EntryModule, TagModule, StashModule],
  providers: [TrpcMiddleware],
})
export class TrpcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes("trpc");
  }
}
