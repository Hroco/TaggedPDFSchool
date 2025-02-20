"use client";
import data from "~/assets/taggedPDFSchoolDB.json";
import { notFound } from "next/navigation";
import React from "react";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface AttributeValue {
  name?: string;
  description: string;
}

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

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Owner</h2>
        <p className="text-gray-300">{attr.owner}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Inheritable</h2>
        <p className="text-gray-300">{attr.inheritable ? "Yes" : "No"}</p>
      </section>

      {attr.defaultValue && (
        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">Default Value</h2>
          <p className="text-gray-300">{attr.defaultValue}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Values</h2>
        <Accordion type="single" collapsible className="w-full">
          {attr.values.map((valueType, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center">
                  <span className="mr-2">Value Type:</span>
                  <Badge variant="secondary">{valueType.valueType}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {valueType.values.map((value, vIndex) => (
                  <ValueContent key={vIndex} value={value} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

function ValueContent({ value }: { value: AttributeValue }) {
  return (
    <div className="mb-4">
      {value.name && (
        <h4 className="mb-1 text-lg font-semibold">{value.name}</h4>
      )}
      <p className="text-sm text-gray-300">{value.description}</p>
    </div>
  );
}
