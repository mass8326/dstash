import type { TrpcSchema } from "dstash-core";
import { createTRPCClient, type TRPCClient } from "@trpc/client";

export type QueryAwaited<T extends keyof TrpcSchema["_def"]["queries"]> =
  Awaited<ReturnType<TrpcSchema["_def"]["queries"][T]["call"]>>;
export const client: TRPCClient<TrpcSchema> = createTRPCClient({
  url: "http://localhost:4000/trpc",
});
