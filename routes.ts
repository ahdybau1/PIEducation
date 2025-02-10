import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertExerciseSchema, insertForumPostSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Courses
  app.get("/api/courses", async (_req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  app.get("/api/courses/:grade", async (req, res) => {
    const courses = await storage.getCoursesByGrade(req.params.grade);
    res.json(courses);
  });

  app.post("/api/courses", async (req, res) => {
    const parsed = insertCourseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid course data" });
    }
    const course = await storage.createCourse(parsed.data);
    res.json(course);
  });

  // Exercises
  app.get("/api/exercises", async (_req, res) => {
    const exercises = await storage.getExercises();
    res.json(exercises);
  });

  app.get("/api/exercises/:grade", async (req, res) => {
    const exercises = await storage.getExercisesByGrade(req.params.grade);
    res.json(exercises);
  });

  app.post("/api/exercises", async (req, res) => {
    const parsed = insertExerciseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid exercise data" });
    }
    const exercise = await storage.createExercise(parsed.data);
    res.json(exercise);
  });

  // Forum
  app.get("/api/forum", async (_req, res) => {
    const posts = await storage.getForumPosts();
    res.json(posts);
  });

  app.post("/api/forum", async (req, res) => {
    const parsed = insertForumPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid forum post data" });
    }
    const post = await storage.createForumPost(parsed.data);
    res.json(post);
  });

  return httpServer;
}
