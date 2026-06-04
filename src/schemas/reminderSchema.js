import { z } from 'zod';

export const reminderSchema = z.object({
  id: z.number(),
  reminder: z.string().min(1).max(255),
  notes: z.string().optional().nullable(),
  completed: z.boolean().default(false),
  userId: z.number(),
  createdAt: z.string(),
});

export const createReminderSchema = reminderSchema.omit({
  id: true,
  completed: true,
  createdAt: true,
});

export const updateReminderSchema = z.object({
  reminder: z.string().min(1).max(255).optional(),
  notes: z.string().optional().nullable(),
  completed: z.boolean().optional(),
});