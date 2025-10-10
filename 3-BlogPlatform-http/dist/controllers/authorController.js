import { readJson, writeJson } from "../models/db.js";
import { randomUUID } from "crypto";
const FILE = "authors.json";
export async function createAuthor(name, bio) {
    const authors = await readJson(FILE);
    const author = {
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
export async function followAuthor(followerId, targetId) {
    const authors = await readJson(FILE);
    const follower = authors.find(a => a.id === followerId);
    if (!follower)
        throw new Error("Follower not found");
    if (!authors.some(a => a.id === targetId))
        throw new Error("Target not found");
    if (!follower.following.includes(targetId)) {
        follower.following.push(targetId);
    }
    await writeJson(FILE, authors);
    return follower;
}
//# sourceMappingURL=authorController.js.map