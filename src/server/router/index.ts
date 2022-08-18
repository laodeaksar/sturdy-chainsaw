// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import fetch from "node-fetch";

if (!global.fetch) {
  (global.fetch as any) = fetch;
}

import { roomRouter } from "./room";
import { guestbookRouter } from "./guestbook";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("room.", roomRouter)
  .merge("guestbook.", guestbookRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
