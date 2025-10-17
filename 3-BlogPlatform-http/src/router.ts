import express from "express";
import { createAuthor, followAuthor } from "./models/authorController.js";
import { createPost, getFeed } from "./models/postController.js";
import { validateRequest } from 'zod-express-middleware';

import {
  CreateAuthorSchema,
  FollowAuthorSchema,
  CreatePostSchema,
} from "./schemas.js";

const app = express();
app.use(express.json());

app.post("/authors", validateRequest({body: (CreateAuthorSchema)}), async (req, res) => {
  const { name, bio } = req.body;
  const author = await createAuthor(name, bio);
  res.json(author);
});

app.post("/authors/:id/follow", validateRequest({body: (FollowAuthorSchema)}), async (req, res) => {
  const followerId = req.params.id;
  const { targetId } = req.body;
  const result = await followAuthor(followerId, targetId);
  res.json(result);
});

app.post("/posts", validateRequest({body: (CreatePostSchema)}), async (req, res) => {
  const { authorId, title, content } = req.body;
  const post = await createPost(authorId, title, content);
  res.json(post);
});

app.get("/feed/:id", async (req, res) => {
  const authorId = req.params.id;
  const feed = await getFeed(authorId);
  res.json(feed);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});


