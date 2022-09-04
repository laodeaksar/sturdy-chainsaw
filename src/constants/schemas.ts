// import z from "zod";

import { z } from "zod";

export const sendMessageSchema = z.object({
  roomId: z.string(),
  message: z.string(),
});

const messageSchema = z.object({
  id: z.string(),
  message: z.string(),
  roomId: z.string(),
  sentAt: z.date(),
  sender: z.object({
    name: z.string(),
  }),
});

export type Message = z.TypeOf<typeof messageSchema>;

export const messageSubSchema = z.object({
  roomId: z.string(),
});

export const guestbookSchema = z.object({
  id: z.string(),
  body: z.string().length(500),
  email: z.string().email(),
  created_by: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const updateGuestbookSchema = z.object({
  id: z.string(),
  body: z.string().length(500),
});

export type Guestbook = z.TypeOf<typeof guestbookSchema>;

export const singleGuestbookSchema = z.object({
  id: z.string().cuid(),
});
