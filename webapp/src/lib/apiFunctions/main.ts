/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */

import path, { join } from "path";
import fs from "fs";
import { TRPCError } from "@trpc/server";
import { promises as fsPromise } from "fs";
import { execFile } from "child_process";
import { v4 as uuidv4 } from "uuid";
import os from "os";

type getSampleOut =
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      "Content-Type": string;
      content: string;
    };

export function getSample({
  useCasePath,
}: {
  useCasePath: string;
}): getSampleOut {
  try {
    const samplePath = path.join(
      process.cwd(),
      "..",
      "assets",
      "samples",
      useCasePath,
    );

    if (!fs.existsSync(samplePath)) {
      return { status: "error", error: "Sample not found" };
    }

    const content = fs.readFileSync(samplePath, "utf-8");
    return { status: "success", "Content-Type": "text/xml", content };
  } catch (error) {
    return { status: "error", error: "Failed to load sample" };
  }
}

function formatErrorOutput(text: string, xmlPath: string): string {
  //Remove first line of the text
  text = text.replace(/^.*\n/, "");

  //Replace in text all occurences of xmlPath with 'Your XML'
  text = text.replaceAll(xmlPath, "Output");

  return text;
}

export async function validateXML({
  tagStructure,
  namespace,
}: {
  tagStructure: string;
  namespace: string;
}): Promise<string> {
  // Create temp directory path
  const tmpDirPath = join(os.tmpdir(), "taggedpdf");

  // Ensure temp directory exists
  try {
    await fsPromise.mkdir(tmpDirPath, { recursive: true });
  } catch (err) {
    console.error("Error creating tmp directory", err);
  }

  // Create a temporary file for the XML content.
  const tempFileName = join(tmpDirPath, `xml-${uuidv4()}.xml`);

  try {
    await fsPromise.writeFile(tempFileName, tagStructure, "utf8");
  } catch (err) {
    console.error("Error writing temp file", err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error writing temp file",
    });
  }

  /*const schemaPathold = join(
      process.cwd(),
      "src/lib/rnv/latex-document-switch.rnc",
    );*/

  const schemaPath20 = join(
    process.cwd(),
    "src/lib/rnv/generated-schema-PDF20.rnc",
  );

  const schemaPath17 = join(
    process.cwd(),
    "src/lib/rnv/generated-schema-PDF17.rnc",
  );

  const schemaPath = namespace === "2.0" ? schemaPath20 : schemaPath17;

  const args = [schemaPath, tempFileName];

  const rnvLocation = join(process.cwd(), "src/lib/rnv/rnv");

  return new Promise<string>((resolve, reject) => {
    try {
      // First check if the validator executable exists
      fsPromise
        .access(rnvLocation, fs.constants.X_OK)
        .then(() => {
          // Executable exists and is executable
          execFile(rnvLocation, args, (error, stdout, stderr) => {
            //console.log("stdout", stdout);
            //console.log("stderr", stderr);
            //console.log("error", error);

            // Clean up temporary file
            fsPromise.unlink(tempFileName).catch((unlinkErr) => {
              console.error("Error deleting temp file:", {
                path: tempFileName,
                error: unlinkErr,
              });
            });

            if (error) {
              // Return validation errors but don't reject the promise
              const errorOut = formatErrorOutput(
                stderr || stdout,
                tempFileName,
              );
              resolve(errorOut);
            } else {
              resolve("PDF should be valid");
            }
          });
        })
        .catch((accessErr) => {
          console.error("Validator executable not found or not executable:", {
            path: rnvLocation,
            error: accessErr,
          });
          resolve(
            `Validator error: The validation tool was not found or is not executable.`,
          );
        });
    } catch (unexpectedError) {
      console.error("Unexpected error during validation:", unexpectedError);

      // Clean up in case of unexpected error
      fsPromise.unlink(tempFileName).catch(() => {});

      resolve(
        `Unexpected error: ${unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError)}`,
      );
    }
  });
}

export async function downloadPDF({
  tagStructure,
}: {
  tagStructure: string;
}): Promise<{ output: string; success: boolean }> {
  // Create temp directory path
  const tmpDirPath = join(os.tmpdir(), "taggedpdf");

  // Ensure temp directory exists
  try {
    await fsPromise.mkdir(tmpDirPath, { recursive: true });
  } catch (err) {
    console.error("Error creating tmp directory", err);
  }

  // Create a temporary file for the XML content.
  const tempFileName = join(tmpDirPath, `xml-${uuidv4()}.xml`);

  const tempPDFFileName = join(tmpDirPath, `pdf-${uuidv4()}.pdf`);

  try {
    await fsPromise.writeFile(tempFileName, tagStructure, "utf8");
  } catch (err) {
    console.error("Error writing temp file", err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error writing temp file",
    });
  }

  const args = [`--in-xml=${tempFileName}`, `--out-pdf=${tempPDFFileName}`];

  const platform = os.platform();

  let xml2pdfLocation: string;

  switch (platform) {
    case "darwin": // macOS
      xml2pdfLocation = join(process.cwd(), "src/lib/xml2pdf/mac/fxxml2pdf");
      break;
    case "linux":
      xml2pdfLocation = join(process.cwd(), "src/lib/xml2pdf/linux/fxxml2pdf");
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
        fsPromise
          .access(xml2pdfLocation, fs.constants.X_OK)
          .then(() => {
            // Executable exists and is executable
            execFile(xml2pdfLocation, args, (error, stdout, stderr) => {
              console.log("stdout", stdout);
              console.log("stderr", stderr);
              console.log("error", error);

              // Clean up temporary file
              fsPromise.unlink(tempFileName).catch((unlinkErr) => {
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
                void fsPromise.readFile(tempPDFFileName).then((data) => {
                  const base64PDF = data.toString("base64");

                  //console.log("base64PDF", base64PDF);

                  // Clean up temporary PDF file
                  fsPromise.unlink(tempPDFFileName).catch((unlinkErr) => {
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
            console.error("Convertor executable not found or not executable:", {
              path: xml2pdfLocation,
              error: accessErr,
            });
            resolve({
              output: `Convertor error: The conversion tool was not found or is not executable.`,
              success: false,
            });
          });
      } catch (unexpectedError) {
        console.error("Unexpected error during conversion:", unexpectedError);

        // Clean up in case of unexpected error
        fsPromise.unlink(tempFileName).catch(() => {});

        // Clean up in case of unexpected error
        fsPromise.unlink(tempPDFFileName).catch(() => {});

        resolve({
          output: `Unexpected error: ${unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError)}`,
          success: false,
        });
      }
    },
  );
}
