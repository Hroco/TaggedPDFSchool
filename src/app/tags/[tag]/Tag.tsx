"use client";
import Link from "next/link";
import attributes from "~/assets/attributesDB.json";
import properties from "~/assets/propertiesDB.json";
import checks from "~/assets/matterhornProtocol.json";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { ChevronRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { notFound } from "next/navigation";
import tags from "~/assets/taggsDB";
import hierarchyData from "~/hierarchyGenerator/32005-main/sources/generated/structure-relationships.json";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import React from "react";
import { buttonVariants } from "~/components/ui/button";

export default function Tag({ currentTag }: { currentTag: string }) {
  const tag = tags.find((tag) => tag.name === currentTag);

  if (!tag) {
    notFound();
  }

  const checksForTag = checks.filter((check) => {
    return check.relatedTags.includes(tag.name);
  });

  const attributesForTag = attributes.filter((attribute) => {
    const relatedTags = attribute.relatedTags;
    return relatedTags.includes(tag.name);
  });

  const propertiesForTag = properties.filter((propertie) => {
    const relatedTags = propertie.relatedTags;
    return relatedTags.includes(tag.name);
  });

  const hierarchyForTag = hierarchyData.find((hierarchy) => {
    return hierarchy.name === tag.name;
  });

  const parrentTags = hierarchyForTag?.hierarchy.parents.map((item) => {
    const [tagName, occurrences] = item;

    let newTagName: string;
    let newOccurrences: string;

    if (typeof tagName === "number") {
      newTagName = tagName.toString();
    } else {
      newTagName = tagName ?? "";
    }

    if (typeof occurrences === "number") {
      newOccurrences = occurrences.toString();
    } else {
      newOccurrences = occurrences ?? "";
    }

    return [newTagName, newOccurrences];
  });

  const childTags = hierarchyForTag?.hierarchy.children.map((item) => {
    const [tagName, occurrences] = item;

    let newTagName: string;
    let newOccurrences: string;

    if (typeof tagName === "number") {
      newTagName = tagName.toString();
    } else {
      newTagName = tagName ?? "";
    }

    if (typeof occurrences === "number") {
      newOccurrences = occurrences.toString();
    } else {
      newOccurrences = occurrences ?? "";
    }

    return [newTagName, newOccurrences];
  });

  return (
    <div className="mx-auto max-w-3xl text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-primary">{tag.name}</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Description</h2>
        <p className="text-gray-300">{tag.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Namespace</h2>
        <p className="text-gray-300">
          {tag.namespace?.map((ns, index) => {
            return (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {ns}
              </span>
            );
          })}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Type</h2>
        <p className="text-gray-300">
          {tag.type.map((type, index) => {
            return (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {type}
              </span>
            );
          })}
        </p>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">Attributes</h2>
          <Card className="border-gray-700 bg-gray-800">
            <div className="space-y-3 p-4">
              {attributesForTag.map((attr, index) => {
                return (
                  <Link
                    href={`/attributes/${attr.name}`}
                    key={index}
                    className="block"
                  >
                    <div className="group rounded-lg p-3 transition-colors hover:bg-gray-700">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">
                            {attr.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Attribute
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-sm text-gray-400">
                        {attr.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Properties</h2>
          <Card className="border-gray-700 bg-gray-800">
            <div className="space-y-3 p-4">
              {propertiesForTag.map((prop, index) => {
                return (
                  <Link
                    href={`/properties/${prop.name}`}
                    key={index}
                    className="block"
                  >
                    <div className="group rounded-lg p-3 transition-colors hover:bg-gray-700">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">
                            {prop.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Property
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-sm text-gray-400">
                        {prop.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </section>
      </div>
      {/*<section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Example</h2>
        <Card className="border-gray-700 bg-gray-800">
          <pre className="overflow-x-auto rounded-lg p-4">
            <code className="text-sm text-gray-300">{tag.example}</code>
          </pre>
        </Card>
      </section>*/}

      <section className="mb-8 space-y-2">
        <h2 className="mb-3 text-2xl font-semibold">Differences</h2>
        <p className="text-gray-300">Well tagged PDF:</p>
        <p className="text-gray-300">
          {tag.difference?.wellTaggedPDF.description}
        </p>
        <p className="text-gray-300">
          {tag.difference?.wellTaggedPDF.requirements}
        </p>
        <br />
        <p className="text-gray-300">PDFUA:</p>
        <p className="text-gray-300">{tag.difference?.pdfUA.description}</p>
        <p className="text-gray-300">{tag.difference?.pdfUA.requirements}</p>
      </section>

      <section className="mb-8 space-y-2">
        <h2 className="mb-3 text-2xl font-semibold">Use cases</h2>
        {tag.useCases?.map((useCase, index) => (
          <React.Fragment key={index}>
            <p className="text-gray-300">{useCase.description}</p>
            <CodeMirror
              value={useCase.sample}
              height="calc(100%)"
              extensions={[xml()]}
              theme="dark"
              className="h-full"
            />
            <Link
              href={`/playground?tag=${tag.name}&useCase=${index}`}
              className={buttonVariants({
                variant: "default",
                className: "mt-2 inline-block text-white",
                size: "sm",
              })}
            >
              Try it
            </Link>
          </React.Fragment>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Tag Relationships</h2>
        <Card className="border-gray-700 bg-gray-800">
          <div className="space-y-6 p-6">
            <div className="flex flex-col items-start gap-6 md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0 md:w-1/2">
                <TagRelationship
                  tags={parrentTags}
                  type="parent"
                  icon={ArrowUpCircle}
                />
              </div>
              <div className="md:w-1/2">
                <TagRelationship
                  tags={childTags}
                  type="child"
                  icon={ArrowDownCircle}
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>
                Parent tags can contain this tag, while this tag can contain
                child tags.
              </p>
              <p>Click on any tag to view its details.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Validation Tips</h2>
        <ul className="ml-4 list-disc text-gray-300">
          {checksForTag.map((tip) => {
            return (
              <li key={tip.index}>
                <Link
                  href={`/matterhorn?check=${tip.index}`}
                  className="inline py-1 text-sm transition-colors hover:text-primary"
                >
                  {tip.failureCondition}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {tag.examples && (
        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">Examples</h2>
          <ul className="ml-4 list-disc text-gray-300">
            {tag.examples?.map((example, index) => {
              return <li key={index}>{example.description}</li>;
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function TagRelationship({
  tags,
  type,
  icon: Icon,
}: {
  tags: string[][] | undefined;
  type: "parent" | "child";
  icon: React.ElementType;
}) {
  if (!tags) {
    return null;
  }
  return (
    <div className="space-y-2">
      <h3 className="mb-2 flex items-center text-lg font-semibold text-primary">
        <Icon className="mr-2" />
        {type === "parent" ? "Parent" : "Child"} Tags
      </h3>
      {tags.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          {tags.map((tagData) => {
            const [tag, occ] = tagData;
            if (tag === "content item") {
              return (
                <div
                  key={tag}
                  className="flex justify-between rounded bg-gray-700 p-2 text-center transition-colors hover:bg-gray-600"
                >
                  <span className="text-sm font-medium text-blue-400 hover:underline">
                    {tag}
                  </span>
                  <Badge variant="secondary">{occ}</Badge>
                </div>
              );
            }
            return (
              <Link href={`/tags/${tag}`} key={tag}>
                <div className="flex justify-between rounded bg-gray-700 p-2 text-center transition-colors hover:bg-gray-600">
                  <span className="text-sm font-medium text-blue-400 hover:underline">
                    {tag}
                  </span>
                  <Badge variant="secondary">{occ}</Badge>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="italic text-gray-400">
          {type === "parent"
            ? "This is a root-level tag and has no parents."
            : "This tag cannot contain any child tags."}
        </p>
      )}
    </div>
  );
}
