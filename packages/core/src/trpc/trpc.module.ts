import { Module, MiddlewareConsumer } from "@nestjs/common";
import { EntryModule } from "src/entities/entry/entry.module";
import { StashModule } from "src/stash/stash.module";
import { TrpcMiddleware } from "./trpc.middleware";

@Module({
  imports: [EntryModule, StashModule],
  providers: [TrpcMiddleware],
})
export class TrpcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes("trpc");
  }
}
