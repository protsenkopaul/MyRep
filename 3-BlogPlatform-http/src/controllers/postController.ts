import type { Author } from "../models/author.js";
import { readJson, writeJson } from "../models/db.js";
import type { Post } from "../models/post.js";
import { randomUUID } from "crypto";

const FILE = "posts.json";

export async function createPost(authorId: string, title: string, content: string): Promise<Post> {
  const posts = await readJson<Post>(FILE);
  const newPost: Post = {
    id: randomUUID(),
    authorId,
    title,
    content,
    createdAt: new Date().toISOString(),
    likes: 0
  };
  posts.push(newPost);
  await writeJson(FILE, posts);
  return newPost;
}

export async function getFeed(authorId: string): Promise<Post[]> {
  const posts = await readJson<Post>(FILE);
  const authors = await readJson<Author>("authors.json");
  const author = authors.find((a: Author) => a.id === authorId);
  if (!author) throw new Error("Author not found");

  return posts.filter((p) => author.following.includes(p.authorId));
}