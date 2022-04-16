import type { TrpcSchema } from "dstash-core";
import type { CreateTRPCClientOptions, TRPCClient } from "@trpc/client";
import { createTRPCClient } from "@trpc/client";

export type QueryAwaited<T extends keyof TrpcSchema["_def"]["queries"]> =
  Awaited<ReturnType<TrpcSchema["_def"]["queries"][T]["call"]>>;
export const client = (
  options: Omit<CreateTRPCClientOptions<TrpcSchema>, "url"> = {}
): TRPCClient<TrpcSchema> =>
  createTRPCClient({
    ...options,
    url: "http://localhost:4000/trpc",
  });
