/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
import { z } from "zod";
import { promises as fs } from "fs";
import { join } from "path";
import { execFile } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const validatorRouter = createTRPCRouter({
  validate: publicProcedure
    .input(z.object({ tagStructure: z.string().min(1) }))
    .mutation(async ({ input }) => {
      console.log("validate", input.tagStructure);

      const { tagStructure } = input;

      // Create a temporary file for the XML content.
      const tempFileName = join(
        process.cwd(),
        "src/assets/tmp",
        `xml-${uuidv4()}.xml`,
      );

      console.log("tempFileName", tempFileName);

      try {
        await fs.writeFile(tempFileName, tagStructure, "utf8");
      } catch (err) {
        console.error("Error writing temp file", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error writing temp file",
        });
      }

      console.log("process.cwd()", process.cwd());

      const schemaPath = join(process.cwd(), "src/lib/rnv/schema.rnc");

      console.log("schemaPath", schemaPath);

      const args = [schemaPath, tempFileName];

      const rnvLocation = join(process.cwd(), "src/lib/rnv/rnv");

      return new Promise<string>((resolve, reject) => {
        execFile(rnvLocation, args, (error, stdout, stderr) => {
          console.log("stdout", stdout);
          console.log("stderr", stderr);
          console.log("error", error);

          // Clean up temporary file
          fs.unlink(tempFileName).catch(() => {});

          if (error) {
            // Return validation errors but don't reject the promise
            resolve(stderr || stdout);
          } else {
            resolve(stdout);
          }
        });
      });
    }),
});
