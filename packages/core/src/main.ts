import type { TrpcMiddleware } from "./trpc/trpc.middleware";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

const logger = new Logger("Bootstrap");

type Options = {
  host?: string;
  port?: string;
};

export async function bootstrap({ host, port }: Options) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors({ origin: true });
  await app.listen(port ?? 4000, host ?? "127.0.0.1");
  logger.log(`dstash-core listening at http://${host}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}

export type TrpcSchema = ReturnType<TrpcMiddleware["getRouter"]>;
