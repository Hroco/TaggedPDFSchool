"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import tags from "@assets/tagsDB";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Playground() {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Suspense fallback="loading...">
        <XMLViewer />
      </Suspense>
    </div>
  );
}

function XMLViewer() {
  const searchParams = useSearchParams();
  const [selectedNamespace, setSelectedNamespace] = useState("2.0");
  const tagName = searchParams?.get("tag");
  const useCaseIndex = searchParams?.get("useCase");
  const tag = tagName ? tags.find((tag) => tag.name === tagName) : null;
  const useCase =
    useCaseIndex && tag?.useCases
      ? tag.useCases[parseInt(useCaseIndex)]
      : undefined;

  const [xmlContent, setXmlContent] = useState<string>(
    useCase
      ? useCase.sample
      : `<Document xmlns="http://iso.org/pdf2/ssn">
 
</Document>`,
  );
  const [validationOutput, setValidationOutput] = useState<string>("");
  const validateXML = api.validator.validate.useMutation();
  const downloadPDF = api.validator.downloadPDF.useMutation();
  const onChange = React.useCallback((value: string) => {
    setXmlContent(value);
  }, []);

  useEffect(() => {
    void run();
  }, []);

  useEffect(() => {
    console.log("selectedNamespace", selectedNamespace);
  }, [selectedNamespace]);

  async function run() {
    const response = await validateXML.mutateAsync({
      tagStructure: xmlContent,
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
        <Select onValueChange={setSelectedNamespace} value={selectedNamespace}>
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
              onChange={onChange}
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
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  );
}
