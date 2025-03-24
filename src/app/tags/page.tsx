"use client";

export default function Tag() {
  return (
    <div className="mx-auto max-w-3xl text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-primary">
        PDF Tags Overview
      </h1>

      <section className="mb-8">
        <p className="mb-6 text-xl">
          PDF tags are structural elements that define the logical reading order
          and hierarchy of a document&apos;s content. They are essential for
          creating accessible PDFs that can be properly interpreted by screen
          readers and other assistive technologies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Why Use PDF Tags?</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Improve document accessibility for users with disabilities</li>
          <li>
            Enable proper content reflow on different devices and screen sizes
          </li>
          <li>Maintain logical reading order of content</li>
          <li>Support better content extraction and repurposing</li>
          <li>Meet accessibility compliance requirements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Tag Structure</h2>
        <p className="mb-4">
          PDF tags are organized in a hierarchical structure, similar to HTML.
          The structure typically includes:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-800 p-4">
          <code className="text-sm text-gray-300">
            {`<Document>
  <Part>
    <H1>Document Title</H1>
    <P>First paragraph...</P>
    <Sect>
      <H2>Section Heading</H2>
      <P>Section content...</P>
      <Table>
        <TR>
          <TH>Header 1</TH>
          <TH>Header 2</TH>
        </TR>
        <TR>
          <TD>Data 1</TD>
          <TD>Data 2</TD>
        </TR>
      </Table>
    </Sect>
  </Part>
</Document>`}
          </code>
        </pre>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
        <p className="mb-4">
          Select a tag from the navigation menu on the left to learn more about
          its specific usage, attributes, and best practices. Each tag
          documentation includes examples and implementation notes.
        </p>
      </section>
    </div>
  );
}
