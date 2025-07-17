/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getSample } from "~/lib/apiFunctions/main";

export const sampleRouter = createTRPCRouter({
  getSample: publicProcedure
    .input(
      z.object({
        useCasePath: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return getSample(input);
    }),
});
