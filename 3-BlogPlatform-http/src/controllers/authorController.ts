import { readJson, writeJson } from "../models/db.js";
import type { Author } from "../models/author.js";
import { randomUUID } from "crypto";

const FILE = "authors.json";

export async function createAuthor(name: string, bio?: string): Promise<Author> {
  const authors = await readJson<Author>(FILE);
  const author: Author = {
    id: randomUUID(),
    name,
    bio,
    createdAt: new Date().toISOString(),
    following: []
  };
  authors.push(author);
  await writeJson(FILE, authors);
  return author;
}

export async function followAuthor(followerId: string, targetId: string) {
  const authors = await readJson<Author>(FILE);
  const follower = authors.find(a => a.id === followerId);
  if (!follower) throw new Error("Follower not found");
  if (!authors.some(a => a.id === targetId)) throw new Error("Target not found");
  if (!follower.following.includes(targetId)) {
    follower.following.push(targetId);
  }
  await writeJson(FILE, authors);
  return follower;
}