import { BookOpen, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-primary">
        About Tagged PDF School
      </h1>

      <section className="mb-12">
        <p className="mb-6 text-xl">
          Welcome to Tagged PDF School, your comprehensive resource for
          mastering the art and science of PDF tagging. Our mission is to
          empower individuals and organizations to create more accessible,
          structured, and valuable PDF documents.
        </p>
        <p className="mb-6 text-lg">
          In today&rsquo;s digital world, ensuring that documents are accessible
          to everyone, including those with disabilities, is not just a best
          practice—it&rsquo;s a necessity. Tagged PDFs play a crucial role in
          this accessibility ecosystem, and we&rsquo;re here to guide you
          through every aspect of creating and working with them.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-semibold">Why Tagged PDFs Matter</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-gray-700 bg-gray-800 p-6">
            <BookOpen className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-gray-100">
              Accessibility
            </h3>
            <p className="text-gray-300">
              Enable screen readers and assistive technologies to interpret
              document structure and content accurately.
            </p>
          </Card>
          <Card className="border-gray-700 bg-gray-800 p-6">
            <Users className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-gray-100">
              Usability
            </h3>
            <p className="text-gray-300">
              Improve document navigation, readability, and content reflow
              across various devices and screen sizes.
            </p>
          </Card>
          <Card className="border-gray-700 bg-gray-800 p-6">
            <Award className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-gray-100">
              Compliance
            </h3>
            <p className="text-gray-300">
              Meet legal and regulatory requirements for document accessibility
              in many industries and jurisdictions.
            </p>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-semibold">Our Approach</h2>
        <p className="mb-4 text-lg">
          At Tagged PDF School, we believe in a comprehensive and practical
          approach to learning. Our resources cover:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>In-depth explanations of PDF tags, properties, and attributes</li>
          <li>
            Best practices for creating accessible and well-structured documents
          </li>
          <li>Practical examples and real-world use cases</li>
          <li>Tips for working with various PDF creation and editing tools</li>
          <li>
            Updates on the latest standards and technologies in the PDF
            ecosystem
          </li>
        </ul>
        <p className="text-lg">
          Whether you&rsquo;re a document author, a developer working with PDFs,
          or an accessibility specialist, our goal is to provide you with the
          knowledge and tools you need to excel in creating tagged PDFs.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-semibold">Get Started</h2>
        <p className="mb-6 text-lg">
          Ready to dive into the world of tagged PDFs? Explore our comprehensive
          guides on tags, properties, and attributes to start your journey
          towards creating more accessible and structured documents.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/tags">
            <Button className="w-full bg-primary text-white hover:bg-orange-600 sm:w-auto">
              Explore PDF Tags
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/properties">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white sm:w-auto"
            >
              Learn About Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/attributes">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white sm:w-auto"
            >
              Discover Attributes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-semibold">Stay Connected</h2>
        <p className="mb-4 text-lg">
          Join our community of PDF accessibility enthusiasts. Stay updated with
          the latest news, tips, and best practices in the world of tagged PDFs.
        </p>
        <div className="flex items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-l-md bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="rounded-l-none bg-primary text-white hover:bg-orange-600">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
}
