import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { downloadPDF, validateXML } from "~/lib/apiFunctions/main";

export const validatorRouter = createTRPCRouter({
  validate: publicProcedure
    .input(
      z.object({
        tagStructure: z.string().min(1),
        namespace: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return validateXML(input);
    }),
  downloadPDF: publicProcedure
    .input(z.object({ tagStructure: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return downloadPDF(input);
    }),
});
