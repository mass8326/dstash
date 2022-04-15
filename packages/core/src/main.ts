import type { TrpcMiddleware } from "./trpc/trpc.middleware";
import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

const logger = new Logger("Bootstrap");

type Options = {
  host?: string;
  port?: string;
};

export async function bootstrap(options: Options = {}) {
  const { host = "127.0.0.1", port = 4000 } = options;
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors({ origin: true });
  await app.listen(port, host);
  logger.log(`dstash-core listening at http://${host}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}

export type TrpcSchema = ReturnType<TrpcMiddleware["getRouter"]>;
