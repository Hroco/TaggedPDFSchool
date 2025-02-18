"use client";
import { Button } from "~/components/ui/button";
import { BookOpen, Tag, FileText, Accessibility } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-6 text-5xl font-bold">
          Master PDF Tags, Properties, and Attributes
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Learn how to create accessible, structured, and searchable PDFs with
          our comprehensive guides on PDF tagging, properties, and attributes.
        </p>
        <Button className="bg-orange-500 text-white hover:bg-orange-600">
          Get Started
        </Button>
      </section>

      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-10 text-center text-3xl font-bold">
            Why Learn PDF Tagging?
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Accessibility className="h-12 w-12 text-orange-500" />}
              title="Accessibility"
              description="Make your PDFs accessible to all users, including those with disabilities."
            />
            <FeatureCard
              icon={<FileText className="h-12 w-12 text-orange-500" />}
              title="Structure"
              description="Create well-structured documents for better organization and readability."
            />
            <FeatureCard
              icon={<Tag className="h-12 w-12 text-orange-500" />}
              title="Searchability"
              description="Enhance document searchability and improve content discovery."
            />
            <FeatureCard
              icon={<BookOpen className="h-12 w-12 text-orange-500" />}
              title="Compliance"
              description="Meet industry standards and regulatory requirements for document accessibility."
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-center text-3xl font-bold">
            Understanding PDF Tags
          </h3>
          <p className="mb-6 text-lg">
            PDF tags are hidden markers that define the structure and content of
            a document. They play a crucial role in making PDFs accessible,
            searchable, and reflow-able across different devices. Our courses
            will teach you:
          </p>
          <ul className="mb-8 list-inside list-disc space-y-2">
            <li>How to properly tag headings, paragraphs, and lists</li>
            <li>Techniques for tagging tables and complex layouts</li>
            <li>Best practices for adding alternative text to images</li>
            <li>Methods for creating a logical reading order</li>
          </ul>
          <div className="text-center">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-center text-3xl font-bold">
            Exploring PDF Properties and Attributes
          </h3>
          <p className="mb-6 text-lg">
            In addition to tags, understanding PDF properties and attributes is
            crucial for creating fully accessible and well-structured documents.
            Our comprehensive guides cover:
          </p>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-xl font-semibold text-orange-500">
                PDF Properties
              </h4>
              <ul className="list-inside list-disc space-y-2">
                <li>Document metadata</li>
                <li>Security settings</li>
                <li>Page layout and viewing options</li>
                <li>Font embedding and subsetting</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-semibold text-orange-500">
                PDF Attributes
              </h4>
              <ul className="list-inside list-disc space-y-2">
                <li>Accessibility attributes</li>
                <li>Alternative text for images</li>
                <li>Language specifications</li>
                <li>Reading order attributes</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Explore Guides
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="mb-6 text-3xl font-bold">
            Ready to Master PDF Tags, Properties, and Attributes?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Join Tagged PDF School today and start creating more accessible,
            structured, and valuable PDF documents with expert knowledge of
            tags, properties, and attributes.
          </p>
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            Explore Resources
          </Button>
        </div>
      </section>
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-gray-700 p-6 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h4 className="mb-2 text-xl font-semibold">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

/*
return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Tagged <span className="text-[hsl(22,100%,70%)]">PDF</span> School
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/properties"
          >
            <h3 className="text-2xl font-bold">Properties →</h3>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/attributes"
          >
            <h3 className="text-2xl font-bold">Attributes →</h3>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/tags"
          >
            <h3 className="text-2xl font-bold">Tags →</h3>
          </Link>
        </div>
      </div>
  );
*/
