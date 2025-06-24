/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
import { z } from "zod";
import { promises as fs } from "fs";
import { join } from "path";
import { execFile } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import os from "os";

export const validatorRouter = createTRPCRouter({
  validate: publicProcedure
    .input(z.object({ tagStructure: z.string().min(1) }))
    .mutation(async ({ input }) => {
      console.log("validate", input.tagStructure);

      const { tagStructure } = input;

      // Create temp directory path
      const tmpDirPath = join(os.tmpdir(), "taggedpdf");
      console.log("tmpDirPath", tmpDirPath);

      // Ensure temp directory exists
      try {
        await fs.mkdir(tmpDirPath, { recursive: true });
      } catch (err) {
        console.error("Error creating tmp directory", err);
      }

      // Create a temporary file for the XML content.
      const tempFileName = join(tmpDirPath, `xml-${uuidv4()}.xml`);

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

      const schemaPath = join(
        process.cwd(),
        "src/lib/rnv/latex-document-switch.rnc",
      );

      console.log("schemaPath", schemaPath);

      const args = [schemaPath, tempFileName];

      const rnvLocation = join(process.cwd(), "src/lib/rnv/rnv");

      return new Promise<string>((resolve, reject) => {
        try {
          // First check if the validator executable exists
          fs.access(rnvLocation, fs.constants.X_OK)
            .then(() => {
              // Executable exists and is executable
              execFile(rnvLocation, args, (error, stdout, stderr) => {
                console.log("stdout", stdout);
                console.log("stderr", stderr);
                console.log("error", error);

                // Clean up temporary file
                fs.unlink(tempFileName).catch((unlinkErr) => {
                  console.error("Error deleting temp file:", {
                    path: tempFileName,
                    error: unlinkErr,
                  });
                });

                if (error) {
                  // Return validation errors but don't reject the promise
                  resolve(stderr || stdout);
                } else {
                  resolve("PDF should be valid");
                }
              });
            })
            .catch((accessErr) => {
              console.error(
                "Validator executable not found or not executable:",
                {
                  path: rnvLocation,
                  error: accessErr,
                },
              );
              resolve(
                `Validator error: The validation tool was not found or is not executable.`,
              );
            });
        } catch (unexpectedError) {
          console.error("Unexpected error during validation:", unexpectedError);

          // Clean up in case of unexpected error
          fs.unlink(tempFileName).catch(() => {});

          resolve(
            `Unexpected error: ${unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError)}`,
          );
        }
      });
    }),
  downloadPDF: publicProcedure
    .input(z.object({ tagStructure: z.string().min(1) }))
    .mutation(async ({ input }) => {
      console.log("validate", input.tagStructure);

      const { tagStructure } = input;

      // Create temp directory path
      const tmpDirPath = join(os.tmpdir(), "taggedpdf");
      console.log("tmpDirPath", tmpDirPath);

      // Ensure temp directory exists
      try {
        await fs.mkdir(tmpDirPath, { recursive: true });
      } catch (err) {
        console.error("Error creating tmp directory", err);
      }

      // Create a temporary file for the XML content.
      const tempFileName = join(tmpDirPath, `xml-${uuidv4()}.xml`);

      const tempPDFFileName = join(tmpDirPath, `pdf-${uuidv4()}.pdf`);

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

      const args = [`--in-xml=${tempFileName}`, `--out-pdf=${tempPDFFileName}`];

      const platform = os.platform();

      let xml2pdfLocation: string;

      switch (platform) {
        case "darwin": // macOS
          xml2pdfLocation = join(
            process.cwd(),
            "src/lib/xml2pdf/mac/fxxml2pdf",
          );
          break;
        case "linux":
          xml2pdfLocation = join(
            process.cwd(),
            "src/lib/xml2pdf/linux/fxxml2pdf",
          );
          break;
        case "win32": // Windows
          xml2pdfLocation = join(
            process.cwd(),
            "src/lib/xml2pdf/windows/fxxml2pdf.exe",
          );
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      console.log("platform", platform);
      console.log("xml2pdfLocation", xml2pdfLocation);
      console.log("args", args);

      return new Promise<{ output: string; success: boolean }>(
        (resolve, reject) => {
          try {
            // First check if the validator executable exists
            fs.access(xml2pdfLocation, fs.constants.X_OK)
              .then(() => {
                // Executable exists and is executable
                execFile(xml2pdfLocation, args, (error, stdout, stderr) => {
                  console.log("stdout", stdout);
                  console.log("stderr", stderr);
                  console.log("error", error);

                  // Clean up temporary file
                  fs.unlink(tempFileName).catch((unlinkErr) => {
                    console.error("Error deleting temp file:", {
                      path: tempFileName,
                      error: unlinkErr,
                    });
                  });

                  if (error) {
                    // Return validation errors but don't reject the promise
                    resolve({
                      output: stderr || stdout,
                      success: false,
                    });
                  } else {
                    // After PDF is generated successfully, read the file
                    void fs.readFile(tempPDFFileName).then((data) => {
                      const base64PDF = data.toString("base64");

                      console.log("base64PDF", base64PDF);

                      // Clean up temporary PDF file
                      fs.unlink(tempPDFFileName).catch((unlinkErr) => {
                        console.error("Error deleting temp PDF file:", {
                          path: tempPDFFileName,
                          error: unlinkErr,
                        });
                      });

                      resolve({
                        output: base64PDF,
                        success: true,
                      });
                    });
                  }
                });
              })
              .catch((accessErr) => {
                console.error(
                  "Convertor executable not found or not executable:",
                  {
                    path: xml2pdfLocation,
                    error: accessErr,
                  },
                );
                resolve({
                  output: `Convertor error: The conversion tool was not found or is not executable.`,
                  success: false,
                });
              });
          } catch (unexpectedError) {
            console.error(
              "Unexpected error during conversion:",
              unexpectedError,
            );

            // Clean up in case of unexpected error
            fs.unlink(tempFileName).catch(() => {});

            // Clean up in case of unexpected error
            fs.unlink(tempPDFFileName).catch(() => {});

            resolve({
              output: `Unexpected error: ${unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError)}`,
              success: false,
            });
          }
        },
      );
    }),
});
