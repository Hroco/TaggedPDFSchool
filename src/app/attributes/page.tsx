"use client";

export default function Tag() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-primary">
        PDF Attributes Overview
      </h1>

      <section className="mb-8">
        <p className="mb-6 text-xl">
          PDF attributes provide additional information about elements within a
          PDF document. They are crucial for enhancing accessibility, providing
          context, and defining relationships between elements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Why Use PDF Attributes?</h2>
        <ul className="list-inside list-disc space-y-2 text-gray-300">
          <li>Improve accessibility for users with disabilities</li>
          <li>Provide context and additional information for PDF elements</li>
          <li>Define relationships between different parts of the document</li>
          <li>Enhance the semantic structure of the document</li>
          <li>Support better content extraction and repurposing</li>
        </ul>
      </section>
    </div>
  );
}
