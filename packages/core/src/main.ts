import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

const logger = new Logger("Bootstrap");

type Options = {
  host?: string;
  port?: string;
};

export async function bootstrap({ host, port }: Options) {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(port ?? 4000, host ?? "127.0.0.1");
  logger.log(`dstash-core listening at http://${host}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}
