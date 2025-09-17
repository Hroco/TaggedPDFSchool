"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import tags from "@assets/tagsDB.json";

type XMLViewerProps = {
  input: string;
  output: string;
};

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

export default function XMLViewer({ input, output }: XMLViewerProps) {
  const [selectedNamespace, setSelectedNamespace] = useState<"2.0" | "1.7">(
    "2.0",
  );
  const [xmlContent, setXmlContent] = useState<string>(input);
  const [validationOutput, setValidationOutput] = useState<string>(output);
  const validateXML = api.validator.validate.useMutation();
  const downloadPDF = api.validator.downloadPDF.useMutation();

  async function run() {
    console.log("run");

    const processedXML = postProcessXML(xmlContent, selectedNamespace);
    //setXmlContent(processedXML);
    const response = await validateXML.mutateAsync({
      tagStructure: processedXML,
      namespace: selectedNamespace,
    });
    console.log("response", response);

    setValidationOutput(response);
  }

  async function download() {
    console.log("download");
    try {
      const response = await downloadPDF.mutateAsync({
        tagStructure: xmlContent,
      });
      console.log("response", response);

      if (response.success && response.output) {
        // Convert base64 to blob
        const binaryString = atob(response.output);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create blob and download
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // Create download link
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated.pdf";
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  return (
    <main className="container flex w-full flex-1 flex-col gap-2 pt-5">
      <section className="flex gap-2">
        <Button variant="default" onClick={run}>
          Run
        </Button>
        <Button variant="default" onClick={download} className="">
          Download PDF
        </Button>
        <Select
          onValueChange={(value: string) => {
            setSelectedNamespace(value as "1.7" | "2.0");
          }}
          value={selectedNamespace}
        >
          <SelectTrigger
            className="!bg-primary h-10 w-[180px] text-black"
            size="default"
          >
            <SelectValue placeholder="Namespace" />
          </SelectTrigger>
          <SelectContent className="w-[180px]">
            <SelectItem value="1.7">1.7</SelectItem>
            <SelectItem value="2.0">2.0</SelectItem>
          </SelectContent>
        </Select>
      </section>
      <section className="flex h-[500px] w-full flex-col items-center">
        <ResizablePanelGroup
          direction="horizontal"
          className="border-primary w-full rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel>
            <CodeMirror
              value={xmlContent}
              height="calc(100%)"
              extensions={[xml()]}
              onChange={(value: string) => {
                setXmlContent(value);
              }}
              theme="dark"
              className="h-full"
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-primary" />
          <ResizablePanel>
            <Textarea
              className="h-full"
              value={validationOutput}
              onChange={(e) => {
                setValidationOutput(e.target.value);
              }}
              readOnly
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  );
}
