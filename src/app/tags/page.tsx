"use client";
import Link from "next/link";
import { getPagePath } from "~/utils/utils";
import data from "~/assets/taggedPDFSchoolDB.json";
import { useEffect, useState } from "react";

export default function Tags() {
  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    // Access window safely inside useEffect
    setCurrentTag(window.location.hash.replace("#", ""));
  }, []); // Empty dependency array means this runs once on mount

  // You can also listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentTag(window.location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const currentTagData = data.pdfTags.find((tag) => tag.tag === currentTag);

  return (
    <div className="container flex w-full flex-col justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Tags
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href={getPagePath("./")}
        >
          <h3 className="text-2xl font-bold">Home →</h3>
        </Link>
      </div>
      {currentTagData && (
        <div>
          <h1 className="text-2xl">{currentTagData.tag}</h1>
          <h2>{currentTagData.description}</h2>
          <br />
          <p>Introducted in {currentTagData.introducedIn}</p>
          <p>
            Namespace:{" "}
            {currentTagData.namespace?.map((item, i) => {
              return (
                <span className="mr-2" key={i}>
                  {item}
                </span>
              );
            })}
          </p>
          <p>Type: {currentTagData.type}</p>
          <br />
          <h3>Differences</h3>
          <p>WellTaggedPDF: {currentTagData.differences?.wellTaggedPDF}</p>
          <p>PdfUA: {currentTagData.differences?.pdfUA}</p>
          <br />
          <h3>Hierarchy</h3>
          <p>
            Allowed parrents:{" "}
            {currentTagData.hierarchy?.parentTags.map((item, i) => {
              return (
                <span className="mr-2" key={i}>
                  {item}
                </span>
              );
            })}
          </p>
          <p>
            Allowed childs:{" "}
            {currentTagData.hierarchy?.childTags.map((item, i) => {
              return (
                <span className="mr-2" key={i}>
                  {item}
                </span>
              );
            })}
          </p>
          <br />
          <p>
            Intended for:{" "}
            {currentTagData.roles?.intendedFor.map((item, i) => {
              return (
                <span className="mr-2" key={i}>
                  {item}
                </span>
              );
            })}
          </p>
          <p>Misuse prevention: {currentTagData.roles?.misusePrevention}</p>
          <br />
          <h3>ValidationTips</h3>
          {currentTagData.validationTips?.map((item, i) => {
            return (
              <p className="mr-2" key={i}>
                {item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
