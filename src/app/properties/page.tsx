"use client"
import Link from "next/link";
import { getPagePath } from "~/utils/utils";
import data from "~/assets/taggedPDFSchoolDB.json";
import { useEffect, useState } from "react";

export default function Tags() {
  const [currentProp, setCurrentProp] = useState("");

  useEffect(() => {
    // Access window safely inside useEffect
    setCurrentProp(window.location.hash.replace("#", ""));
  }, []); // Empty dependency array means this runs once on mount
  
  // You can also listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentProp(window.location.hash.replace("#", ""));
    };
  
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentPropData = data.properties.find((attr) => attr.name === currentProp);

  return (
      <div className="container flex flex-col justify-center gap-12 px-4 py-16 w-full">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Properties
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={getPagePath("./")}
          >
            <h3 className="text-2xl font-bold">Home →</h3>
          </Link>
        </div>
        {currentPropData && <div>
          <h1 className="text-2xl">Name: {currentPropData.name}</h1>
          <h2>Description: {currentPropData.description}</h2>
          <br />
        </div>}
      </div>
  );
}
