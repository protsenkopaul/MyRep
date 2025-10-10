import type { Post } from "../models/post.js";
export declare function createPost(authorId: string, title: string, content: string): Promise<Post>;
export declare function getFeed(authorId: string): Promise<Post[]>;
//# sourceMappingURL=postController.d.ts.map