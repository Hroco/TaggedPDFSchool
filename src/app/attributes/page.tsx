"use client"
import Link from "next/link";
import { getPagePath } from "~/utils/utils";
import data from "~/assets/taggedPDFSchoolDB.json";
import { useEffect, useState } from "react";

export default function Tags() {
  const [currentAtr, setCurrentAtr] = useState("");

  useEffect(() => {
    // Access window safely inside useEffect
    setCurrentAtr(window.location.hash.replace("#", ""));
  }, []); // Empty dependency array means this runs once on mount
  
  // You can also listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentAtr(window.location.hash.replace("#", ""));
    };
  
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentAtrData = data.attributes.find((attr) => attr.name === currentAtr);

  return (
      <div className="container flex flex-col justify-center gap-12 px-4 py-16 w-full">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Attributes
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={getPagePath("./")}
          >
            <h3 className="text-2xl font-bold">Home →</h3>
          </Link>
        </div>
        {currentAtrData && <div>
          <h1 className="text-2xl">{currentAtrData.name}</h1>
          <h2>Description: {currentAtrData.description}</h2>
          <br />
        </div>}
      </div>
  );
}
