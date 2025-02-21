import data from "~/assets/taggedPDFSchoolDB.json";
import Link from "next/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const attributes = data.attributes;

  const sortedAttributes = attributes.sort((a, b) => {
    const ownerOrder = [
      "Layout",
      "List",
      "Table",
      "PrintField",
      "Artifact",
      "FENote",
    ];
    const aIndex = ownerOrder.indexOf(a.owner);
    const bIndex = ownerOrder.indexOf(b.owner);
    if (aIndex === -1 || bIndex === -1) {
      throw new Error(`Invalid owner: ${a.owner} or ${b.owner}`);
    }
    return aIndex - bIndex;
  });

  return (
    <div className="container flex max-w-screen-2xl">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-72 border-r border-gray-800 bg-gray-900 lg:block">
        <ScrollArea className="h-full py-6 pl-8 pr-6">
          <nav className="relative">
            <div className="text-lg font-bold text-orange-500">
              PDF Tags Reference
            </div>
            <ul className="space-y-2">
              {sortedAttributes.map((attr, index) => {
                const shouldShownOwner =
                  index === 0 ||
                  attr.owner !== sortedAttributes[index - 1]?.owner;

                return (
                  <React.Fragment key={index}>
                    {shouldShownOwner && (
                      <li className="mt-4">
                        <h2 className="text-xl font-bold text-orange-500">
                          {attr.owner}
                        </h2>
                      </li>
                    )}

                    <li>
                      <Link
                        href={`/attributes/${attr.name}`}
                        className="block py-1 text-sm text-gray-400 transition-colors hover:text-orange-500"
                      >
                        {attr.name}
                      </Link>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>
        </ScrollArea>
      </aside>
      <main className="min-h-[calc(100vh-3.5rem)] w-full lg:pl-72">
        <div className="h-full px-4 py-6 lg:px-8">
          {children}
          <div className="mt-10 flex justify-between border-t border-gray-800 pt-4"></div>
        </div>
      </main>
    </div>
  );
}
