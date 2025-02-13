"use client"
import Link from "next/link";
import { getPagePath } from "~/utils/utils";

export default function HomePage() {
  return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Tagged <span className="text-[hsl(22,100%,70%)]">PDF</span> School
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={getPagePath("./properties")}
          >
            <h3 className="text-2xl font-bold">Properties →</h3>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={getPagePath("./attributes")}
          >
            <h3 className="text-2xl font-bold">Attributes →</h3>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={getPagePath("./tags")}
          >
            <h3 className="text-2xl font-bold">Tags →</h3>
          </Link>
        </div>
      </div>
  );
}
