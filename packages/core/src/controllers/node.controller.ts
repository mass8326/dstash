import { Context } from "koa";
import Router from "koa-router";
import { Node } from "../entities";

const router = new Router();

router.get("/", async (ctx: Context) => {
  const nodes = await ctx.state.db.em.getRepository(Node).findAll();
  ctx.body = { nodes };
});

export const NodeController = router;
