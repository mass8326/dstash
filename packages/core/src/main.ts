import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { Target } from "./config/config.enum";
import { ElectronIPCTransport } from "nestjs-electron-ipc-transport";
import { INestApplication, INestMicroservice, Logger } from "@nestjs/common";

const logger = new Logger("Bootstrap");

// Webpack HMR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

async function bootstrap() {
  let app: INestApplication | INestMicroservice;
  if (process.env.CONFIG_TARGET === Target.Desktop) {
    app = await NestFactory.createMicroservice(AppModule, {
      strategy: new ElectronIPCTransport(),
    });
    logger.error("Not yet implemented...");
  } else {
    app = await NestFactory.create(AppModule, new FastifyAdapter());
    const host = process.env.HOST ?? "0.0.0.0";
    const port = process.env.PORT ?? 4000;
    await app.listen(port, host);
    logger.log(`dstash-core listening at http://${host}:${port}`);
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
