/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Navbar } from "~/components/Navbar";
import { promises as fs } from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Tagging PDF School",
  description: "Learn how to tag PDF documents for accessibility.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const allTags = [
  "StructTreeRoot",
  "Index",
  "Reference",
  "Art",
  "TOC",
  "TOCI",
  "BlockQuote",
  "BibEntry",
  "Quote",
  "Code",
  "Note",
  "Private",
  "Document",
  "DocumentFragment",
  "Part",
  "Div",
  "Sect",
  "Aside",
  "NonStruct",
  "Title",
  "Sub",
  "P",
  "Hn",
  "H",
  "Lbl",
  "Em",
  "Strong",
  "Span",
  "Link",
  "Annot",
  "Form",
  "Ruby",
  "RB",
  "RT",
  "RP",
  "Warichu",
  "WT",
  "WP",
  "FENote",
  "L",
  "LI",
  "LBody",
  "Table",
  "TR",
  "TH",
  "TD",
  "THead",
  "TBody",
  "TFoot",
  "Caption",
  "Figure",
  "Formula",
  "Artifact",
  "content item",
];
const allOcc = ["0..n", "‡", "[b]", "0..1", "∅*", "[a]", "c"];
async function generateJson() {
  //console.log(`Current directory: ${process.cwd()}`);
  const file = await fs.readFile(
    process.cwd() + "/src/assets/rawHierarchy.txt",
    "utf8",
  );
  //console.log(file);

  const output: {
    tag: string;
    hierarchy: {
      childTags: string[][];
      parentTags: string[][];
    };
  } = {
    tag: "",
    hierarchy: {
      childTags: [],
      parentTags: [],
    },
  };

  const lineList = file.split("\n").reverse();

  const tags: string[] = [];
  const occurences: string[] = [];

  let childTags: string[] = [];
  let parentTags: string[] = [];
  let occurencesChilds: string[] = [];
  let occurencesParents: string[] = [];
  let name = "";

  lineList.map((line, index) => {
    if (index === lineList.length - 1) {
      line
        .split(" ")
        .reverse()
        .map((elm, index) => {
          //console.log("elm", elm);
          if (index === 1) {
            name = elm;
          } else {
            //console.log("elm occ", elm);
            occurences.push(elm);
          }
        });
    } else {
      //Check if line is one of the tags
      if (allTags.includes(line)) {
        //console.log("Tag", line);
        tags.push(line);
        if (occurences[occurences.length - 1] !== "XXX") {
          occurences.push("XXX");
        }
      } else if (allOcc.includes(line)) {
        //console.log("Occ", line);
        occurences.push(line);
        if (tags[tags.length - 1] !== "XXX") {
          tags.push("XXX");
        }
      } else {
        //console.log("Unknown", line);
        line.split(" ").map((elm, index) => {
          console.log("elmU", elm);
          occurences.push(elm);
        });
      }
    }
  });

  //Remove first element from occurences
  occurences.shift();

  //Remove last element from occurences
  tags.pop();

  //Find index of first null element
  const occurencesIndex = occurences.indexOf("XXX");
  const tagsIndex = tags.indexOf("XXX");

  parentTags = tags.slice(0, tagsIndex).reverse();
  childTags = tags.slice(tagsIndex).reverse();
  occurencesParents = occurences.slice(0, occurencesIndex).reverse();
  occurencesChilds = occurences.slice(occurencesIndex).reverse();

  /*console.log("lists", {
    tags,
    occurences,
    parentTags,
    childTags,
    occurencesParents,
    occurencesChilds,
  });*/

  childTags.pop();
  occurencesChilds.pop();

  output.tag = name;

  parentTags.map((tag, index) => {
    const item = [tag, occurencesParents[index]] as string[];
    output.hierarchy.parentTags.push(item);
  });

  childTags.map((tag, index) => {
    const item = [tag, occurencesChilds[index]] as string[];
    output.hierarchy.childTags.push(item);
  });

  const fileContent = await fs.readFile(
    process.cwd() + "/src/assets/taggsDB.json",
    "utf8",
  );

  // Parse the JSON content
  const pdfTags = JSON.parse(fileContent);

  const origElement = pdfTags.find((elm: any) => elm.name === name);

  pdfTags.map((elm: any) => {
    if (elm.tag === name) {
      elm.hierarchy = output.hierarchy;
    }
  });

  const newElement = pdfTags.find((elm: any) => elm.tag === name);

  const updatedContent = JSON.stringify(pdfTags, null, 2);
  await fs.writeFile(
    process.cwd() + "/src/assets/taggsDB.json",
    updatedContent,
    "utf8",
  );

  console.log("output", {
    output,
    origElement,
    newElement,
    pdfTags,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //await generateJson();
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gray-900 py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2025 Tagged PDF School. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
