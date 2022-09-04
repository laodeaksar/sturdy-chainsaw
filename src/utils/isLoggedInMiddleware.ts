import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { Context } from "../server/router/context";

interface ContextWithUserId extends Context {
  userId?: string;
}

export const isLoggedInMiddleware: MiddlewareFunction<
  Context,
  ContextWithUserId,
  any
> = async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  
  return next({
    ctx: {
      ...ctx,
      userId: ctx.session.user?.id,
    },
  });
};
