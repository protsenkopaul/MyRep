import type { Author } from "../models/author.js";
export declare function createAuthor(name: string, bio?: string): Promise<Author>;
export declare function followAuthor(followerId: string, targetId: string): Promise<Author>;
//# sourceMappingURL=authorController.d.ts.map