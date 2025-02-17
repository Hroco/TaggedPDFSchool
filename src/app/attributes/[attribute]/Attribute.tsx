"use client";
import data from "~/assets/taggedPDFSchoolDB.json";
import { notFound } from "next/navigation";

export default function Tag({
  currentAttribute,
}: {
  currentAttribute: string;
}) {
  const attr = data.attributes.find((attr) => attr.name === currentAttribute);

  if (!attr) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-orange-500">{attr.name}</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Description</h2>
        <p className="text-gray-300">{attr.description}</p>
      </section>
    </div>
  );
}
