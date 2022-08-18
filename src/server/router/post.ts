import { z } from "zod";
import { createPostSchema } from "./../../schema/post.schema";
import { createRouter } from "./context";
export const postRouter = createRouter()
  .query("getAllPosts", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .mutation("createPost", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
        },
      });
      return post;
    },
  })
  .mutation("deletePost", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const deletePost = await ctx.prisma.post.delete({
        where: {
          id: input,
        },
      });
      return deletePost;
    },
  });
