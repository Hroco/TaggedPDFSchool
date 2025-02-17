"use client";
import Link from "next/link";
import data from "~/assets/taggedPDFSchoolDB.json";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { ChevronRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default function Tag({ currentTag }: { currentTag: string }) {
  const tag = data.pdfTags.find((tag) => tag.tag === currentTag);

  if (!tag) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-orange-500">{tag.tag}</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Description</h2>
        <p className="text-gray-300">{tag.description}</p>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">Attributes</h2>
          <Card className="border-gray-700 bg-gray-800">
            <div className="space-y-3 p-4">
              {tag.attributes?.map((attr) => {
                const attrData = data.attributes.find((a) => a.name === attr);

                if (!attrData) {
                  return null;
                }
                return (
                  <Link
                    href={`/attributes/${attr}`}
                    key={attr}
                    className="block"
                  >
                    <div className="group rounded-lg p-3 transition-colors hover:bg-gray-700">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-orange-500">
                            {attr}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Attribute
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-sm text-gray-400">
                        {attrData.description}
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
              {tag.properties?.map((prop) => {
                const propData = data.properties.find((a) => a.name === prop);

                if (!propData) {
                  return null;
                }
                return (
                  <Link
                    href={`/properties/${prop}`}
                    key={prop}
                    className="block"
                  >
                    <div className="group rounded-lg p-3 transition-colors hover:bg-gray-700">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-orange-500">
                            {prop}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Property
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-sm text-gray-400">
                        {propData.description}
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

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Differences</h2>
        <p className="text-gray-300">
          Well tagged PDF: {tag.differences?.wellTaggedPDF}
        </p>
        <p className="text-gray-300">PDFUA: {tag.differences?.pdfUA}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Introduced In</h2>
        <p className="text-gray-300">{tag.introducedIn}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Tag Relationships</h2>
        <Card className="border-gray-700 bg-gray-800">
          <div className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0 md:w-5/12">
                <TagRelationship
                  tags={tag.hierarchy?.parentTags}
                  type="parent"
                  icon={ArrowUpCircle}
                />
              </div>
              <div className="hidden w-2/12 md:block">
                <div className="mx-auto h-32 w-px bg-gray-700"></div>
              </div>
              <div className="md:w-5/12">
                <TagRelationship
                  tags={tag.hierarchy?.childTags}
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
    </div>
  );
}

function TagRelationship({
  tags,
  type,
  icon: Icon,
}: {
  tags: string[] | undefined;
  type: "parent" | "child";
  icon: React.ElementType;
}) {
  if (!tags) {
    return null;
  }
  return (
    <div className="space-y-2">
      <h3 className="mb-2 flex items-center text-lg font-semibold text-orange-500">
        <Icon className="mr-2" />
        {type === "parent" ? "Parent" : "Child"} Tags
      </h3>
      {tags.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <div className="rounded bg-gray-700 p-2 text-center transition-colors hover:bg-gray-600">
                <span className="text-sm font-medium text-blue-400 hover:underline">
                  {tag}
                </span>
              </div>
            </Link>
          ))}
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
