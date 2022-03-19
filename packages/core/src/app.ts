import "reflect-metadata";
import { RequestContext } from "@mikro-orm/core";
import Koa from "koa";
import body from "koa-body";
import Router from "koa-router";
import { NodeController, StashController } from "./controllers";
import { init } from "./db";

async function main() {
  const app = new Koa();
  app.use(body());

  // Inject db into state and fork entity manager
  // TODO: Determine db from session
  const db = await init();
  app.use(async (ctx, next) => {
    ctx.state.db = db;
    await RequestContext.createAsync(db.em, next);
  });

  // Api entrypoint
  const api = new Router();
  api.get("/", (ctx) => (ctx.body = { message: "dstash-core" }));
  api.use("/node", NodeController.routes());
  api.use("/stash", StashController.routes());
  app.use(api.routes());
  app.use(api.allowedMethods());

  // Fallback
  app.use((ctx) => {
    ctx.status = 404;
    ctx.body = { message: "No route found" };
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`dstash-core started at http://localhost:${port}`);
  });
}

main();
