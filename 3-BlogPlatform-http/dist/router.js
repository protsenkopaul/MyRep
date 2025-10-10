import express from "express";
import { createAuthor, followAuthor } from "./controllers/authorController.js";
import { createPost, getFeed } from "./controllers/postController.js";
const app = express();
app.use(express.json());
app.post("/authors", async (req, res) => {
    const { name, bio } = req.body;
    const author = await createAuthor(name, bio);
    res.json(author);
});
app.post("/authors/:id/follow", async (req, res) => {
    const followerId = req.params.id;
    const { targetId } = req.body;
    const result = await followAuthor(followerId, targetId);
    res.json(result);
});
app.post("/posts", async (req, res) => {
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
//# sourceMappingURL=router.js.map