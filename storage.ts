import {
  type User, type Course, type Exercise, type ForumPost,
  type InsertUser, type InsertCourse, type InsertExercise, type InsertForumPost,
  users, courses, exercises, forumPosts
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Courses
  getCourses(): Promise<Course[]>;
  getCoursesByGrade(gradeLevel: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Exercises
  getExercises(): Promise<Exercise[]>;
  getExercisesByGrade(gradeLevel: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Forum
  getForumPosts(): Promise<ForumPost[]>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCoursesByGrade(gradeLevel: string): Promise<Course[]> {
    return await db
      .select()
      .from(courses)
      .where(eq(courses.gradeLevel, gradeLevel));
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async getExercises(): Promise<Exercise[]> {
    return await db.select().from(exercises);
  }

  async getExercisesByGrade(gradeLevel: string): Promise<Exercise[]> {
    return await db
      .select()
      .from(exercises)
      .where(eq(exercises.gradeLevel, gradeLevel));
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const [exercise] = await db
      .insert(exercises)
      .values(insertExercise)
      .returning();
    return exercise;
  }

  async getForumPosts(): Promise<ForumPost[]> {
    return await db.select().from(forumPosts);
  }

  async createForumPost(insertPost: InsertForumPost): Promise<ForumPost> {
    const [post] = await db
      .insert(forumPosts)
      .values({
        ...insertPost,
        createdAt: new Date()
      })
      .returning();
    return post;
  }
}

export const storage = new DatabaseStorage();