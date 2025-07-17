import React from "react";
import XMLViewer from "./Playground";
import { getSample, validateXML } from "~/lib/apiFunctions/main";
import tags from "@assets/tagsDB.json";

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
    tagStructure: input,
    namespace: "2.0",
  });

  console.log("input", input);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <XMLViewer input={input} output={output} />
    </div>
  );
}
