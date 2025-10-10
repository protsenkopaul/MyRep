import { readJson, writeJson } from "../models/db.js";
import { randomUUID } from "crypto";
const FILE = "posts.json";
export async function createPost(authorId, title, content) {
    const posts = await readJson(FILE);
    const newPost = {
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
export async function getFeed(authorId) {
    const posts = await readJson(FILE);
    const authors = await readJson("authors.json");
    const author = authors.find((a) => a.id === authorId);
    if (!author)
        throw new Error("Author not found");
    return posts.filter((p) => author.following.includes(p.authorId));
}
//# sourceMappingURL=postController.js.map