"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import React, { use, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

export default function Playground() {
  const [xmlContent, setXmlContent] = useState<string>(`<Document>
 
</Document>`);
  const [validationOutput, setValidationOutput] = useState<string>("");
  const validateXML = api.validator.validate.useMutation();
  const onChange = React.useCallback((value: string) => {
    setXmlContent(value);
  }, []);

  useEffect(() => {
    void run();
  }, []);

  async function run() {
    const response = await validateXML.mutateAsync({
      tagStructure: xmlContent,
    });
    console.log("response", response);

    setValidationOutput(response);
  }
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="container flex w-full flex-1 flex-col gap-2 pt-5">
        <section className="w-full flex-col items-center">
          <Button variant="default" onClick={run}>
            Run
          </Button>
        </section>
        <section className="flex h-[500px] w-full flex-col items-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border border-primary md:min-w-[450px]"
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
    </div>
  );
}
