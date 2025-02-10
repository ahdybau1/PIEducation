import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  gradeLevel: text("grade_level").notNull(),
  subject: text("subject").notNull(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  gradeLevel: text("grade_level").notNull(),
  subject: text("subject").notNull(),
});

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertCourseSchema = createInsertSchema(courses);
export const insertExerciseSchema = createInsertSchema(exercises);
export const insertForumPostSchema = createInsertSchema(forumPosts);

export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type ForumPost = typeof forumPosts.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
