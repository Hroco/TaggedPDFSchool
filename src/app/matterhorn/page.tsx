"use client";
import Link from "next/link";
import checks from "~/assets/matterhornProtocol.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type Check = {
  index: string;
  failureCondition: string;
  section: string;
  type: "Object" | "--" | "Doc" | "Page" | "JS" | "All";
  how: "Human" | "Machine" | "--";
  see: string;
  relatedTags: string[];
};

export default function About() {
  const allChecks = checks as Check[];
  const searchParams = useSearchParams();
  const checkIndex = searchParams.get("check");
  const checkRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    console.log("checkIndex", checkIndex);
    if (checkIndex) {
      const element = checkRefs.current[checkIndex];
      if (element) {
        // Smooth scroll to the element with a small delay to ensure the page is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [checkIndex]);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-orange-500 sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Matterhorn Protocol
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  A comprehensive framework for PDF/UA validation and
                  accessibility compliance. The Matterhorn Protocol helps
                  identify and resolve accessibility issues in PDF documents.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <Card className="border border-gray-700 bg-gray-800 dark:border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-500">
                    <Info className="mr-2 h-5 w-5" />
                    About the Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white dark:text-gray-400">
                    The Matterhorn Protocol is a document that provides a set of
                    failure conditions that can be used to determine if a PDF
                    document conforms to PDF/UA (PDF/Universal Accessibility).
                    It was developed by the PDF Association and is used by PDF
                    validation tools to check for accessibility compliance.
                  </p>
                  <p className="mt-4 text-white dark:text-gray-400">
                    Each check in the protocol identifies a specific failure
                    condition that would make a PDF document non-compliant with
                    PDF/UA standards, along with information on how to detect
                    and fix these issues.
                  </p>
                </CardContent>
              </Card>
            </div>
            {allChecks.map((check, index) => (
              <Card
                key={index}
                ref={(el) => {
                  checkRefs.current[check.index] = el;
                }}
                id={`check-${check.index}`}
                className={`mb-6 overflow-hidden border border-gray-700 bg-gray-800 text-white ${check.index === checkIndex ? "border-orange-500" : ""}`}
              >
                <div className="flex items-center justify-between border-b-2 border-gray-700 px-4 py-2">
                  <Badge
                    variant="outline"
                    className="bg-white dark:bg-gray-800"
                  >
                    #{check.index}
                  </Badge>
                  <Badge>{check.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold leading-tight">
                    {check.failureCondition}
                  </CardTitle>
                  <CardDescription className="text-sm text-white">
                    Section: {check.section}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 flex items-center text-sm font-medium text-orange-500">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        How to Detect
                      </h3>
                      <p className="text-sm">{check.how}</p>
                    </div>
                    {check.relatedTags.length > 0 && (
                      <div>
                        <h3 className="mb-2 flex items-center text-sm font-medium text-orange-500">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Tags affected by this check
                        </h3>
                        <p className="text-sm">
                          {check.relatedTags.map((tag, index) => {
                            return (
                              <React.Fragment key={index}>
                                <span>{index > 0 ? ", " : ""}</span>
                                <Link
                                  href={`/tags/${tag}`}
                                  className="inline py-1 text-sm transition-colors hover:text-orange-500"
                                >
                                  {tag}
                                </Link>
                              </React.Fragment>
                            );
                          })}
                        </p>
                      </div>
                    )}
                    {check.see && check.see !== "-" && (
                      <div>
                        <h3 className="mb-2 flex items-center text-sm font-medium text-orange-500">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          See Also
                        </h3>
                        <p className="text-sm">{check.see}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
