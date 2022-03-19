import crypto from "crypto";
import fs from "fs/promises";
import { resolve } from "path";
import { Context } from "koa";
import Router from "koa-router";
import { Node } from "../entities";

const router = new Router();

router.get("/", async (ctx: Context) => {
  const dropoff = resolve(process.env.STASH_DIR ?? "stash", "dropoff");
  const files = await fs.readdir(dropoff);
  const repo = ctx.state.db.em.getRepository(Node);
  const nodes = await Promise.all(
    files.map(async (name) => {
      const path = resolve(dropoff, name);
      const hash = crypto
        .createHash("sha256")
        .update(await fs.readFile(path))
        .digest("hex");
      const node = new Node(hash);
      await repo.persist(node);
      return node;
    })
  );
  repo.flush();
  ctx.body = { nodes };
});

export const StashController = router;
