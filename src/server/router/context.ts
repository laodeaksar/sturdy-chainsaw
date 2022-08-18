// src/server/router/context.ts
import * as trpc from "@trpc/server";
import ws from "ws";
import * as trpcNext from "@trpc/server/adapters/next";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/declarations/src/adapters/node-http";
import EventEmitter from "events";
import { IncomingMessage } from "http";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";
import { getSession } from "next-auth/react";
import { AppRouter } from ".";

const ee = new EventEmitter();

export const createContext = async (
  opts?:
    | trpcNext.CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = req && res && (await getSession({ req }));

  return {
    req,
    res,
    session,
    prisma,
    ee,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = trpc.inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
