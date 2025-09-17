import React from "react";
import XMLViewer from "./Playground";
import { getSample, validateXML } from "~/lib/apiFunctions/main";
import tags from "@assets/tagsDB.json";

function postProcessXML(
  text: string,
  selectedNamespace: "2.0" | "1.7",
): string {
  let output = text.replaceAll(
    "<Document>",
    '<Document xmlns="http://iso.org/pdf2/ssn">',
  );

  if (selectedNamespace === "1.7") {
    output = output.replaceAll(
      "http://iso.org/pdf2/ssn",
      "http://iso.org/pdf/ssn",
    );
  }

  if (selectedNamespace === "2.0") {
    const listOfAll17Tags: string[] = tags
      .filter((tag) => tag.namespace.length === 1 && tag.namespace[0] === "1.7")
      .map((tag) => tag.name);

    console.log("listOfAll17Tags", listOfAll17Tags);

    //check if we have some elements from the 1.7 namespace
    const has17Tags = listOfAll17Tags.some((tag) => output.includes(tag));

    if (has17Tags) {
      if (!output.includes('xmlns:pdf1="http://iso.org/pdf/ssn"')) {
        output = output.replaceAll(
          "<Document",
          '<Document xmlns:pdf1="http://iso.org/pdf/ssn"',
        );
      }

      for (const tag of listOfAll17Tags) {
        output = output.replaceAll(`<${tag}>`, `<pdf1:${tag}>`);
        output = output.replaceAll(`</${tag}>`, `</pdf1:${tag}>`);
        output = output.replaceAll(`pdf1:pdf1:${tag}`, `pdf1:${tag}`);
      }
    }
  }

  console.log("output", output);

  return output;
}

interface PlaygroundProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Playground({ searchParams }: PlaygroundProps) {
  const searchParamsAwaited = await searchParams;
  const tagName = (searchParamsAwaited.tag as string) || "";
  const useCaseIndex = (searchParamsAwaited.useCase as string) || "";

  console.log("tag", tagName);

  console.log("useCase", useCaseIndex);

  const tag = tagName ? tags.find((tag) => tag.name === tagName) : null;
  const useCase =
    useCaseIndex && tag?.useCases
      ? tag.useCases[parseInt(useCaseIndex)]
      : undefined;

  const fallbackRaw = getSample({
    useCasePath: "Common/fallback.xml",
  });

  const fallbackXML =
    fallbackRaw.status === "success" ? fallbackRaw.content : "";

  const xmlContentNew = useCase
    ? getSample({
        useCasePath: useCase.sample,
      })
    : fallbackXML;

  const input =
    typeof xmlContentNew !== "string" && xmlContentNew.status === "success"
      ? xmlContentNew.content
      : fallbackXML;

  const output = await validateXML({
    tagStructure: postProcessXML(input, "2.0"),
    namespace: "2.0",
  });

  console.log("input", input);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <XMLViewer input={input} output={output} />
    </div>
  );
}
