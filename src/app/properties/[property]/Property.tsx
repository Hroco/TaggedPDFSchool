"use client";
import properties from "~/assets/propertiesDB.json";
import { notFound } from "next/navigation";
import Markdown from "~/components/MarkDown";

export default function Tag({ currentProperty }: { currentProperty: string }) {
  const prop = properties.find((prop) => prop.name === currentProperty);

  if (!prop) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-primary">{prop.name}</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Description</h2>
        <p className="text-gray-300"><Markdown content={prop.description}/></p>
      </section>
    </div>
  );
}
