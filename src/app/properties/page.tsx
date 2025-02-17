"use client";

export default function Tag() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-orange-500">
        PDF Properties Overview
      </h1>

      <section className="mb-8">
        <p className="mb-6 text-xl">
          PDF properties control various aspects of how content is displayed and
          behaves within a PDF document. They play a crucial role in formatting,
          layout, and interactive features of PDF elements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Why Use PDF Properties?</h2>
        <ul className="list-inside list-disc space-y-2 text-gray-300">
          <li>Fine-tune the appearance of PDF content</li>
          <li>Control document behavior in PDF viewers</li>
          <li>
            Enhance accessibility by specifying language and other metadata
          </li>
          <li>
            Create complex layouts with multi-column text and precise spacing
          </li>
          <li>Ensure consistent styling across similar elements</li>
        </ul>
      </section>
    </div>
  );
}
