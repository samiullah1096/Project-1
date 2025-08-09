import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // 'user' | 'admin'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const toolUsage = pgTable("tool_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  toolName: text("tool_name").notNull(),
  category: text("category").notNull(),
  userId: varchar("user_id").references(() => users.id),
  sessionId: text("session_id"), // For anonymous users
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  processingTime: integer("processing_time"), // in milliseconds
  fileSize: integer("file_size"), // in bytes
  success: boolean("success").notNull(),
});

export const adSlots = pgTable("ad_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(), // 'header', 'sidebar', 'footer', 'tool-top', 'tool-bottom'
  page: text("page").notNull(), // 'home', 'pdf-tools', etc.
  isActive: boolean("is_active").notNull().default(true),
  adProvider: text("ad_provider"), // 'google-adsense', 'media-net', etc.
  adCode: text("ad_code"),
  settings: jsonb("settings"), // Additional ad configuration
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(), // YYYY-MM-DD format
  toolName: text("tool_name").notNull(),
  category: text("category").notNull(),
  usageCount: integer("usage_count").notNull().default(0),
  successRate: text("success_rate"), // Percentage as string
  avgProcessingTime: integer("avg_processing_time"), // in milliseconds
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertToolUsageSchema = createInsertSchema(toolUsage).omit({
  id: true,
  timestamp: true,
});

export const insertAdSlotSchema = createInsertSchema(adSlots).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertToolUsage = z.infer<typeof insertToolUsageSchema>;
export type ToolUsage = typeof toolUsage.$inferSelect;
export type InsertAdSlot = z.infer<typeof insertAdSlotSchema>;
export type AdSlot = typeof adSlots.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
