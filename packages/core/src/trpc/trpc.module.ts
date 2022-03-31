import { Module, MiddlewareConsumer } from "@nestjs/common";
import { NodeModule } from "src/controllers/node/node.module";
import { StashModule } from "src/controllers/stash/stash.module";
import { TrpcMiddleware } from "./trpc.middleware";

@Module({
  imports: [NodeModule, StashModule],
  providers: [TrpcMiddleware],
})
export class TrpcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes("trpc");
  }
}
